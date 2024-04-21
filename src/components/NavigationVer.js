import React from "react";
import iconSwim from "../assets/icn-swim.png";
import iconMedit from "../assets/icn-medit.png";
import iconRide from "../assets/icn-ride.png";

import iconHalt from "../assets/icn-halt.png";

function NavigationVer() {
  return (
    <div className="nav-ver-container">
      <div className="nav-ver-img-sport">
        <img src={iconMedit} alt="icône de méditation"></img>
      </div>
      <div className="nav-ver-img-sport">
        <img src={iconSwim} alt="icône de nageur"></img>
      </div>
      <div className="nav-ver-img-sport">
        <img src={iconRide} alt="icône de cycliste"></img>
      </div>
      <div className="nav-ver-img-sport">
        <img src={iconHalt} alt="icône d'une haltère'"></img>
      </div>
      <span className="nav-ver-infos">Copyright, SportSee 2020</span>
    </div>
  );
}

export default NavigationVer;
