import React from 'react'
import { Row,Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './DoctorCard.css';



export default function DoctorCard() {
  return (
    <div>

<Card className='doctorcard '>
      <Card.Body>
<Row>   
  <Col> 
  <Card >  

  <img  className='dcimg'  src='https://assets.mfine.co/api/contentservice/attachments/downloadFromDb?fileName=Dr.-Neeraj%20(1).jpg/w_229,h_310'/>
   </Card>

  </Col>
  <Col>
  <Card.Title className='dctititle'>Dr. Prem kotawale</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">MBBS,MD</Card.Subtitle>
        <p>Psychiatrist</p>
        <p style={{fontWeight:'700'}}>₹500</p>
        <Button className='exp'>11 years exp</Button>

  </Col>

  <Row>
    <Col>

    <Button className='button' >Know more</Button>
    </Col>
    <Col>
    <Button className='button'>Consult now</Button>

    </Col>
  </Row>
</Row>
      </Card.Body>
    </Card>
    </div>
  )
}
