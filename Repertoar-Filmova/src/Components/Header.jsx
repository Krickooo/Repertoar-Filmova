import React from "react";
import { Link } from "react-router-dom";
import "../Styles/main.scss";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about/app">About App</Link></li>
          <li><Link to="/about/author">About Author</Link></li>
          <li><Link to="/movies">Movies</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;