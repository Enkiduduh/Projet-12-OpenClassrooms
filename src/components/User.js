import { useParams } from 'react-router-dom'
import NavigationHor from "./NavigationHor";
import NavigationVer from "./NavigationVer";
import "../styles/index.css";
import Dashboard from "./Dashboard";

function User() {



  const { id } = useParams()
  console.log("L'ID DE LA PAGE :")
  console.log({ id })


  return (
    <div className="App">
      <NavigationHor />
      <div className="main-page">
        <NavigationVer />
        <Dashboard />
      </div>
    </div>
  );
}

export default User;
