import React from "react";
import NavigationHor from "./NavigationHor";
import NavigationVer from "./NavigationVer";

function NoFound() {
  return (
    <div className="App">
      <NavigationHor />
      <div className="main-page">
        <NavigationVer />

        <div className="wrapper-choice">
          <h1>Erreur 404</h1>
          <h3>Cette page n'existe pas.</h3>
          <span>
            Pour revenir au menu principal, veuillez cliquer sur le logo
            SportSee.
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoFound;
