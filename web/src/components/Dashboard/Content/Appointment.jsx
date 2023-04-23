import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Appointment = () => {
  const [slots, setSlots] = useState();
  const temp_slots = [
    {
      start_time: "10:00:00",
      end_time: "10:30:00",
      date: "2023-04-24",
      patient_name: "Amitabh Gupta",
    },
    {
      start_time: "11:00:00",
      end_time: "11:30:00",
      date: "2023-04-24",
      patient_name: "Priya Patel",
    },
    {
      start_time: "12:00:00",
      end_time: "12:30:00",
      date: "2023-04-24",
      patient_name: "Rahul Sharma",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/consultation/slot_list/?status=True`,
        config
      )
      .then(function (response) {
        const data = response.data;
        setSlots(data[0]);
        console.log(data[0]);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (consultation_id) => {
    console.log(consultation_id);
    navigate("/viewappointments", {
      state: {
        consultation_id: consultation_id,
      },
    });
  };

  return (
    <div>
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
              <Col>Date</Col>
              <Col>Start Time</Col>
              <Col>End Time</Col>
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
                    <Card.Subtitle>{slot.patient_name}</Card.Subtitle>
                  </Col>
                  <Col>
                    <Card.Subtitle>{slot.date}</Card.Subtitle>
                  </Col>
                  <Col>
                    <Card.Subtitle>{slot.start_time}</Card.Subtitle>
                  </Col>
                  <Col>
                    <Card.Subtitle>{slot.end_time}</Card.Subtitle>
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
    </div>
  );
};

export default Appointment;
