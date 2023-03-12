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
        <Col style={{fontWeight:'500'}}>Greetings</Col>
      </Row>
      <br />
      <div >
        <Stats />
      </div>
      <br />
      <Row>
        <Col xl={4} lg={4} md={12} sm={12}>
          <DashAppointments/>
        </Col>
      
       

        <Col xl={8} lg={8} md={12} sm={12}>
          <Row>
            <DashFreeSlots/>
          </Row>
          <br />
          <Row>
            <DashRecentPatients/>
          </Row>
        </Col>
        <Col xl={4} lg={4} md={12} sm={12}>
          <DashCallender/>
        </Col>
      </Row>
    </div>
  );
}

export default ContentMain