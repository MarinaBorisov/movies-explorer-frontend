import React from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Form.css';

export const Form = (props) => {

  return (
    <div className="form">
      <Link to="/" className="logo"></Link>
      <h1 className="form__title">{props.title}</h1>
      <form className="form__container">
        {props.children}
        {props.isLoading ?
          <Preloader />
          :
          <button className="form__button"
            onClick={(e) => props.handleSubmit(e, props)}
            disabled={props.isFormInvalid}
          >{props.typeButton}</button>
        }
      </form>
      <p className="form__check">{props.check} <Link to={props.to} className="form__link" >{props.typeLink}</Link></p>
    </div>
  );
}