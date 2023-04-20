import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Video from "./components/video";
import Home from "./Pages/LandingPage/Home"

import PreVideo from "./components/preVideo";
import Book from "./components/Book";

import Email from "./Pages/Onboarding/Email";
import Verify from "./Pages/Onboarding/Verify";
import Dashboard from "./Pages/Dashboard/dashboard";
import Consultation from "./Pages/Consultation/Consultation";

import SearchDoctors from "./Pages/Search/SearchDoctors";
import DoctorsBySpecialization from "./Pages/Search/DoctorsBySpecialization";
import DoctorProfile from "./Pages/Consultation/DoctorProfile";

import BookSlot from "./Pages/Consultation/BookSlot";

import Instant from "./Pages/Instant/Instant";
import ManageAppointment from "./Pages/ManageAppointment/ManageAppointment";

import Payments from "./Pages/Payments/Payments";
import CapturePayments from "./Pages/Payments/CapturePayments"




function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preVideo" element={<PreVideo />} />
      <Route path="/video" element={<Video />}/> 
      {/* <Route path="/bookapointment" element={<Book />}/> */}
          <Route path="/verify" element={<Verify />} />
          <Route path="/search" element={<SearchDoctors />} />
          <Route
            path="/bySpecialization"
            element={<DoctorsBySpecialization />}
          />
          <Route path="/email" element={<Email />} />
          <Route path="/consultation" element={<Consultation />} />

          <Route path="/instant" element={<Instant />} />
          <Route path="/manageappointment" element={<ManageAppointment />} />




          <Route path="/doctorProfile" element={<DoctorProfile />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/capturePayments" element={<CapturePayments />} />


          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookSlot" element={<BookSlot />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
