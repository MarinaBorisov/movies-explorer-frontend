import React from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


export const MoviesCardList = (props) => {
  return (
    <section className="card-list">
      <div className="card-list__wrapper">
        {props.movies && props.movies.map(movie => {
          return <MoviesCard movieData={movie} key={movie.id} {...props} />
        })}
      </div>
      {props.moreButtonNeeded
        && (<button className="card-list__button" onClick={props.handleClickButton}>Еще</button>)}

    </section>
  );
}
