import React from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";


const BookInstant = () => {
  const [slot, setSlot] = useState();
  const [consultationId, setConsultationId] = useState();
  const [slotId, setSlotId] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { doctor_id } = state;
  console.log(doctor_id);

  var sid = 0

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
          `http://${process.env.REACT_APP_API_URL}/api/consultation/instant_slot?doctor_id=${doctor_id}`, config
        )
        .then(function (response) {
          console.log(response.data);
          setSlot(response.data);
        });
    }, []);

  const handleClick = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      doctor_id: doctor_id,
    };
    axios
      .post(
        `http://${process.env.REACT_APP_API_URL}/api/consultation/instant_slot/`,
        data,
        config
      )
      .then(function (response) {
        console.log(response.data.consultation_id, response.data.slot_id);
        setConsultationId(response.data.consultation_id);
        setSlotId(response.data.slot_id)
        navigate("/payments", {
          state: {
            amount: slot.fees,
            slot_id: response.data.slot_id,
          },
        });
      })
      
    console.log("clicked");
  };

  return (
    <>
      {slot != undefined && (
        <>
          <Container>
            <br />
            <div className="doctor-info">
              {/* Dr Name specialization email, phone, city */}
              <Row>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Doctor Details</Card.Title>
                      <Card.Text>
                        <Row>
                          <Col xl={6} md={6} xs={12}>
                            Doctor Name: Dr. {slot.name}
                            <br />
                            Specialization: {slot.specialization}
                            <br />
                            Email: {slot.email}
                            <br />
                            Phone: {slot.phone}
                            <br />
                            City: {slot.city}, &nbsp; {slot.state}
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={6} lg={6} md={6} xs={12}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Slot Details</Card.Title>
                      <Card.Text>
                        <Row>
                          <Col>
                            Date: Today
                            <br />
                            Time Slot: Instant (30 minutes)
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>

            <div className="patient-remarks">
              <br />
              <Row>
                <Col xl={6} md={6} xs={12}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Add your Remarks for Doctor</Card.Title>
                      <Form.Control as="textarea" rows={2} />
                      <br />
                      <Button type="submit">Add</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>

            <div className="patient-file">
              <br />
              <Row>
                <Col xl={6} md={6} xs={12}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Upload your files</Card.Title>
                      <br />
                      <Button type="submit">
                        Upload <FaUpload />
                      </Button>
                      <br /> View your uploaded file &nbsp;
                      <a href="./document" target="_blank">
                        here
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>

            <div className="submit-btn">
              <br />
              <Card>
                <Container>
                  <Row>
                    <Col>
                      <br />
                      <Card.Title className="mb-2">
                        Fees: Rs. {slot.fees}
                      </Card.Title>
                      <br />
                    </Col>
                    <Col>
                      <br />
                      <Button type="submit" onClick={handleClick}>
                        Proceed to Payments <FaUpload />
                      </Button>
                      <br />
                    </Col>
                  </Row>
                </Container>
              </Card>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default BookInstant;
