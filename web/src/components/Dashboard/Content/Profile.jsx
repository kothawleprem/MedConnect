import React from 'react'
import { Row, Col, Card, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { MdEmail, MdLocationPin } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { FaStar, FaStarHalf } from "react-icons/fa";




const Specialization = [
  { id: 1, name: "Paediatric" },
  { id: 2, name: "Periodontology" },
  { id: 3, name: "Surgeon" },
];


const Profile = () => {
  return (
    <Container fluid="md">
      <Row>
     
         <Row>  
          <Card style={{ borderColor: 'white'}} className="mb-4 glass">
            <Card.Body style={{ margin: '10px' }}>
              {/* <div style={{margin:'10px'}} >   */}
              {/* <Card.Title style={{fontSize:'30px',fontWeight:600,color:'#4365CD'}}>PROFILE</Card.Title> */}
              {/* <div style={{marginLeft:'30px'}} >  */}

              <Row>
                <Card.Img variant="top" className="rounded-circle" src="https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg" style={{ width: '200px', height: '180px', border: '2px solid white' }} />

                <Col>
                  <Card.Title style={{ fontSize: '25px', fontWeight: 600, color: 'black' }}>Dr Prem Khothawle</Card.Title>
                  <Card.Title style={{ fontSize: '15px' }}>Paediatric Surgeon</Card.Title>


                  <Col style={{ marginBottom: '3px' }}>
                    {/* <Card.Title style={{fontSize:'15px'}}>4.4</Card.Title> */}
                    4.5  <FaStar size={20} color='#6970f1' />   <FaStar size={20} color='#6970f1' />   <FaStar size={20} color='#6970f1' /> <FaStarHalf size={20} color='#6970f1' />  </Col>



                  <Card.Title style={{ fontSize: '15px', color: 'black' }}>About</Card.Title>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </Col>
                
              </Row>
            </Card.Body>
          </Card>
          </Row>

          <Col style={{ marginTop: '10px' }}>
            <Card style={{ borderColor: 'white' }} className="shadow">
              <Card.Body>
                <Row>
                  <Col sm="1">
                    <Card.Text><MdEmail size={25} color='#6970f1' /> </Card.Text>
                  </Col>
                  <Col sm="8">
                    <Card.Text className="text-muted">example@examplecom</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="1">
                    <Card.Text>  <AiFillPhone size={25} color='#6970f1' /></Card.Text>
                  </Col>
                  <Col sm="8">
                    <Card.Text className="text-muted">(097) 234-5678</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="1">
                    <Card.Text><MdLocationPin size={25} color='#6970f1' /></Card.Text>
                  </Col>
                  <Col sm="8">
                    <Card.Text className="text-muted">panvel</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="1">
                    <MdLocationPin size={25} color='#6970f1' />
                  </Col>
                  <Col sm="8">
                    <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            </Col>

        <Col style={{ marginTop: '10px' }}>  
            <Card style={{ borderColor: 'white' }} className="mb-4 shadow">
              <Card.Body style={{ margin: '10px' }}>

                {/* <Card.Title style={{ fontSize: '30px', fontWeight: 600, color: '#4365CD' }}>VIDEO</Card.Title> */}

                {/* <video width="550" height="300" controls >
                  <source src={'https://drive.google.com/file/d/1HJv69WOCbTW9qngB2vzuSrTCn8_FHAdZ/preview'} type="video/mp4" />
                </video> */}

                <iframe src="https://drive.google.com/file/d/1HJv69WOCbTW9qngB2vzuSrTCn8_FHAdZ/preview" width="550" height="300" allow="autoplay"></iframe>
              </Card.Body>
            </Card>
       
            </Col>


            <Col style={{ marginTop: '10px' }}>
            <Card style={{ borderColor: 'white' }} className="shadow profileCard">
            <Card.Body>
                <h6 className='boldtext'>Information</h6>
                <hr class="mt-0 mb-4"/>
                <Row>
                  <Col>
                    <h6 className='boldtext'>Specialization</h6>
                    {Specialization.map((type) => (
                    <button  class="btn btn-outline-dark btn-rounded profilebtn btn-sm"
                    >{type.name}</button>
                    ))}


                  </Col>
                  <Col>
                    <h6 className='boldtext'>Qualification</h6>
                    <p class="text-muted">MBBS</p>
                  </Col>
                </Row>
                <h6 className='boldtext'>Experience</h6>
                <hr class="mt-0 mb-2"/>
                <Row>
                  <Col>
                    <h6 className='boldtext'>Experience</h6>
                    <p class="text-muted">16 Years</p>
                  </Col>
                  <Col>
                    <h6 className='boldtext'>Total Appointment</h6>
                    <p class="text-muted">1K</p>
                   </Col>
                 </Row>
                  </Card.Body>
              
            </Card>
            </Col>
      </Row>


    </Container>
  )
}

export default Profile






              // <Card.Body>
              //   <h6>Information</h6>
              //   <hr class="mt-0 mb-4"/>
              //   <Row>
              //     <Col>
              //       <h6>Email</h6>
              //       <p class="text-muted">info@example.com</p>
              //     </Col>
              //     <Col>
              //       <h6>Phone</h6>
              //       <p class="text-muted">123 456 789</p>
              //     </Col>
              //   </Row>
              //   <h6>Projects</h6>
              //   <hr class="mt-0 mb-4">
              //   <Row>
              //     <Col>
              //       <h6>Recent</h6>
              //       <p class="text-muted">Lorem ipsum</p>
              //     </Col>
              //     <Col>
              //       <h6>Most Viewed</h6>
              //       <p class="text-muted">Dolor sit amet</p>
              //      </Col>
              //    </Row>
              //     </Card.Body>
              