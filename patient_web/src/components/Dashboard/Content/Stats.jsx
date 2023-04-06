import React from 'react'
import { Row, Col, Card } from "react-bootstrap";
import { FaBeer } from "react-icons/fa";
import { Link } from 'react-router-dom';



const Stats = () => {
  return (
    <div>
      <Row>
        <Col xl={3} lg={3} md={6} sm={12}>

          <Card className='statscard'> 
        
          <Card.Subtitle className="stats-title">Total Unique Patients</Card.Subtitle>
          <Card.Title className='stats-total'>251</Card.Title>

          {/* <FaBeer size={30} className='stats-icon' /> */}

          <img src="https://cdn-icons-png.flaticon.com/512/3358/3358902.png" className='stats-icon' />

          <div className='stats-links'> 
         
          <p className='stats-green'> 15%</p>
          <Link to='/'>  
            <p className='stats-link'>View Report</p>
            </Link>
          </div>
          </Card>

        </Col>


        <Col xl={3} lg={3} md={6} sm={12}>
        <Card className='statscard'> 
        
        <Card.Subtitle className="stats-title">Total Patient Interactions</Card.Subtitle>
        <Card.Title className='stats-total'>251</Card.Title>
        <img src="https://cdn-icons-png.flaticon.com/512/1988/1988907.png" className='stats-icon' />

        {/* <FaBeer size={30} className='stats-icon' /> */}
        <div className='stats-links'> 

        <p className='stats-green'> 15%</p>
        <Link to='/'>  
        <p className='stats-link'>View Report</p>
        </Link>
        </div>
        </Card>
         
        </Col>
        <Col xl={3} lg={3} md={6} sm={12}>

        <Card className='statscard'> 
        
        <Card.Subtitle className="stats-title">Total Appointments</Card.Subtitle>
        <Card.Title className='stats-total'>251</Card.Title>
        <img src="https://cdn-icons-png.flaticon.com/512/7269/7269814.png" className='stats-icon' />

        {/* <FaBeer size={30} className='stats-icon' /> */}
        <div className='stats-links'> 
       
        <p className='stats-green'> 15%</p>
        <Link to='/'>  
        <p className='stats-link'>View Report</p>
        </Link>
        </div>
        </Card>

        
        </Col>
        <Col xl={3} lg={3} md={6} sm={12}>

        <Card className='statscard'> 
        
        <Card.Subtitle className="stats-title">Total Appointments</Card.Subtitle>
        <Card.Title className='stats-total'>251</Card.Title>
        <img src="https://cdn-icons-png.flaticon.com/512/3358/3358902.png" className='stats-icon' />

        {/* <FaBeer size={30} className='stats-icon' /> */}
        <div className='stats-links'> 
       
        <p className='stats-green'> 15%</p>
        <Link to='/'>  
        <p className='stats-link'>View Report</p>
        </Link>
        </div>
        </Card>
         
        </Col>
      </Row>
    </div>
  );
}

export default Stats