import React from 'react';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { filterMovies, filterShortMovies } from '../../utils/searchFilter';
import './SavedMovies.css';

export const SavedMovies = ({ handleRemoveCard }) => {
  const savedMovies = React.useContext(SavedMoviesContext);
  const [dataMovies, setDataMovies] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [responseText, setResponseText] = React.useState('');
  const [isSwitchShortMovie, setIsSwitchShortMovie] = React.useState(false);

  const newKeysForMovies = () => savedMovies.map((movie) => ({
    id: movie.movieId,
    image: {
      url: movie.image,
    },
    nameRU: movie.nameRU,
    duration: movie.duration,
    trailerLink: movie.trailer,
    movieId: movie._id,
  }));

  const switchShortMovie = () => {
    if (!isSwitchShortMovie && dataMovies) {
      const filtered = filterShortMovies(dataMovies);
      setDataMovies(filtered);
    }

    if (isSwitchShortMovie && dataMovies) {
      const data = newKeysForMovies(savedMovies);
      setDataMovies(data.reverse());
    }

    setIsSwitchShortMovie((prevState) => !prevState);
  };

  React.useEffect(() => {
    const data = newKeysForMovies();
    setDataMovies(data.reverse());
  }, [savedMovies]);

  const handleSearchButton = (e) => {
    e.preventDefault();

    const data = newKeysForMovies();
    const filteredMovies = filterMovies(data, searchQuery, isSwitchShortMovie);
    setResponseText(filteredMovies.length === 0 && 'Ничего не найдено.');
    setDataMovies(filteredMovies.reverse());
  };

  return (
    <>
      <SearchForm
        isLoading={false}
        searchQuery={searchQuery}
        handleSearchQuery={(e) => setSearchQuery(e.target.value)}
        switchShortMovie={switchShortMovie}
        handleSearchButton={handleSearchButton}
      />
      {responseText
        ? (<span className='movies__not-found'>{responseText}</span>)
        : (<MoviesCardList
          handleRemoveButton={handleRemoveCard}
          isSaved
          movies={dataMovies} />)
      }
      <div className="saved__movies_space"></div>
    </>
  );
}
