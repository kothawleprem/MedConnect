import React from 'react'
import { Row,Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './DoctorCard.css';



export default function DoctorCard(data) {
  return (
    <div>

<Card className='doctorcard '>
      <Card.Body>
<Row>   
  <Col> 
  <Card >  

  <img  className='dcimg'  src={data.photo}/>
   </Card>

  </Col>
  <Col>
  <Card.Title className='dctitle'>data.name</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">data.qualification</Card.Subtitle>
        <p>data.specialization</p>
        <p style={{fontWeight:'700'}}>₹500</p>

  </Col>

  <Row>
  
    <Col>
    <center> 
    <Button className='button'>Consult now</Button>

    </center>

    </Col>
  </Row>
</Row>
      </Card.Body>
    </Card>
    </div>
  )
}
