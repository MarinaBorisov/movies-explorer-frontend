import React from 'react';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export const SearchForm = ({ handleSearchButton, handleSearchQuery, searchQuery, isLoading, switchShortMovie, isActiveCheckbox }) => {
	return (
		<section className="search-form">
			<form className="search-form__form" onSubmit={handleSearchButton}>
				<div className="search-form__container">
					<input className="search-form__input" type="search" placeholder="Фильм" value={searchQuery} onChange={handleSearchQuery} required></input>
					<button className="search-form__button" disabled={isLoading || !searchQuery}></button>
				</div>
				<div className="search-form__wrapper">
					<label className="search-form__title">Короткометражки</label>
          <FilterCheckbox switchShortMovie={switchShortMovie} isActive={isActiveCheckbox} />
				</div>
			</form>
		</section>
	);
}
