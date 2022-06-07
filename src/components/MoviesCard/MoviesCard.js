import React from 'react';
import { useLocation } from 'react-router-dom';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { movieUrl } from '../../utils/constants';
import './MoviesCard.css';

export const MoviesCard = ({ movieData, handleLikeClick, handleRemoveButton }) => {
  const savedMovies = React.useContext(SavedMoviesContext);
  const isLiked = savedMovies.find(i => +i.movieId === movieData.id)
  const location = useLocation().pathname;
  const isSavedMovies = !(location === '/movies');
  const calculateDuration = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const minute = Math.floor(minutes % 60);
    return `${hour === 0 ? "" : `${hour}ч`} ${minute}м`;
  }
  return (
    <article className="movies-card">
      <img className="movies-card__image"
        alt={`Обложка фильма "${movieData.nameRU}"`}
        src={location === '/movies' ? movieUrl + movieData.image.url : movieData.image.url}
      />
      <div className="movies-card__wrapper">
        <h2 className="movies-card__title">{movieData.nameRU}</h2>
        {!isSavedMovies && <button className={`movies-card__button ${isLiked && 'movies-card__button_like_active'}`}
          onClick={() => handleLikeClick(movieData)}
        ><div className="movies-card__innercircle"></div></button>}
        {isSavedMovies && <button className="movies-card__button movies-card__button_delete_card"
          onClick={() => handleRemoveButton(movieData)}
        ></button>}
      </div>
      <p className="movies-card__time">{calculateDuration(movieData.duration)}</p>
    </article>
  );
}