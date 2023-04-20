import React from 'react'
import { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DoctorCard from '../../components/singleDoctor/DoctorCard';


import { Container, Form, Button, Row, Col } from 'react-bootstrap'

import axios from 'axios'

import SearchBox from '../../components/Items/SearchBox'

const SearchDoctors = (props) => {
  const [results, setResults] = useState([]);
  const location = useLocation();


  const handleSearch = (data) => {
    setResults(data);
    console.log("result..",data)
  };
    // const query = "Prem"
    useEffect(() => {
        const query = new URLSearchParams(location.search).get("query");
        console.log("q", query);
        if (query != null){
        axios
          .get(
            `http://${process.env.REACT_APP_API_URL}/api/patients/search/?query=${query}`
          )
          .then(function (response) {
            const data = response.data;
            setResults(data);
            console.log(data);
          });
  }
    },[])

    const temp_results = [
      {
        doctor_id: 1,
        name: "Prem Kothawle",
        photo: null,
        city: "Mumbai",
        specialization: "Diabetology",
        qualification: "MBBS",
      },
      {
        doctor_id: 2,
        name: "Shubham Saroj",
        photo: null,
        city: "Thane",
        specialization: "Pediatrics",
        qualification: "MD",
      },
      {
        doctor_id: 3,
        name: "Mahesh Dhanawde",
        photo: null,
        city: "Airoli",
        specialization: "	Gastroenterology",
        qualification: "MBBS",
      },
      {
        doctor_id: 4,
        name: "Abhishek Sharma",
        photo: null,
        city: "Pune",
        specialization: "Psychological Counselling",
        qualification: "MBBS",
      },
    ];

  return (
    <>
      <SearchBox onSearch={handleSearch} />
      <Container>
        <Row>
          {results.length > 0 &&
            results.map((result, index) => (
              <Col key={result.doctor_id} xl={4} lg={6} md={6} sm={12}>
                
                  <DoctorCard result={result}/>
                
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default SearchDoctors