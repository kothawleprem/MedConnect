import React from 'react'
import { Container, Form, Button } from "react-bootstrap";

import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBox = (props) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
      // make API request with the query data
      axios
        .get(
          `http://${process.env.REACT_APP_API_URL}/api/patients/search/?query=${query}`
        )
        .then(function (response) {
          const data = response.data;
          props.onSearch(data);
          //   console.log(data);
        });
    navigate(`/search?query=${query}`);
    
    };
  return (
    <>
      <Container>
        <br />
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button  className='main-btn' onClick={handleClick} >
            Search
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default SearchBox