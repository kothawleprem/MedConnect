import React, { useState } from "react";
import { Container, Row, Col} from "react-bootstrap";


import './dashboard.css'


import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import ContentMain from "../../components/Dashboard/Content/ContentMain";
import Appointment from "../../components/Dashboard/Content/Appointment";
import Payments from "../../components/Dashboard/Content/Payments";
import Addpackage from "../../components/Dashboard/Content/Addpackage";

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
            {selectedComponent === "Packages" && <ContentMain />}
            {selectedComponent === "AddPackage" && <Addpackage />}
            {selectedComponent === "Appointments" && <Appointment />}
            {selectedComponent === "Payments" && <Payments />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
