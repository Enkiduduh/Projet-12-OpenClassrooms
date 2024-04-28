import "./styles/index.css";
import UserDashboard from "./components/UserDashboard";
import NoFound from "./components/NoFound";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faHandsClapping } from '@fortawesome/free-solid-svg-icons';


// library.add(fas, faHandsClapping)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard/>} />
        <Route path="*" element={<NoFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
