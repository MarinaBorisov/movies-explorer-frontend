import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Input } from '../Input/Input';
import { Link } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import Preloader from '../Preloader/Preloader';
import './Profile.css';

export const Profile = ({ handleLogout, handleButtonEdit, success, serverError, isLoading, resetServerError }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const name = useInput('', 'name');
  const email = useInput('', 'email');

  React.useEffect(() => {
    resetServerError();
  }, []);

  React.useEffect(() => {
    name.updateValue(currentUser.name);
    email.updateValue(currentUser.email);
  }, [currentUser]);

  const isFormInvalid = (((email.value === currentUser.email) && (name.value === currentUser.name)) || (name.inputInvalid || email.inputInvalid) || isLoading);

  return (
    <div className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" noValidate>
        <div className="profile__wrapper">
          <Input
            className="profile__input"
            name='name'
            type="text"
            value={name.value}
            onChange={e => name.onChange(e)}
            onBlur={e => name.onBlur(e)}
            disabled={isLoading}
            isDirty={name.isDirty}
            currentError={name.currentError}
          />
          <label className="profile__label">Имя</label>
        </div>
        <div className="profile__wrapper">
          <Input
            className="profile__input"
            name='email'
            type="email"
            value={email.value}
            onChange={e => email.onChange(e)}
            onBlur={e => email.onBlur(e)}
            disabled={isLoading} 
            isDirty={email.isDirty}
            currentError={email.currentError}
          />
          <label className="profile__label">E-mail</label>
        </div>
        <div className="profile__wrapper">
          {isLoading && <Preloader />}
          {(success || serverError) && (
            <span className="input__error">{success || serverError}</span>
          )}
        </div>
        <button
          className={`profile__button ${isFormInvalid && 'profile__disabled-button'}`}
          onClick={(e) => handleButtonEdit(e, name.value, email.value)}
          disabled={isFormInvalid}
        >Редактировать</button>
      </form>
      <button type="button" className="profile__link" onClick={handleLogout}>Выйти из аккаунта</button>
    </div>
  );
}
