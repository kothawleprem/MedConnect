import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './Login';
import Otp from './Otp';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/'  element={<Login/>} />
        <Route path='/otp'   element={<Otp/>} />
      </Routes>
    </Router>
  );
}

export default App;
