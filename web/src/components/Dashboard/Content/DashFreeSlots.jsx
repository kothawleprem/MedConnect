import React from 'react'
import { Row, Col, Card } from "react-bootstrap";
import Container from 'react-bootstrap/Container';


const DashFreeSlots = () => {
  return (
    <div >
        <Card style={{margin:'10px'}}>
      
        <Card.Header>Free Slots for Today</Card.Header>

        <Container>
      <Row>
        <Col>

         <div style={{margin:'10px'}} >
          <div className='slot-button'> 
         9:30
          </div>

         </div>
         
         </Col>
        <Col xs={5}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col xs={5}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
   
        </Card>
    </div>
  )
}

export default DashFreeSlots