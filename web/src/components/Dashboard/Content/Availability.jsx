import React from 'react'
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import { useState, useEffect } from "react"
import axios from 'axios'
import { useLocation, useNavigation } from 'react-router-dom'

const Availability = () => {

  const [instantFees, setInstantFees] = useState("");
  const [availability, setAvailability] = useState("")
  
  const handleChange = (e) => {
    const instantFees = e.target.value.trim();
    setInstantFees(instantFees);
  };

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
        `http://${process.env.REACT_APP_API_URL}/api/doctors/availability/`,
        config
      )
      .then(function (response) {
        const data = response.data;
        setAvailability(data.isAvailable);
        setInstantFees(data.instantFees);
        console.log(data);
      });
  },[])

  const handleSubmitFees = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      instantFees: instantFees,
    };
    axios
      .post(
        `http://${process.env.REACT_APP_API_URL}/api/doctors/instantFees/`,
        data,
        config
      )
   
  }
  const handleSubmitAvailability = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      isAvailable: !availability,
    };
    axios
      .put(
        `http://${process.env.REACT_APP_API_URL}/api/doctors/availability/`,
        data,
        config
      )
    setAvailability(!availability)
     
  }
    
  return (
    <>
      <Container>
        <Row>
          <Col xl={6} lg={6} sm={6} xs={6}>
            <h4> Current Status: {availability === true ? "Available": "Not Avaiable"}</h4>
            <h4>Current Fees: {instantFees}</h4>
            <Button onClick={handleSubmitAvailability} size="sm">
              Change Availability
            </Button>
          </Col>
          <Col xl={6} lg={6} sm={6} xs={6}>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Instant Consultation Fees"
            />
            <br />
            <Button onClick={handleSubmitFees}>Update Fees</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Availability