import React from 'react'
import { Nav } from "react-bootstrap";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div>
      <Nav className="flex-column sidebar" expand="lg" fixed="left">
        <Nav.Link href="#">
          <FaHome className="mr-2" /> {isMobile ? null : "Home"}
        </Nav.Link>
        <Nav.Link href="#">
          <FaUser className="mr-2" /> {isMobile ? null : "Profile"}
        </Nav.Link>
        <Nav.Link href="#">
          <FaCog className="mr-2" /> {isMobile ? null : "Settings"}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar