import React from 'react'
import { Container, Row, Col, Form ,Button } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

import axios from 'axios';


const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
 
    const handleChange = (e) => {
      setEmail({
        ...email,
        [e.target.name]: e.target.value.trim(),
      });
    };

  

    const handleSubmit = (e) => {
    
      e.preventDefault();
      if (email.length === 0) {
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
          email: email["email"],
          password: password["password"],

        };

        const config = {
          headers: {
            'Content-Type': 'application/json',
          }
        };

        axios
          .post("http://127.0.0.1:8000/api/", data, config)
          .then((response) => {
            console.log(response.data);
            navigate("/adminpanel", {
              state: {
                email: email["email"],
              },
            });
          })
          .catch((error) => console.log(error));
      };
  }
  return (
    <>
    <Bar/>
      <center>
        <Container>
          
        <br/>
        <br/>
          <Row className=" d-flex align-items-center justify-content-center">
           
            <Col xs={12} lg={6} md={12} >
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <h2 style={{fontWeight:800}} >Admin Login</h2>
                  <br/>
                  <Form.Label>Email address </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                   style={{width:330}}
                    
                  />
                   <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}                   
                    style={{width:330,marginTop:10}}
                    
                  />

                  
                </Form.Group>
                <Link style={{ textDecoration: 'none' }} onClick={handleSubmit} to="/Formview"> <p className="main-btn-email">Submit</p> </Link> 

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