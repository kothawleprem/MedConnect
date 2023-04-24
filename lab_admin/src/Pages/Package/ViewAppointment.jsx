import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import { create as ipfsHttpClient } from "ipfs-http-client";

import axios from "axios";

const projectId = "2KdPPLUQPwqlijfPMWKTqydNvXa";
const projectSecretKey = "a4f67328e14c5df9dbd1a894311b8d1e";
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const ViewAppointment = () => {
    const [report, setReport] = useState();
    const [status, setStatus] = useState()
  const { state } = useLocation();
  const { appointment_id } = state;
  console.log(appointment_id);
  const [appointment, setAppointment] = useState([]);
    const navigate = useNavigate();

    const ipfs = ipfsHttpClient({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });

    const fileSelectedHandlerDoc = async (event) => {
      const result = await ipfs.add(event.target.files[0]);
      setReport("https://infura-ipfs.io/ipfs/" + result.path);
      console.log("result", result);
    };

  useEffect(() => {
    const token = localStorage.getItem("lab_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/lab/view_appointment?appointment_id=${appointment_id}`,
        config
      )
      .then(function (response) {
        console.log(response.data);
        // setReport(response.data.report)
        // setStatus(response.data.status)
      });
  });

  const handleChange = (e) => {
    const status = e.target.value.trim();
    setStatus(status);
  };



  const handleSubmit = () => {
    console.log(report);
    const token = localStorage.getItem("lab_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      appointment_id: appointment_id,
      report: report,
      status: status
    };
    axios
      .patch(
        `http://${process.env.REACT_APP_API_URL}/api/lab/view_appointment/`,
        data,
        config
      )
      .then((response) => {
        console.log(response.status);
        if (response.status === 202) {
          navigate("/dashboard");
        }
      });
  };

  return (
    <>
      <div className="container">
        <div class="section-title">
          <h2>Slot</h2>
          <p>Update appointment status and report</p>
        </div>

        <center>
          <div>
            <Card style={{ width: "30rem" }}>
              <Card.Body>
                {appointment !== undefined ? (
                  <>
                    <Row>
                      <Col xl={6} lg={6} md={6} sm={12}></Col>
                      <Col xl={6} lg={6} md={6} sm={12}></Col>
                    </Row>
                    <br />
                    <Row>
                      <Form>
                        <Form.Group controlId="formGridEmail">
                          <Form.Label>
                            Previous reports: {appointment.reports}
                          </Form.Label>
                          <Form.Control
                            name="report"
                            onChange={fileSelectedHandlerDoc}
                            type="file"
                          />
                          <Form.Label>
                            Add Status: {appointment.reports}
                          </Form.Label>
                          <Form.Control
                            name="status"
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Status"
                          />
                        </Form.Group>
                      </Form>
                    </Row>
                  </>
                ) : (
                  <></>
                )}
                <br />
              </Card.Body>
            </Card>
          </div>
          <div></div>
          <br />
          <div>
            &nbsp;
            <button className="main-btn" onClick={handleSubmit}>
              <p>Update reports</p>
            </button>
            &nbsp; &nbsp;
           
          </div>
        </center>
      </div>
    </>
  );
};

export default ViewAppointment;
