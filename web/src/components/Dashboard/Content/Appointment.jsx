import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';



const slot = [
  { slot_id: 1, name: "John Doe", time:"ongoing",type:"Clinic Consulting" },
  { slot_id: 2,  name: "Shubham saroj", time:"11:30",type:"Clinic Consulting" },
  { slot_id: 3,  name: "Onkar d vidhte", time:"12:30",type:"Emergency" },
  { slot_id: 4,  name: "Onkar d vidhte", time:"12:30",type:"Emergency" },
  { slot_id: 5,  name: "Onkar d vidhte", time:"12:30",type:"Emergency" },
  { slot_id: 6,  name: "Onkar d vidhte", time:"12:30",type:"Emergency" },
];


const Appointment = () => {
  const navigate = useNavigate();

  

  const handleSubmit = (slot_id) => {
    console.log(slot_id)
    navigate("/viewappointments", {
      state: {
        slot_id: slot_id,
      },
    });
  }



  
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
        <Col>View</Col>
     
      </Row>
      </Card.Body> 
      </Card>
    



<<<<<<< HEAD
{slot.map((slot) => (
        <Card  className='appoint-card' style={{margin:'5px'}}>
=======
{data.map((user) => (
        <Card  className='appoint-card' style={{margin:'5px'}} key={user.id}>
>>>>>>> 3e98574e0f8f548f7a6f1c60b4164484f518cbc7
          <Card.Body  >
            <Row> 
          
          <Col> <Card.Subtitle>{slot.name}</Card.Subtitle></Col>
          <Col><Card.Subtitle>{slot.time}</Card.Subtitle></Col>
          <Col><Card.Subtitle>{slot.type}</Card.Subtitle></Col>
          <Col><Card.Subtitle> 
          <Button onClick={() => handleSubmit(slot.slot_id)}  className='view-butt'> view </Button>
            
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