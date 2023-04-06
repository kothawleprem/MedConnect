import React from 'react'
import Specialists from '../LandingPage/Specialists'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Bar from '../../components/Navbar';
import DoctorCard from '../../components/singleDoctor/DoctorCard';




export default function Consultation() {
  return (
   
    <div>
        {/* <Bar/> */}
        Consultation

<Container>   
<Row>
        <Col></Col>
        <Col>
        <div> 
     <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

     </div>
        
        </Col>
      </Row>
      </Container>

     
     <Specialists/>
   
     <DoctorCard/>



    </div>
  )
}
