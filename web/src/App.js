import "./App.css";
// import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import Login from "./components/Onboarding/Login";
// import Otp from "./components/Onboarding/Otp";
import Email from "./Pages/Onboarding/Email"
import Verify from "./Pages/Onboarding/Verify";
import Scheduling from "./components/Scheduling/scheduling";
import Dcform from "./dcform";
import Verification from "./components/Verification";
import Status from "./components/Status";
import Formview from "./components/Formview";
import Dashboard from "./Pages/Dashboard/dashboard";
import EditSlotRemarks from "./Pages/Consultation/EditSlotRemarks";


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Email />} />
        {/* <Route path="/otp" element={<Otp />} /> */}
        <Route path="/otp" element={<Verify />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/dcform" element={<Dcform />} />
        {/* <Route path="/Verification" element={<Verification />} /> */}
        <Route path="/status" element={<Status />} />
        <Route path="/formview" element={<Formview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editslotremarks" element={<EditSlotRemarks />} />


        {/* <Route path="/time" element={<Time />} /> */}
      </Routes>
    </Router>
  );
  
}

export default App;

