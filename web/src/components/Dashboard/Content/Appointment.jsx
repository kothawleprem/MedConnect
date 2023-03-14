import React, {useState} from 'react'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { Button } from "react-bootstrap";


const data = [
  { id: 1, name: "John Doe", time:"ongoing",type:"Clinic Consulting" },
  { id: 2,  name: "Shubham saroj", time:"11:30",type:"Clinic Consulting" },
  { id: 3,  name: "Onkar d vidhte", time:"12:30",type:"Emergency" },
  { id: 4,  name: "Onkar d vidhte", time:"12:30",type:"Emergency" },
  { id: 5,  name: "Onkar d vidhte", time:"12:30",type:"Emergency" },
  { id: 6,  name: "Onkar d vidhte", time:"12:30",type:"Emergency" },
];


const Appointment = () => {
  const [view, setView] = useState(true)
  return (
    <div>
        <Card> 
      <Card.Body style={{padding:"10px"}}>
        <p className='appoint-title'>Appointments</p>
        </Card.Body>
     

<Card className='appoint-card' style={{margin:'5px' ,backgroundColor:"aliceblue"}}>  
  <Card.Body>  
<Row>
        <Col>Patient Name</Col>
        <Col>Type</Col>
        <Col>Time</Col>
        <Col>Status</Col>
     
      </Row>
      </Card.Body> 
      </Card>
    



{data.map((user) => (
        <Card  className='appoint-card' style={{margin:'5px'}} key={user.id}>
          <Card.Body  >
            <Row> 
          
          <Col> <Card.Subtitle>{user.name}</Card.Subtitle></Col>
          <Col><Card.Subtitle>{user.time}</Card.Subtitle></Col>
          <Col><Card.Subtitle>{user.type}</Card.Subtitle></Col>
          <Col><Card.Subtitle> 
          <Button  className='view-butt'> view </Button>
            
            </Card.Subtitle></Col>

           </Row>
          </Card.Body>
        </Card>
         ))}
    </Card>
    </div>
  )
}

export default Appointment