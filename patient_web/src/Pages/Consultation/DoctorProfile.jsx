import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useEffect, useState } from "react";

import axios from "axios";
const DoctorProfile = () => {
  const [doctor, setDoctor] = useState([]);
  const [todaySlots, setTodaySlots] = useState()
  const [tomorrowSlots, setTomorrowSlots] = useState();
  const navigate = useNavigate();
    const { state } = useLocation();
    console.log("id", state.doctor_id)

  const handleClick = (id) => {
    console.log("slot_id", id)
    navigate("/bookSlot", {
      state: {
        slot_id: id,
      },
    });
  }

    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/patients/doctor_profile?doctor_id=${state.doctor_id}`)
        .then((response) => {
          const data = response.data;
          setDoctor(data);
          setTodaySlots(data.slots[0])
          setTomorrowSlots(data.slots[1])
        });
    },[])

  return (
    <Container fluid="md">
      <br />
      <Row>
        <Col xl={7} lg={7} md={6} sm={12}>
          <br />
          <Card style={{ borderColor: "white" }} className="mb-4 glass">
            <Card.Body style={{ margin: "10px" }}>
              {/* <div style={{margin:'10px'}} >   */}
              {/* <Card.Title style={{fontSize:'30px',fontWeight:600,color:'#4365CD'}}>PROFILE</Card.Title> */}
              {/* <div style={{marginLeft:'30px'}} >  */}

              <Row>
                <Card.Img
                  variant="top"
                  className="rounded-circle"
                  src={doctor.photo}
                  style={{
                    width: "200px",
                    height: "180px",
                    border: "2px solid white",
                  }}
                />

                <Col>
                  <Card.Title
                    style={{
                      fontSize: "25px",
                      fontWeight: 600,
                      color: "black",
                    }}
                  >
                    Dr {doctor.name}
                  </Card.Title>
                  <Card.Title style={{ fontSize: "15px" }}>
                    {doctor.specialization}
                  </Card.Title>

                  <Card.Title style={{ fontSize: "15px", color: "black" }}>
                    About
                  </Card.Title>
                  <p>{doctor.description}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={5} lg={5} md={6} sm={12}>
          {/* <Card.Title style={{ fontSize: '30px', fontWeight: 600, color: '#4365CD' }}>VIDEO</Card.Title> */}

          <video width="500" height="300" controls>
            <source src={doctor.video} type="video/mp4" />
          </video>
        </Col>
      </Row>
      <Row>
        <Col xl={4} lg={4} md={6} sm={12}>
          <Card style={{ borderColor: "white" }} className="shadow">
            <Card.Body>
              <Row>
                <Col sm="1">
                  <Card.Text>
                    <MdEmail size={25} color="#6970f1" />{" "}
                  </Card.Text>
                </Col>
                <Col sm="8">
                  <Card.Text className="text-muted">{doctor.email}</Card.Text>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="1">
                  <Card.Text>
                    {" "}
                    <AiFillPhone size={25} color="#6970f1" />
                  </Card.Text>
                </Col>
                <Col sm="8">
                  <Card.Text className="text-muted">{doctor.phone}</Card.Text>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="1">
                  <Card.Text>
                    <MdLocationPin size={25} color="#6970f1" />
                  </Card.Text>
                </Col>
                <Col sm="8">
                  <Card.Text className="text-muted">
                    {doctor.city}, {doctor.state}
                  </Card.Text>
                </Col>
              </Row>
              <hr />
            </Card.Body>
          </Card>
        </Col>
        {/* <Col xl={4} lg={4} md={6} sm={12}>
          <Card style={{ borderColor: "white" }} className="shadow profileCard">
            <Card.Body>
              <h6 className="boldtext">Information</h6>
              <hr class="mt-0 mb-4" />
              <Row>
                <Col>
                  <h6 className="boldtext">Specialization</h6>
                  {Specialization.map((type) => (
                    <button class="btn btn-outline-dark btn-rounded profilebtn btn-sm">
                      {type.name}
                    </button>
                  ))}
                </Col>
                <Col>
                  <h6 className="boldtext">Qualification</h6>
                  <p class="text-muted">MBBS</p>
                </Col>
              </Row>
              <h6 className="boldtext">Experience</h6>
              <hr class="mt-0 mb-2" />
              <Row>
                <Col>
                  <h6 className="boldtext">Experience</h6>
                  <p class="text-muted">16 Years</p>
                </Col>
                <Col>
                  <h6 className="boldtext">Total Appointment</h6>
                  <p class="text-muted">1K</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col> */}
        <Col xl={8} lg={8} md={6} sm={12}>
          <Card style={{ margin: "10px" }}>
            <Card.Header style={{ fontWeight: "500" }}>
              Free Slots for Today
            </Card.Header>

            <Container>
              <Row style={{ margin: "10px" }}>
                {todaySlots !== undefined &&
                  todaySlots.map((slot) => {
                    console.log("logging");
                    return (
                      <>
                        <Col xl={4} lg={4} md={4} sm={12}>
                          <Button
                            className="st-butt rounded-pill"
                            onClick={() => handleClick(slot.slot_id)}
                          >
                            {slot.start_time} to {slot.end_time}
                          </Button>
                          <br />
                        </Col>
                      </>
                    );
                  })}
              </Row>
            </Container>
          </Card>
          <br />
          <Card style={{ margin: "10px" }}>
            <Card.Header style={{ fontWeight: "500" }}>
              Free Slots for Tomorrow
            </Card.Header>

            <Container>
              <Row style={{ margin: "10px" }}>
                {tomorrowSlots !== undefined &&
                  tomorrowSlots.map((slot) => {
                    {/* console.log("logging"); */}
                    return (
                      <>
                        <Col xl={4} lg={4} md={4} sm={12}>
                          <Button className="st-butt rounded-pill" onClick={handleClick()}>
                            {slot.start_time} to {slot.end_time}
                            
                          </Button>
                          <br />
                        </Col>
                      </>
                    );
                  })}
              </Row>
            </Container>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorProfile;
