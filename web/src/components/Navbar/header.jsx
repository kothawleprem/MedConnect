import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

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
        </Container>
      </Navbar>
    </>
  );
}

export default Header;