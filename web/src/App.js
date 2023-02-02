import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Otp from './Otp';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={Login} />
        <Route path='/Otp' component={Otp} />
      </Routes>
    </Router>
  );
}

export default App;
