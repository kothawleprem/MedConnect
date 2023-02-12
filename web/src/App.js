import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Otp from './Otp';
import Home from './LandingPage/Home.js'
function App() {
  return (
    <>
     <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>
      {/* <Route path="/" element={<PreVideo />} />
      <Route path="/video" element={<Video />}/>  */}
    </Routes>
      </Router>

    </>
  );
}

export default App;
