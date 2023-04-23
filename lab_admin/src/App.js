import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Email from "./Pages/Onboarding/Email";
import Verify from "./Pages/Onboarding/Verify";
import "./style.css"
import LabForm from './components/LabForm';
import Addpackage from './Pages/Package/Addpackage';
import Status from './components/Status';
import Dashboard from './Pages/Dashboard/dashboard';


function App() {
  return (
    <Router>
    <Routes>
      {/* <Route path="" element={<Home/>} /> */}
      <Route path="/email" element={<Email />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/form" element={<LabForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/status" element={<Status />} />


      <Route path="/addpackage" element={<Addpackage />} />


    </Routes>
  </Router>
  );
}

export default App;
