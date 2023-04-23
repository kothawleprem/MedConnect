import React from 'react'
import { Card, Container, Row, Col, Form, Button} from 'react-bootstrap'
import { FaUpload } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from 'axios';
import Header from '../../components/Header/header';

const BookSlot = () => {
  const [slot,setSlot] = useState();
  const [consultationId, setConsultationId] = useState()
  const { state } = useLocation();
  const navigate = useNavigate()
  const { slot_id } = state;
  console.log(slot_id)

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/patients/slot?slot_id=${slot_id}`
      )
      .then(function (response) {
        console.log(response.data);
        setSlot(response.data);
      });
  },[])

  const handleClick = () => {
    const patient_token = localStorage.getItem("patient_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${patient_token}`,
      },
    };
    const data = {
      "slot_id": slot_id,

    }
    axios
      .post(
        `http://${process.env.REACT_APP_API_URL}/api/consultation/book_slot/`,
        data,
        config
      )
      .then(function (response) {
        console.log(response.data.consultation_id);
        setConsultationId(response.data.consultation_id);
      })
      .then(
        navigate("/payments", {
          state: {
            amount: slot.fees,
            slot_id: slot_id,
          },
        })
      );
    console.log('clicked')
  }
  
  return (
    <>
      {slot != undefined && (
        <>
        <Header/>
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
                            Date: {slot.date}
                            <br />
                            Time Slot: {slot.start_time} to {slot.end_time}
                            <br />
                            Remarks: {slot.remarks}
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
}

export default BookSlot