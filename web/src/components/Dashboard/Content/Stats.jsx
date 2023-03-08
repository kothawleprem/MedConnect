import React from 'react'
import { Row, Col, Card } from "react-bootstrap";
import { FaBeer } from "react-icons/fa";


const Stats = () => {
  return (
    <div>
      <Row>
        <Col xl={3} lg={3} md={6} sm={12}>

          <Card className='statscard'> 
        
          <Card.Subtitle className="stats-title">Total Unique Patients</Card.Subtitle>
          <Card.Title className='stats-total'>251</Card.Title>
          <FaBeer size={30} className='stats-icon' />
          <div className='stats-links'> 
         
          <p className='stats-green'> 15%</p>
          <p className='stats-link'>View Report</p>
          {/* <Card.Link className='stats-link' href="#">CardLink</Card.Link> */}
          </div>
          </Card>

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