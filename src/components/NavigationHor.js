import React from "react";
import Logo from "../assets/logo.png";

function NavigationHor() {
  return (
    <div className="nav-hor-container">
      <div className="nav-hor-flex">
        <div className="nav-hor-logo">
          <img src={Logo} alt="Logo de SportSee"></img>
        </div>
        <div className="nav-hor-flex-link">
          <h3 className="nav-hor-link">Accueil</h3>
          <h3 className="nav-hor-link">Profil</h3>
          <h3 className="nav-hor-link">Réglage</h3>
          <h3 className="nav-hor-link">Communauté</h3>
        </div>
      </div>
    </div>
  );
}

export default NavigationHor;
