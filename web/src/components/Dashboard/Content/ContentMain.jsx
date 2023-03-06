import React from 'react'
import { Row, Col, Card } from "react-bootstrap";

import Stats from './Stats';
import DashAppointments from './DashAppointments';
import DashFreeSlots from './DashFreeSlots';
import DashRecentPatients from './DashRecentPatients';

const ContentMain = () => {
  return (
    <div>
      <Row>
        <Col>Greetings</Col>
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
      </Row>
    </div>
  );
}

export default ContentMain