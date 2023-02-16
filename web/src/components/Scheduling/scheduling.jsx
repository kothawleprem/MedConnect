import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AllSlots from './allSlots';
import CreateSlot from './createSlot';
import Nav from './Nav';
import "./Scheduling.css";


function Scheduling() {
  return (
    <>
    <Nav/>
      <Container>
      
        <Row>
          <Col xs={8}>
            <CreateSlot/>
          </Col>

          <Col xs={4}>
            <br/>
            <br/>
            <br/>
            <h2>All Slots for the Day</h2>
            <AllSlots/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Scheduling