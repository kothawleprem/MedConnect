import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/header";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

import axios from "axios";

export default function Lab() {
  const navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(() => {
      axios
      .get(
        `http://127.0.0.1:8000/api/lab/view_labs`,
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data)

      })
      .catch((error) => console.log(error));

  }, [])

  const labs = [
    {
      id: 1,
      name: "Wellnes Labs",
      price: 1099,
      description: "includes 12 test",
      discount: "-22%",
    },
    {
      id: 2,
      name: "healthy Labs",
      price: 899,
      description: "includes 12 test",
      discount: "-25%",
    },
    {
      id: 3,
      name: "New Labs",
      price: 899,
      description: "includes 12 test",
      discount: "-22%",
    },
  ];

  const handleSubmit = (id) => {
    navigate("/packageview", {
      state: {
        labId: id,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="container pt-50 pb-50">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-title text-center pb-25">
              <h3 className="title mb-15">
                Lab Test From The Comfort Of Your Home
              </h3>
              <p>
                Your tests will be conducted in one of our partner labs to
                ensure highest accuracy of your reports.
              </p>
            </div>
          </div>
        </div>
      </div>
      <center>
        <h3>Available Labs</h3>
      </center>
      <Row className="justify-content-center">
        {data.length > 0 &&
          data.map((user) => (
            <Col xl={3} lg={3} md={4} sm={12}>
              <Card className="statscard">
                <br />
                <Card.Title className="stats-total"> {user.name}</Card.Title>

                <Card.Subtitle className="stats-title">
                  {" "}
                  {user.description}
                </Card.Subtitle>
                <Card.Subtitle className="stats-title">
                  {" "}
                  {user.city}
                </Card.Subtitle>
                <Button
                  style={{ textDecoration: "none" }}
                  onClick={() => handleSubmit(user.id)}
                >
                  {" "}
                  <h6 style={{ color: "white" }}>View Packages</h6>{" "}
                </Button>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}
