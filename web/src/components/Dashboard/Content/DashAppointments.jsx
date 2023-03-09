import React , {useState} from 'react'
import { Row, Col, Card } from "react-bootstrap";

const DashAppointments = () => {
  const [first, setfirst] = useState("")
  const data = [
    { id: 1, name: "John Doe", time:"ongoing",type:"Clinic Consulting" },
    { id: 2,  name: "Shubham saroj", time:"11:30",type:"Clinic Consulting" },
    { id: 3,  name: "Onkar d vidhte", time:"12:30",type:"Emergency" },
  ];

  return (
    <div style={{margin:"10px"}}>
      <Card> 
      <Card.Body style={{padding:"10px"}}>
        <p className='appoint-title'> Today's Appointments</p>
        </Card.Body>
      
        {data.map((user) => (
        <Card  className='appoint-card' style={{margin:'5px'}}>
          <Card.Body  >
          <div className='appoint'>  
            <img alt="" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"  className="appoint-img"/>
          
           <Card.Title style={{marginLeft:'10px', fontSize:'18px'}}>{user.name}</Card.Title>
           <p style={{marginLeft:'70px'}}>{user.time}</p>
           </div>
           <Card.Subtitle style={{marginLeft:'40px', fontSize:'13px',marginTop:'-13px'}}>{user.type}</Card.Subtitle>
            
          </Card.Body>
        </Card>
         ))}
        

        

     

         </Card>
    </div>
  );
}

export default DashAppointments