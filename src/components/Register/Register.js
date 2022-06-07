import React from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { useInput } from '../../hooks/useInput';

export const Register = ({ loggedIn, isLoading, serverError, resetServerError, handleSubmit }) => {
  const name = useInput('', 'name');
  const email = useInput('', 'email');
  const password = useInput('', 'password');

  useEffect(() => {
    resetServerError();
  }, []);

  const isFormInvalid = (name.inputInvalid || email.inputInvalid || password.inputInvalid || isLoading);

  return (
    <>
      {loggedIn ? <Navigate to='/movies' />
        :
        <Form
          title="Добро пожаловать!"
          typeLink="Войти"
          to="/signin"
          typeButton="Зарегистрироваться"
          check="Уже зарегистрированы?"
          isLoading={isLoading}
          isFormInvalid={isFormInvalid}
          serverError={serverError}
          handleSubmit={handleSubmit}
          name={name}
          email={email}
          password={password}
          >
          <div className="form__wrapper">
            <Input
              className="form__input"
              type="text"
              name="name"
              value={name.value}
              onChange={e => name.onChange(e)}
              onBlur={e => name.onBlur(e)}
              disabled={isLoading}/>
            <label className="form__label">Имя</label>
          </div>
          <div className="form__wrapper">
            <Input
              className="form__input"
              type="email"
              name="email"
              minLength="2"
              maxLength="30"
              value={email.value}
              onChange={e => email.onChange(e)}
              onBlur={e => email.onBlur(e)}
              disabled={isLoading} />
            <label className="form__label">Email</label>
          </div>
          <div className="form__wrapper">
            <Input
              className="form__input"
              type="password"
              name="password"
              minLength="4"
              maxLength="16"
              value={password.value}
              onChange={e => password.onChange(e)}
              onBlur={e => password.onBlur(e)}
              disabled={isLoading}  />
            <label className="form__label">Пароль</label>
          </div>
          {serverError && <div className="form__wrapper form__wrapper_for_error"><span className='input__error'>{serverError}</span></div>}
        </Form>
      }
    </>
  );
}