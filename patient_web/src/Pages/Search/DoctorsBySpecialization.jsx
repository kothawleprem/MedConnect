import React from 'react'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from 'axios';
import { Dropdown, Container, Row, Col } from 'react-bootstrap';

import DoctorCard from '../../components/singleDoctor/DoctorCard';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import Header from '../../components/Header/header';

const DoctorsBySpecialization = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialization, SetSpecialization] = useState("General Physician");

    const location = useLocation();
    const handleItemClick = (event) => {
      const selected = event.target.innerText;
      SetSpecialization(selected);
      // Make API request with selected item ID
      axios
        .get(
          `http://${process.env.REACT_APP_API_URL}/api/patients/by_specialization?specialization=${selected}`
        )
        .then((response) => {
          const data = response.data;
          setDoctors(data);
          console.log(data);
        });
    };

    useEffect(() => {
      var query = new URLSearchParams(location.search).get("specialization");
      if (query != null) {
        console.log(query)
        SetSpecialization(query);
      }
      else{
        query = specialization
      }
      axios
        .get(
          `http://${process.env.REACT_APP_API_URL}/api/patients/by_specialization?specialization=${query}`
        )
        .then(function (response) {
          const data = response.data;
          setDoctors(data);
          console.log(data);
        });
    },[]);
  return (
    <>
    <Header/>
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
          {doctors.length > 0 &&
            doctors.map((doctor, index) => (
              <Col key={index} xl={4} lg={6} md={6} sm={12}>
                <DoctorCard result={doctor} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default DoctorsBySpecialization