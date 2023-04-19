import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Col, Row, Button, Card } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { FaUpload } from "react-icons/fa";

export default function Consultation() {
    const { state } = useLocation();
    // const { consultation_id } = state;
    const [data, setData] = useState();
    // console.log(consultation_id);
    const consultation_id = 11

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
          `http://127.0.0.1:8000/api/patients/consultation?consultation_id=${consultation_id}`, config
        )
        .then(function (response) {
          console.log("response", response);
          setData(response.data);
        });
    }, []);

  return (
    <>
      {data !== undefined ? (
        <Container>
          <div className="alert">
            {data.status === "PAYMENT_COMPLETED" ? (
              <>
                <Alert variant="primary">
                  This is an upcoming Appoinment on {data.date} at{" "}
                  {data.start_time}
                </Alert>
              </>
            ) : (
              <>
                <Alert variant="success">
                  This is a completed appointment on {data.date}
                </Alert>
              </>
            )}
          </div>
          <div className="consultation-main-info">
            <Row>
              <Col xl={3} md={3} xs={12}>
                <Button>Join Meeting</Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xl={4} md={4} xs={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>Consultation Id: #{consultation_id}</Card.Title>
                    <Card.Text>
                      Specialization Required: {data.specialization}
                      <br />
                      Start time: {data.start_time}
                      <br />
                      End time: {data.end_time}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>Doctor Details</Card.Title>
                    <Card.Text>
                      <Row>
                        <Col xl={6} md={6} xs={12}>
                          Doctor Name: Dr. {data.doctor_name}
                          <br />
                          Email: {data.email}
                          <br />
                          Phone: {data.phone}
                          <br />
                          City: {data.city}, &nbsp; {data.state}
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
          <br />

          <br />

          <div className="remarks">
            <Row>
              <Col xl={6} md={6} xs={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>Remarks</Card.Title>
                    <Card.Text>{data.dr_consultation_remarks}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
          <br />

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

              <Col xl={6} md={6} xs={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>Download Prescription</Card.Title>
                    <br />
                    <Button type="submit">
                      Download <FaUpload />
                    </Button>
                  
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
