import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { Dropdown, Container, Row, Col } from "react-bootstrap";

import DoctorCard from "./DoctorCard";

const InstantSpecializations = () => {
  const [doctor, setDoctor] = useState([]);
  const [specialization, SetSpecialization] = useState("General Physician");
  const location = useLocation();
  const handleItemClick = (event) => {
    const selected = event.target.innerText;
    SetSpecialization(selected);
    // Make API request with selected item ID
    const patient_token = localStorage.getItem("patient_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${patient_token}`,
      },
    };
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/patients/by_specialization?specialization=${selected}`, config
      )
      .then((response) => {
        const data = response.data;
        setDoctor(data);
        console.log(data);
      });
  };

  useEffect(() => {
    var query = new URLSearchParams(location.search).get("specialization");
    if (query != null) {
      console.log(query);
      SetSpecialization(query);
    } else {
      query = specialization;
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/consultation/instant_doctor?specialization=${query}`,
        config
      )
      .then(function (response) {
        const data = response.data;
        setDoctor(data);
        console.log(data);
      });
  }, []);
  return (
    <>

      <Container>
        <br />
        <Dropdown className="d-inline ml-auto">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {specialization}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={handleItemClick}>
              General Physician
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleItemClick}>
              Dermatology
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleItemClick}>
              Diabetology
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleItemClick}>
              Dermatology
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleItemClick}>
              Psychological Counselling
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleItemClick}>
              Gastroenterology
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleItemClick}>
              Pediatrics
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Row>
          
              <Col xl={4} lg={6} md={6} sm={12}>
                <DoctorCard result={doctor} />
              </Col>
        </Row>
      </Container>
    </>
  );
}

export default InstantSpecializations;
