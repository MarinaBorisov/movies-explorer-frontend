import React from 'react';
import './Error404.css';
import { useNavigate } from 'react-router-dom';

export const Error404 = (props) => {
	const navigate = useNavigate();

	return (
		<div className="error">
			<h1 className="error__title">404</h1>
			<p className="error__subtitle">Страница не найдена</p>
			<button className="error__button" onClick={() => navigate(-2)}>Назад</button>
		</div>
	);
}