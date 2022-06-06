import React from 'react';
import './FilterCheckbox.css';

export const FilterCheckbox = ({ switchShortMovie, isActive }) => {
	return (
		<label className="checkbox">
			<input className="checkbox__input" type="checkbox" checked={isActive} onChange={switchShortMovie} />
			<span className="checkbox__switch"></span>
		</label>
	);
}