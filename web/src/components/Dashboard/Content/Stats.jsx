import React from 'react'
import { Row, Col, Card } from "react-bootstrap";

const Stats = () => {
  return (
    <div>
      <Row>
        <Col xl={3} lg={3} md={6} sm={12}>
          <Card>Total Unique Patients</Card>
        </Col>
        <Col xl={3} lg={3} md={6} sm={12}>
          <Card>Total Patient Interactions</Card>
        </Col>
        <Col xl={3} lg={3} md={6} sm={12}>
          <Card>Total Appointments</Card>
        </Col>
        <Col xl={3} lg={3} md={6} sm={12}>
          <Card>Payment Earned</Card>
        </Col>
      </Row>
    </div>
  );
}

export default Stats