import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Col, Row, Button, Card } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function ViewAppointment() {
  const { state } = useLocation();
  const { consultation_id } = state;
  const [data, setData] = useState()
  const [remarks, setRemarks] = useState();
  console.log(consultation_id)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios.get(
      `http://${process.env.REACT_APP_API_URL}/api/consultation/view?access=1&consultation_id=${consultation_id}`
    ).then( function(response) {
      console.log("response", response)
      setData(response.data)
    })
  },[])

  const handleClick = () => {
    navigate("/video", {
      state:{
        "consultation_id": 11
      }
    }
    )
  }

  const prescriptionPageClick = () => {
    navigate("/addprescription", {
      state:{
        "consultation_id":11
      }
    });
  }

  const handleChange = (e) => {
    const remarks = e.target.value.trim();
    setRemarks(remarks);
  };

  const handleSubmit = () => {
    console.log(remarks);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      consultation_id: consultation_id,
      remarks: remarks,
    };
    axios
      .patch(`http://127.0.0.1:8000/api/consultation/slot/`, data, config)
      .then((response) => {
        console.log(response.status);
        if (response.status === 202) {
          toast.success("Remarks updated, please refresh", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <>
      {data !== undefined ? (
        <Container>
          <div className="alert">
            {data.completed === false ? (
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
                <Button onClick={handleClick}>Join Meeting</Button>
              </Col>
              <Col xl={3} md={3} xs={12}>
                <Button onClick={prescriptionPageClick}>Generate Prescription</Button>
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
              <Col xl={4} md={4} xs={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>{data.patient_name}</Card.Title>
                    <Card.Text>
                      <Row>
                        <Col xl={6} md={6} xs={12}>
                          Gender: {data.patient_gender}
                          <br />
                          Age: {data.patient_age}
                          <br />
                          City: {data.patient_city}
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
          <br />
          <div className="patient-info">
            <Card>
              <Card.Body>
                <Card.Title>Patient's Past Consultations</Card.Title>
                <Accordion defaultActiveKey="0">
                  {data.previous_consultations.length > 0 ? (
                    data.previous_consultations.map((pc) => (
                      <Accordion.Item>
                        <Accordion.Header>
                          Consultation #{pc.consultation_id}, Date:&nbsp;
                          {pc.date}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col xl={3} md={3} xs={12}>
                              <a href={pc.prescription_file} target="_blank">
                                <Button>View Prescription</Button>
                              </a>
                            </Col>
                          </Row>
                          <br />
                          <Card.Text>Remarks: {pc.remarks}</Card.Text>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))
                  ) : (
                    <>no</>
                  )}
                </Accordion>
              </Card.Body>
            </Card>
          </div>
          <br />

          <div className="remarks">
            <Row>
              <Col xl={6} md={6} xs={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>Remarks</Card.Title>
                    <Card.Text>{data.remarks}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={6} md={6} xs={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>Update Remarks</Card.Title>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      onChange={handleChange}
                    />
                    <br />
                    <Button onClick={handleSubmit} type="submit">
                      Submit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
          <br />
          <div className="amount">
            <h5>Fees: Rs. {data.amount}</h5>
          </div>
        </Container>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
