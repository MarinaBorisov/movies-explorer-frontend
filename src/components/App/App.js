import React from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Error404 } from "../Error404/Error404";
import { Footer } from "../Footer/Footer";


export const App = () => {

  const [isAuth, setIsAuth] = React.useState(true);
  const [isSavedMovies, setIsSavedMovies] = React.useState(true);
  const [isHidden, setIsHidden] = React.useState(true);
  const [isHiddenFooter, setIsHiddenFooter] = React.useState(true);
  const [moviesBackground, setMoviesBackground] = React.useState('header_active');
  const getMoviesUrl = window.location.pathname;

  function handleLink(boolean) {
    setIsAuth(boolean);
  }

  React.useEffect(() => {
    if (getMoviesUrl ==="/") {
      setMoviesBackground('');
    }
  }, [getMoviesUrl]);


  return (
    <div className="app">
      {isHidden && <Header isAuth={isAuth} moviesBackground={moviesBackground}/>}
      <Routes>
        <Route path="/" element={<Main setAuth={handleLink} />} />
        <Route path="movies/*" element={<Movies />} />
        <Route path="saved-movies/*" element={<SavedMovies isSavedMovies={isSavedMovies} />} />
        <Route path="profile/*" element={<Profile onIsHiddenFooter={setIsHiddenFooter} />} />
        <Route path="signup/*" element={<Register onIsHidden={setIsHidden} />} />
        <Route path="signin/*" element={<Login onIsHidden={setIsHidden} />} />
        <Route path="*" element={<Error404 onIsHidden={setIsHidden} />} />
      </Routes>
      {isHidden && isHiddenFooter && <Footer />}
    </div>
  );
}
