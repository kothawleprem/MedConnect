import React from "react";
import { Container, Form, Button } from "react-bootstrap";

import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBox = (props) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    // make API request with the query data
    const admin_token = localStorage.getItem("admin_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${admin_token}`,
      },
    };
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/official/payout_list?query=${query}`, config
      )
      .then(function (response) {
        const data = response.data;
        props.onSearch(data);
        //   console.log(data);
      });
    navigate(`/payout?query=${query}`);
  };
  return (
    <>
      <Container>
        <br />
        <Form className="d-flex ">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "1050px" }}
          />
          <Button className="main-btn" onClick={handleClick}>
            Search
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default SearchBox;
