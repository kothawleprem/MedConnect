import Video from "./components/video";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./components/LandingPage/Home.js"


function App() {
  return (
    <>
     <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/video" element={<Video />}/> 
      </Routes>
      </Router>
    </>
  );
}

export default App;
