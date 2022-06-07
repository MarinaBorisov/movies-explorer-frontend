import React from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { useInput } from '../../hooks/useInput';

export const Login = ({ loggedIn, isLoading, serverError, resetServerError, handleSubmit }) => {
  const email = useInput('', 'email');
  const password = useInput('', 'password');

  useEffect(() => {
    resetServerError();
  }, []);

  const isFormInvalid = (email.inputInvalid || password.inputInvalid || isLoading);


  return (
    <>
      {loggedIn ? <Navigate to='/movies' />
        :
        <Form
          title="Рады видеть!"
          typeLink="Регистрация"
          to="/signup"
          typeButton="Войти"
          check="Еще не зарегистрированы?"
          isLoading={isLoading}
          isFormInvalid={isFormInvalid}
          serverError={serverError}
          handleSubmit={handleSubmit}
          email={email}
          password={password}
          >
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