import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AllSlots from './allSlots';
import CreateSlot from './createSlot';

function Scheduling() {
  return (
    <>
      <Container>
        <Row>
          <Col xs={8}>
            <CreateSlot/>
          </Col>

          <Col xs={4}>
            <h1>All Slots for the Day</h1>
            <AllSlots/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Scheduling