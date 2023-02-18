import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Nav() {
  return (
    <> 
    <Navbar  variant="light"  style={{backgroundColor:'white'}} className='shadow-sm'>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/Assets/MedConnect.png"
              width="165"
              height="30"
              className="d-inline-block align-top"
            />{' '}
        {/* MedConnect */}
          </Navbar.Brand>
        </Container>
      </Navbar>
      </>
  )
}
