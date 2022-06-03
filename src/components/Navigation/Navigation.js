import React from 'react';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import { Hamburger } from '../Hamburger/Hamburger';

export const Navigation = (props) => {
	return (
		<>
			{props.isAuth && <nav className="navigation">
				<div className="navigation__wrapper navigation__wrapper_hidden">
					<Link to="/movies" className="navigation__link">Фильмы</Link>
					<Link to="/saved-movies" className="navigation__link navigation__link_active">Сохранённые фильмы</Link>
				</div>
				<div className="navigation__account-wrapper navigation__wrapper_hidden">
					<Link to="/profile" className="navigation__link navigation__link_with_signin">Аккаунт</Link>
				</div>
				<Hamburger className="header__hamburger header__hamburger_with_signin" onHamburgerOpen={props.onHamburgerOpen} />
			</nav>}
			{!props.isAuth && <nav className="navigation navigation_without_signin" >
				<div className="navigation__wrapper navigation__wrapper_without_signin">
					<Link to="/signup" className="navigation__link">Регистрация</Link>
					<Link to="/signin" className="navigation__link navigation__link_type_button">Войти</Link>
				</div>
			</nav>}

			<div className={`popup ${props.isOpenHamburger && "popup_opened"}`}>
				<div className="popup__container">
					<div className="popup__wrapper">
						<NavLink to="/" className={({ isActive }) => "popup__link" + (isActive ? " popup__link_active" : "")}>Главная</NavLink>
						<NavLink to="/movies" className={({ isActive }) => "popup__link" + (isActive ? " popup__link_active" : "")}>Фильмы</NavLink>
						<NavLink to="/saved-movies" className={({ isActive }) => "popup__link" + (isActive ? " popup__link_active" : "")}>Сохранённые фильмы</NavLink>
					</div>
					<div className="popup__wrapper popup__account-wrapper">
						<Link to="/profile" className="popup__link popup__account-link">Аккаунт</Link>
					</div>
					<button className="popup__button" onClick={props.onHamburgerClose}></button>
				</div>
			</div>
		</>
	);
}