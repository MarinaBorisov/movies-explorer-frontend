import React from 'react';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { moviesApi } from '../../utils/moviesApi';
import { filterMovies, filterShortMovies } from '../../utils/searchFilter';
import Preloader from '../Preloader/Preloader';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { NUMBER_OF_CARDS } from '../../utils/constants';

export const Movies = ({ handleLikeClick }) => {
  const { width } = useWindowDimensions();
  const [movies, setMovies] = React.useState([]);
  const [cardCount, setCardCount] = React.useState(0);
  const [responseText, setResponseText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const [isEnableShortMovies, setIsEnableShortMovies] = React.useState(JSON.parse(localStorage.getItem('toggleState')) || false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const switchShortMovie = () => {
    if (!isEnableShortMovies && movies) {
      const filtered = filterShortMovies(movies);
      setMovies(filtered || []);
    }

    if (isEnableShortMovies && movies) {
      try {
        const { movies } = JSON.parse(localStorage.reqData);
        setMovies(movies);
      } catch {
        setMovies([]);
      }
    }
    setIsEnableShortMovies((prevState) => !prevState);
  };

  const handleClickButtonAddMore = () => {
    setCardCount(cardCount + (width >= 1280 ? 4 : (width >= 1136 ? 3 : 2)));
  };

  React.useEffect(() => {
    setCardCount(NUMBER_OF_CARDS);
  }, [movies]);

  React.useEffect(() => {
    if (localStorage.reqData) {
      const { movies, searchQuery } = JSON.parse(localStorage.getItem('reqData'));
      const toggleState = JSON.parse(localStorage.getItem('toggleState'));
      setIsEnableShortMovies(toggleState);
      setSearchQuery(searchQuery);
      (!isEnableShortMovies) ?
        setMovies(movies)
        :
        setMovies(filterShortMovies(movies) || []);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('toggleState', isEnableShortMovies);
  }, [isEnableShortMovies]);

  const handleSetMovies = () => {
    const filteredMovies = filterMovies(JSON.parse(localStorage.getItem('movies')), searchQuery);
    filteredMovies.length === 0 && setResponseText('Ничего не найдено.');
    localStorage.setItem('reqData', JSON.stringify({ movies: filteredMovies, searchQuery: searchQuery }));
    (!isEnableShortMovies) ?
      setMovies(filteredMovies)
      :
      setMovies(filterShortMovies(filteredMovies));
  }

  const handleSearchButton = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!localStorage.movies) {
      moviesApi.getAllMovies()
        .then((data) => {
          localStorage.setItem('movies', JSON.stringify(data));
          handleSetMovies();
        })
        .catch(() => {
          localStorage.removeItem('movies');
          setResponseText(`Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте снова.`);
        })
        .finally(() => setIsLoading(false));
    } else {
      handleSetMovies();
      setIsLoading(false);
    }
  }

  return (
    <>
      <SearchForm
        searchQuery={searchQuery}
        handleSearchQuery={(e) => setSearchQuery(e.target.value)}
        handleSearchButton={handleSearchButton}
        isLoading={isLoading}
        isActiveCheckbox={isEnableShortMovies}
        switchShortMovie={switchShortMovie}
      />
      {isLoading ? (<Preloader />)
        : (movies.length > 0
          ?
          (<MoviesCardList 
            movies={movies && movies.slice(0, cardCount)} 
            handleLikeClick={handleLikeClick}
            moreButtonNeeded={(movies.length > 3) && (cardCount < movies.length)}
            handleClickButton={handleClickButtonAddMore}
            />)
          : (<span className='movies__not-found'>{responseText}</span>)
        )
      }
    </>
  );
}