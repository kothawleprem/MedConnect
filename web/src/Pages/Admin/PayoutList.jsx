import React from 'react'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

import SearchBox from './SearchBox';
import PayoutCardList from './PayoutCardList';

const PayoutList = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const handleSearch = (data) => {
    setResults(data);
    console.log("result..", data);
  };
   useEffect(() => {
    const admin_token = localStorage.getItem("admin_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${admin_token}`,
      },
    };
     const query = new URLSearchParams(location.search).get("query");
     console.log("q", query);
     if (true) {
       axios
         .get(
           `http://${process.env.REACT_APP_API_URL}/api/official/payout_list`,
           config
         )
         .then(function (response) {
           const data = response.data;
           setResults(data);
           console.log(data);
         });
     }
   }, []);
  return (
    <Container>
      <center>
        <SearchBox onSearch={handleSearch} />
      </center>

      <Row>
        {results.length > 0 &&
          results.map((result, index) => (
            <Col key={result.payout_id} xl={4} lg={6} md={6} sm={12}>
              <PayoutCardList data={result} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default PayoutList