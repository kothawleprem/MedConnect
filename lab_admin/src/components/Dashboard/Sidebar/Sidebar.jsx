import React from 'react'
import { Button, Nav } from "react-bootstrap";
import { FaHome, FaUser, FaCog,FaClipboardList } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import './Sidebar.css'


const Sidebar = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  return (
    <div className="side-bar">
      {/* <img
        alt=""
        src="/Assets/MedConnect.png"
        width="165"
        height="30"
        className="d-inline-block align-top"
      /> */}

      <p
        style={{
          fontSize: "1.8rem",
          fontWeight: "900",
          color: "white",
          marginTop: "8px",
        }}
      >
        <span style={{ color: "orange" }}>Med</span>Connect
      </p>
      <Nav className="flex-column sidebar " expand="lg" fixed="left">
        <div className="sidemenu">
          <Nav.Link
            onClick={() => props.onClickButton("Packages")}
            className="sidemenu"
            href="#"
          >
            <FaHome className="mr-2" /> {isMobile ? null : "Packages"}
          </Nav.Link>
        </div>

        <div className="sidemenu">
          <Nav.Link
            onClick={() => props.onClickButton("AddPackage")}
            className="sidemenu"
            href="#"
          >
            <AiFillFileAdd className="mr-2" /> {isMobile ? null : "Add Package"}
          </Nav.Link>
        </div>

        <div className="sidemenu">
          <Nav.Link
            onClick={() => props.onClickButton("Appointments")}
            className="sidemenu"
            href="#"
          >
            <FaClipboardList className="mr-2" />{" "}
            {isMobile ? null : "Appointment"}
          </Nav.Link>
        </div>

        <div className="sidemenu">
          <Nav.Link
            onClick={() => props.onClickButton("Payments")}
            className="sidemenu"
            href="#"
          >
            <MdPayment className="mr-2" /> {isMobile ? null : "Payments"}
          </Nav.Link>
        </div>

     
      </Nav>
    </div>
    
  );
};

export default Sidebar