import React from 'react'
import { Row, Col, Card } from "react-bootstrap";

import Stats from './Stats';
import DashAppointments from './DashAppointments';
import DashFreeSlots from './DashFreeSlots';
import DashRecentPatients from './DashRecentPatients';
import './Content.css'
import DashCallender from './DashCallender';


const ContentMain = () => {
  return (
    <div>
      <Row>
        <Col style={{fontWeight:'500'}}>Manage Packages</Col>
      </Row>
      <br />
      <div >
        <Stats />
      </div>
      <br />
      <Row>
        <Col >
          <DashAppointments/>
        </Col>

      </Row>
    </div>
  );
}

export default ContentMain