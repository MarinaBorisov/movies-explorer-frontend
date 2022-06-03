import React from 'react';
import './Footer.css';

export const Footer = () => {
	return (
		<footer className="footer">
			<h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
			<div className="footer__wrapper">
				<p className="footer__author">&copy; {new Date().getFullYear()}</p>
				<nav>
					<ul className="footer__links">
						<li className="footer__wrapper-link"><a target="_blank" rel="noreferrer" href="https://praktikum.yandex.ru" className="footer__link">Яндекс.Практикум</a></li>
						<li className="footer__wrapper-link"><a target="_blank" rel="noreferrer" href="https://github.com/MarinaBorisov" className="footer__link">Github</a></li>
						<li className="footer__wrapper-link"><a target="_blank" rel="noreferrer" href="https://www.instagram.com/moretz0_0/" className="footer__link">Instagram</a></li>
					</ul>
				</nav>
			</div>
		</footer>
	);
}