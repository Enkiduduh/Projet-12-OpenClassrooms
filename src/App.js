import "./styles/index.css";
import UserDashboard from "./components/UserDashboard";
import NoFound from "./components/NoFound";
import User from "./components/User";

import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard/>} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NoFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
