import React from 'react'
import { Button, Nav } from "react-bootstrap";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import './Sidebar.css'


const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className='side-bar'>
      <img
              alt=""
              src="/Assets/MedConnect.png"
              width="165"
              height="30"
              className="d-inline-block align-top"
            />
      <Nav className="flex-column sidebar " expand="lg" fixed="left">
    
    <div className='sidemenu'>   
        <Nav.Link   href="#">
          <FaHome className="mr-2" /> {isMobile ? null : "Home"} 
        </Nav.Link>
        </div>

        <div className='sidemenu'>   
        <Nav.Link className='sidemenu' href="#">
          <FaUser className="mr-2" /> {isMobile ? null : "Profile"}
        </Nav.Link>
        </div>

        <div className='sidemenu'>   

        <Nav.Link className='sidemenu' href="#">
          <FaCog className="mr-2" /> {isMobile ? null : "Settings"}
        </Nav.Link>
        </div>

      </Nav>
    </div>
  );
};

export default Sidebar