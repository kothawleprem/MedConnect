import React from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'

const Availability = () => {
    
  return (
    <>
      <Container>
        <Row>
          <Col xl={8} lg={8} sm={8} xs={8}>
            <h4> Your current Availability for Instant Consultation is Set to: Avaiable</h4>
          </Col>
          <Col xl={4} lg={4} sm={4} xs={4}>
            <Button size="sm">Change Availability</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Availability