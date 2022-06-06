import React from 'react';
import { Heading } from '../Heading/Heading';
import './AboutMe.css';
import image from '../../images/about-me__photo.png'

export const AboutMe = () => {
  return (
    <section className="about-me">
      <Heading
        name="Студент"
        id="about-me" />
      <div className="about-me__wrapper">
        <h2 className="about-me__title">Марина</h2>
        <p className="about-me__subtitle">Фронтенд-разработчик, 18 лет</p>
        <p className="about-me__text">Я родилась в Воронеже. Люблю путешествовать и рисовать.
          Побывала во множестве туристических мест России, среди которых: Калининград, Алтай, Байкал. Подрабатываю выполнением заказов по созданию цифровых иллюстраций.
          В прошлом году начала программировать, недавно прошла курс по тестированию программного обеспечния. </p>
        <div className="about-me__links">
          <a className="about-me__link" rel="noreferrer" target="_blank" href="https://github.com/MarinaBorisov">Github</a>
          <a className="about-me__link" rel="noreferrer" target="_blank" href="https://www.instagram.com/moretz0_0/">Instagram</a>
        </div>
        <img className="about-me__photo" src={image} alt="Моя фотография" />
      </div>
    </section>
  );
}