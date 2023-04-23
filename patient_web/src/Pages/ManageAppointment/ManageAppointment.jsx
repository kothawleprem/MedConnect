import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import withAuth from "../../withAuth";
import UpdateProfile from "../../components/UpdateProfile";
import Header from "../../components/Header/header";




const ManageAppointment = () => {
  const [slots, setSlots] = useState();

  useEffect(() => {
    const patient_token = localStorage.getItem("patient_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${patient_token}`,
      },
    };
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/patients/manage_consultations`,
        config
      )
      .then(function (response) {
        const data = response.data;
        setSlots(data);
        console.log(data);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (consultation_id) => {
    console.log(consultation_id);
    navigate("/consultation", {
      state: {
        consultation_id: consultation_id,
      },
    });
  };





  return (
    <>
      <Header />
      <br />
      
      <br />
      <Container>
        <UpdateProfile/>
        <br/>
        <br/>
        <Card>
          <Card.Body style={{ padding: "10px" }}>
            <p className="appoint-title">Appointments</p>
          </Card.Body>

          <Card
            className="appoint-card"
            style={{ margin: "5px", backgroundColor: "aliceblue" }}
          >
            <Card.Body>
              <Row>
                <Col>Patient Name</Col>
                <Col>Type</Col>
                <Col>Time</Col>
                <Col>Status</Col>
                <Col>View</Col>
              </Row>
            </Card.Body>
          </Card>

          {slots !== undefined &&
            slots.map((slot) => (
              <Card
                className="appoint-card"
                style={{ margin: "5px" }}
                key={slot.consultation_id}
              >
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Subtitle>{slot.doctor_name}</Card.Subtitle>
                    </Col>
                    <Col>
                      <Card.Subtitle>{slot.specialization}</Card.Subtitle>
                    </Col>
                    <Col>
                      <Card.Subtitle>
                        {slot.start_time}- {slot.end_time}
                      </Card.Subtitle>
                    </Col>
                    <Col>
                      <Card.Subtitle>{slot.status}</Card.Subtitle>
                    </Col>
                    <Col>
                      <Card.Subtitle>
                        <Button
                          onClick={() => handleSubmit(slot.consultation_id)}
                          className="view-butt"
                        >
                          view
                        </Button>
                      </Card.Subtitle>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
        </Card>
      </Container>
    </>
  );
}

export default ManageAppointment;