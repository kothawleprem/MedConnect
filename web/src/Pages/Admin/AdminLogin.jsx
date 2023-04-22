import React from 'react'
import { Container, Row, Col, Form ,Button } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

import axios from 'axios';


const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
 
    const handleChange = (e) => {
      setUsername({
        ...username,
        [e.target.name]: e.target.value.trim(),
      });
    };

    const handlePasswordChange = (e) => {
      setPassword({
        ...password,
        [e.target.name]: e.target.value.trim(),
      });
    };

  

    const handleSubmit = (e) => {
    
      e.preventDefault();
      if (username.length === 0) {
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
      } 
      else {
        const data = {
          username: username["username"],
          password: password["password"],

        };

        const config = {
          headers: {
            'Content-Type': 'application/json',
          }
        };
        console.log(data)

        axios
          .post(
            `http://${process.env.REACT_APP_API_URL}/api/official/login/`,
            data,
            config
          )
          .then((response) => {
            console.log(response.data);
            var token = response.data["token"];
            localStorage.setItem("admin_token", token);
            navigate("/adminpanel");
          })
          .catch((error) => console.log(error));
      };
  }
  return (
    <>
      {/* <Bar /> */}
      <center>
        <Container>
          <br />
          <br />
          <Row className=" d-flex align-items-center justify-content-center">
            <Col xs={12} lg={6} md={12}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <h2 style={{ fontWeight: 800 }}>Admin Login</h2>
                  <br />
                  <Form.Label>Username </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    onChange={handleChange}
                    style={{ width: 330 }}
                  />
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    onChange={handlePasswordChange}
                    style={{ width: 330, marginTop: 10 }}
                  />
                </Form.Group>
                <Link
                  style={{ textDecoration: "none" }}
                  onClick={handleSubmit}
                  to="/Formview"
                >
                  {" "}
                  <p className="main-btn-email">Submit</p>{" "}
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </center>
      <ToastContainer />
    </>
  );
}

export default AdminLogin