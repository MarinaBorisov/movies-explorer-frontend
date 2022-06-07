import React from 'react';
import { Navigation } from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header = (props) => {

  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false);

  function handleHamburgerOpen() {
    setIsHamburgerOpen(true)
  }

  function handleHamburgerClose() {
    setIsHamburgerOpen(false)
  }
  return (
    <header className="header">
      <Link to="/" className="logo"/>
      <Navigation
        loggedIn={props.loggedIn}
        isOpenHamburger={isHamburgerOpen}
        onHamburgerOpen={handleHamburgerOpen}
        onHamburgerClose={handleHamburgerClose} />
    </header>
  );
}
