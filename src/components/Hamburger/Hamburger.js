import React from 'react';
import './Hamburger.css';

export const Hamburger = (props) => {
	return (
		<button className={props.className} onClick={props.onHamburgerOpen}></button>
	);
}