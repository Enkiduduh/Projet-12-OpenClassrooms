import "./styles/index.css";
import Bonjour from "./components/Bonjour";
import NavigationHor from "./components/NavigationHor";
import NavigationVer from "./components/NavigationVer";
import NutrimentIntel from "./components/NutrimentIntel";
import RadarStats from "./components/RadarStats";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function App() {
  return (
    <div className="App">
      <NavigationHor />
      <div className="main-page">
        <NavigationVer />
        <div className="main-page-container">
          <div className="main-page-bonjour">
            <Bonjour />
          </div>
          <div className="main-page-infos">
            <div className="main-page-graphics">
              <div className="upper-graphics">
                <div className="activity-daily"></div>
              </div>
              <div className="lower-graphics">
                <div className="average-session"></div>
                <div className="radar-stat"></div>
                <div className="radial-chart"></div>
              </div>
            </div>
            <div className="main-page-values">
              <NutrimentIntel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
