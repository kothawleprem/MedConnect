import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../../Pages/LandingPage/header.css';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <>
      <Navbar  className='shadow-sm'>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="Assets/MedConnect.png"
              width="150"
              height="25"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <div className="collapse navbar-collapse side" id="navbarSupportedContent">
                            <ul id="nav" className="navbar-nav ml-auto">
                                <li style={{padding:'10px'}} className="nav-item active">
                                <Link style={{ textDecoration: 'none',color: '#777',fontSize: '16px', fontWeight: '600' }} to="/">Home</Link>
                                </li>

                                <li  style={{padding:'10px'}} className="nav-item">
                                    <Link  style={{ textDecoration: 'none',color: '#777',fontSize: '16px', fontWeight: '600' }} to="/search">Find Doctors</Link>
                                </li>

                                <li style={{padding:'10px'}} className="nav-item">
                                    < Link  style={{ textDecoration: 'none',color: '#777',fontSize: '16px', fontWeight: '600' }} to="/bySpecialization">Specialization</Link>
                                </li>
                
                                <li  style={{padding:'10px'}} className="nav-item">
                                    <Link style={{ textDecoration: 'none',color: '#777',fontSize: '16px', fontWeight: '600' }} to="/lab">Lab Test</Link>
                                </li>
                                
                           
                            </ul> 
                        </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

