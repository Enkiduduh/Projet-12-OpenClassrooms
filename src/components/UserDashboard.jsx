import React from "react";
// import Bonjour from "./components/Bonjour";
import NavigationHor from "./NavigationHor";
import NavigationVer from "./NavigationVer";
// import NutrimentIntel from "./components/NutrimentIntel";
// import RadarStats from "./components/RadarStats";
import Dashboard from "./Dashboard";

function UserDashboard() {
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

export default UserDashboard;
