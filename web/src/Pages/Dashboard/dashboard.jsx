import React, { useState } from "react";
import { Container, Row, Col} from "react-bootstrap";

import { useMediaQuery } from "react-responsive";

import './dashboard.css'


import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import ContentMain from "../../components/Dashboard/Content/ContentMain";
import Profile from "../../components/Dashboard/Content/Profile"
import Appointment from "../../components/Dashboard/Content/Appointment";
import Payments from "../../components/Dashboard/Content/Payments";
import Settings from "../../components/Dashboard/Content/Settings";
import Scheduling from "../../components/Scheduling/scheduling";
// import Instant from "../../components/Dashboard/Content/Instant";

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("ContentMain");


  return (
    <div>
      <Container style={{ backgroundColor: "#4365CD" }} fluid>
        <Row>
          <Col xl={3} lg={3} md={2} sm={6} className="sidebar-wrapper">
            <Sidebar
              onClickButton={(component) => setSelectedComponent(component)}
            />
          </Col>
          <Col xl={9} lg={9} md={10} sm={6} className="content-wrapper">
            {selectedComponent === "ContentMain" && <ContentMain />}
            {selectedComponent === "Profile" && <Profile />}
            {selectedComponent === "Scheduling" && <Scheduling />}
            {selectedComponent === "Appointments" && <Appointment />}
            {selectedComponent === "Payments" && <Payments />}
            {selectedComponent === "Settings" && <Settings />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
