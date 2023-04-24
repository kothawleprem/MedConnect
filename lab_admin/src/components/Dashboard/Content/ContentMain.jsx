import React from 'react'
import { Row, Col, Card } from "react-bootstrap";

import Stats from './Stats';
import DashAppointments from './DashAppointments';
import './Content.css'


const ContentMain = () => {
  return (
    <div>
      <Row>
        <Col style={{fontWeight:'600',fontSize:'25px'}}>Manage Packages</Col>
      </Row>
      <br />
      <div >
        <Stats />
      </div>
      <br />
      {/* <Row>
        <Col >
          <DashAppointments/>
        </Col>

      </Row> */}
    </div>
  );
}

export default ContentMain