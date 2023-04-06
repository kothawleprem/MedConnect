import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Nav.css';

function Bar() {
  return (
    <>
      <Navbar  expand="lg" className='header-area shadow-sm'>
        <Container fluid>
          <Navbar.Brand  href="#">
          <img
              src="Assets/MedConnect.png"
              width="150"
              height="25"
             
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-1 side "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          
            {/* <Nav.Link style={{fontSize:"17px",fontWeight:"600"}} className='navitem' href="#">Login</Nav.Link> */}
            
            <Nav.Link style={{fontSize:"17px",fontWeight:"600"}} className='nav-item' href="/About">About us</Nav.Link>
            <Nav.Link style={{fontSize:"17px",fontWeight:"600"}} className='nav-item' href="/Contact">Contact us</Nav.Link>
           
      
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Bar;
