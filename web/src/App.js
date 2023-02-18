import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "./components/Onboarding/Login";
import Otp from "./components/Onboarding/Otp";
import Email from "./components/Onboarding/Email";
import Verify from "./components/Onboarding/Verify";
import Scheduling from "./components/Scheduling/scheduling";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Email />} />
        {/* <Route path="/otp" element={<Otp />} /> */}
        <Route path="/verify" element={<Verify />} />
        <Route path="/scheduling" element={<Scheduling />} />
        {/* <Route path="/time" element={<Time />} /> */}

      </Routes>
    </Router>
  );
  
}

export default App;

