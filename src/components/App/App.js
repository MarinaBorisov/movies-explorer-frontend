import React from "react";
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Error404 } from "../Error404/Error404";
import { Footer } from "../Footer/Footer";
import { api } from '../../utils/api';
import { auth } from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { PAGES_WITH_HEADER } from '../../utils/constants';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState({});
  const [successUpdateUser, setSuccessUpdateUser] = React.useState('');

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(({ _id }) => {
        if (_id) {
          setLoggedIn(true);
          navigate(location);
        }
        else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  }, [navigate]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then(({ name, email, _id }) => {
          setCurrentUser({
            name: name,
            email: email,
            _id: _id,
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function filterRemovedCard(movie) {
    setSavedMovies((savedMovies) => savedMovies.filter((i) => +i.movieId !== +movie.id));
  }

  function handleRemoveCard(movie) {
    api.removeMovie(movie.movieId)
      .then(() => {
        filterRemovedCard(movie);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLikeClick(movieCard) {
    const movie = savedMovies.find((i) => +i.movieId === movieCard.id);

    if (movie) {
      api.removeMovie(movie._id)
        .then(() => {
          filterRemovedCard(movieCard);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.createMovie(movieCard)
        .then((result) => setSavedMovies([...savedMovies, result]))
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function onUpdateUser(e, name, email) {
    e.preventDefault();
    setServerError({});
    setIsLoading(true);
    api
      .updateUserInfo(name, email)
      .then((result) => {
        setSuccessUpdateUser('Данные успешно обновлены!');
        setTimeout(() => setSuccessUpdateUser(''), 2000);
        setServerError({});
        setCurrentUser(result);
      })
      .catch((err) => {
        const textError = err === 'Error: 409' ?
          'Пользователь с таким email уже существует.'
          :
          'При обновлении профиля произошла ошибка.';
        setServerError({ ...serverError, profile: textError });
      })
      .finally(() => setIsLoading(false));
  }

  function onRegister(name, email, password) {
    setServerError({});
    auth
      .register(name, email, password)
      .then(() => {
        auth.login(email, password)
          .then(() => {
            setServerError({});
            setLoggedIn(true);
            navigate('/movies');
          })
          .catch(() => 'При авторизации произошла ошибка');
      })
      .catch((err) => {
        const textError = err === 'Error: 409' ?
          'Пользователь с таким email уже существует'
          :
          'При регистрации пользователя произошла ошибка';
        setServerError({ ...serverError, signUp: textError });
      })
      .finally(() => setIsLoading(false));
  }

  function onLogin(email, password) {
    setServerError({});
    auth
      .login(email, password)
      .then(() => {
        setServerError({});
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        const textError = err === 'Error: 401' ?
          'Вы ввели неправильный логин или пароль'
          :
          'При авторизации произошла ошибка';
        setServerError({ ...serverError, login: textError });
      })
      .finally(() => setIsLoading(false));

  }

  function handleClickSignInButton(e, data) {
    e.preventDefault();

    setIsLoading(true);
    onLogin(data.email.value, data.password.value);
  }

  function handleClickSignUpButton(e, data) {
    e.preventDefault();

    setIsLoading(true);
    onRegister(data.name.value, data.email.value, data.password.value);
  }

  function handleLogout() {
    auth.logout()
      .then(() => {
        localStorage.removeItem('movies');
        localStorage.removeItem('reqData');
        localStorage.removeItem('toggleState');
        setLoggedIn(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function resetServerError() {
    setServerError({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContext.Provider value={savedMovies}>
        {PAGES_WITH_HEADER.includes(location.pathname) && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              redirectTo='/'>
              <Movies handleLikeClick={handleLikeClick} />
            </ProtectedRoute>
          } />
          <Route path='/saved-movies' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              redirectTo='/'>
              <SavedMovies handleRemoveCard={handleRemoveCard} />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              redirectTo='/'>
              <Profile
                handleButtonEdit={onUpdateUser}
                success={successUpdateUser}
                serverError={serverError.profile}
                isLoading={isLoading}
                resetServerError={resetServerError}
                handleLogout={handleLogout}
              />
            </ProtectedRoute>
          } />
          <Route path='/signin' element={
            <Login
              loggedIn={loggedIn}
              handleSubmit={handleClickSignInButton}
              resetServerError={resetServerError}
              serverError={serverError.login}
              isLoading={isLoading}
            />
          } />
          <Route path='/signup' element={
            <Register
              loggedIn={loggedIn}
              handleSubmit={handleClickSignUpButton}
              resetServerError={resetServerError}
              serverError={serverError.signUp}
              isLoading={isLoading}
            />
          } />
          <Route path='/*' element={<Error404 />} />
        </Routes>
        {PAGES_WITH_HEADER.includes(location.pathname) && <Footer />}
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}
