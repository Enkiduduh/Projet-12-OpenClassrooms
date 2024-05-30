import React from "react";
import { Link } from 'react-router-dom';
import NavigationHor from "./NavigationHor";
import NavigationVer from "./NavigationVer";

function UserDashboard() {
  return (
    <div className="App">
      <NavigationHor />
      <div className="main-page">
        <NavigationVer />

        <div className="wrapper-choice">
          <div className="info-user-choice">
            <span>Veuillez choisir un utilisateur.</span>
          </div>
          <div className="wrapper-button-user-choice">
          <Link to="/user/12"><button className="button-user-choice">User 12</button></Link>
          <Link to="/user/18"><button className="button-user-choice">User 18</button></Link>
          </div>
        </div>


      </div>
    </div>
  );
}

export default UserDashboard;
