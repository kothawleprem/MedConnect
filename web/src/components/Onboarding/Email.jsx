import React from 'react'
import { Container, Row, Col, Form ,Button } from 'react-bootstrap'
import Lottie from "lottie-react";
import login from "../../lotties/login.json";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Email = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const style = {
      height: "90%",
      width: "90%",
    };
    const handleChange = (e) => {
      setEmail({
        ...email,
        [e.target.name]: e.target.value.trim(),
      });
    };

    const handleSubmit = (e) => {
    
      e.preventDefault();
      if (email.length == 0) {
        console.log("no email");
        toast.warn("Please enter an Email Address", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      } else {
        const res = {
          email: email["email"],
        };

        fetch(`http://127.0.0.1:8000/api/doctors/email/`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res),
        });
        navigate("/verify", {
          state: {
            email: email["email"],
          },
        });
      }
    };
  return (
    <>
      <center>
        <Container>
          <Row className="border d-flex align-items-center justify-content-center">
            <Col xs={12} lg={6} md={12}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Col>
            <Col xs={12} lg={6} md={12}>
              <Lottie animationData={login} style={style} />
            </Col>
          </Row>
        </Container>
      </center>
      <ToastContainer />
    </>
  );
}

export default Email