import React from "react";

import "./Header.css";
import Logo from "../../images/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header--head">
        <img src={Logo} className="header--logo" alt="Logo" />
        <h1 className="header--title">AiMood</h1>
      </div>
      <div className="header--p">
        Get Spotify reccomendations based on your music tastes and detected
        mood.
      </div>
    </header>
  );
};

export default Header;
