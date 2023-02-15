import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Nav() {
  return (
    <> 
    <Navbar bg="light" variant="light"  className='shadow-sm'>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
        MedConnect
          </Navbar.Brand>
        </Container>
      </Navbar>
      </>
  )
}
