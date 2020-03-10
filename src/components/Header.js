import React from 'react';
import Searchbar from './Searchbar';
import './Header.css';
import logo from '../resources/logo.png';

const Header = props => {
  return (
    <header className="header">
      <div className="logo-wrapper">
        <img src={logo}></img>
      </div>
      <Searchbar {...props} />
    </header>
  );
};

export default Header;
