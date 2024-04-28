import React from "react";
import handsClap from "../assets/clap.png";

function Bonjour({ user }) {
  return (
    <div>
      <div className="bonjour-container">
        <div className="bonjour1">Bonjour</div>
        <div className="bonjour2"> {user}</div>
      </div>
      <div className="objectifs">
        Félicitations ! Vous avez explosé vos objectifs hier
        <img src={handsClap} alt=""></img>
      </div>
    </div>
  );
}

export default Bonjour;
