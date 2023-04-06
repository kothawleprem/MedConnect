import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Video from "./components/video";
import Home from "./Pages/LandingPage/Home"

import PreVideo from "./components/preVideo";
import Book from "./components/Book";

import Email from "./Pages/Onboarding/Email";
import Verify from "./Pages/Onboarding/Verify";
import Dashboard from "./Pages/Dashboard/dashboard";
import Consultation from "./Pages/Consultation/Consultation";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/preVideo" element={<PreVideo />} />
      <Route path="/video" element={<Video />}/> 
      <Route path="/bookapointment" element={<Book />}/> */}
          <Route path="/verify" element={<Verify />} />
          <Route path="/email" element={<Email />} />
          <Route path="/consultation" element={<Consultation />} />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}


        </Routes>
      </Router>
    </>
  );
}

export default App;
