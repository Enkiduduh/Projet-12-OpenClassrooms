import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function NavigationHor() {
  return (
    <div className="nav-hor-container">
      <div className="nav-hor-flex">
        <div className="nav-hor-logo">
          <Link to="/">
            <img src={Logo} alt="Logo de SportSee"></img>
          </Link>
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
