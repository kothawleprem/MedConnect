//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Video from "./components/video";
import Home from "./components/LandingPage/Home.js"

import PreVideo from "./components/preVideo";
import Book from "./components/Book";



function App() {
  return (
    <>
     <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/preVideo" element={<PreVideo />} />
      <Route path="/video" element={<Video />}/> 
      <Route path="/bookapointment" element={<Book />}/>
    </Routes>
      </Router>

    </>
  );
}

export default App;
