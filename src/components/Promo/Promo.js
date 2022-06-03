import React from 'react';
import { NavTab } from '../NavTab/NavTab';
import './Promo.css';

export const Promo = () => {
  return (
    <section className='promo'>
        <div className='promo__text-wrapper'>
            <h1 className='promo__text'>Учебный проект студента факультета Веб-разработки.</h1>
        </div>
        <NavTab />
    </section>
  );
}
