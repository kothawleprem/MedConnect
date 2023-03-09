import React from 'react'
import { Row, Col, Card, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';


const DashFreeSlots = () => {
  return (
    <div >
        <Card style={{margin:'10px'}}>
      
        <Card.Header style={{fontWeight:'500'}}> Free Slots for Today </Card.Header>

        <Container>
      

      <Row  style={{margin:'10px'}}>
        <Col xl={4} lg={4} md={4} sm={12}>
         <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
         </Col>
         


        <Col xl={4} lg={4} md={4} sm={12}>
        <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
        </Col>

        <Col xl={4} lg={4} md={4} sm={12}>
        <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
        </Col>

      </Row>
      <Row style={{margin:'10px'}}>

        <Col>
        <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
        </Col>

        <Col>
        <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
        </Col>

        <Col>
        <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
        </Col>

      </Row>


      <Row style={{margin:'10px'}}>

<Col>
<Button className='st-butt rounded-pill'>9:00 to 9:30 
<img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
</Button>
</Col>

<Col>
<Button className='st-butt rounded-pill'>9:00 to 9:30 
<img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
</Button>
</Col>

<Col>
<Button className='st-butt rounded-pill'>9:00 to 9:30 
<img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
</Button>
</Col>

</Row>
    </Container>
   
        </Card>
    </div>
  )
}

export default DashFreeSlots