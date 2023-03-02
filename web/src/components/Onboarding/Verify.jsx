import React from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Lottie from "lottie-react";
import otpLottie from "../../lotties/otp.json";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import "./Email.css"
import Bar from '../Navbar/Navbar';


const Verify = () => {
     const { state } = useLocation();
     const { email } = state;
    const [OTP, setOTP] = useState("");
    // const [incorrect, setIncorrect] = useState(false);
    const navigate = useNavigate();
    var status

    function handleChange(OTP) {
      setOTP(OTP);
      console.log(OTP)
    }
     const handleSubmit = (e) => {
       e.preventDefault();
       if (OTP.length === 0) {
         console.log("no email");
         toast.warn("Please enter Valid OTP", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
         navigate("/otp");
       } else {
         const res = {
           email: email,
           otp: OTP
         };
         console.log(res)

         fetch(`http://127.0.0.1:8000/api/doctors/verify_email/`, {
           method: "POST",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
           },
           body: JSON.stringify(res),
         }).then(async (response) => {
           const res = await response.json();
           status = response.status;
           console.log("status", status);
           if (status === 200) {
             var token = res["token"];
             // console.log(token)
             localStorage.setItem("email", email);
             localStorage.setItem("token", token);
             var verified = res["verified"]
             var hasReq = res["hasReq"]
            if (verified === false){
              if( hasReq === 0){
                navigate("/dcform", {
                  state: {
                    email: email,
                  },
                });
              }
              else{
                navigate("/status", {
                  state: {
                    email: email,
                  },
                });
              }
            }
            else{
              navigate("/scheduling", {
                state: {
                  email: email,
                },
              });
            }
           } else {
             console.log("incorrect otp");
             toast.warn("Incorrect OTP!", {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
             });
             navigate("/verify", {
               state: {
                 email: email,
               },
             });
           }
         });
         
       }
     };
  return (
    <>
      <Bar/>
      <Container>
      <br/>
        <Row className="d-flex align-items-center justify-content-center">
          <Col xs={12} lg={3} md={6}>
          <h2 style={{fontWeight:750}} >Verify OTP </h2>
          <br/>

            <Form>
              <MuiOtpInput value={OTP} onChange={handleChange} />
              <br></br>

              {/* <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button> */}
              <Link style={{ textDecoration: 'none' }} onClick={handleSubmit}> <p className="main-btn">Submit</p> </Link> 

            </Form>
          </Col>
          <Col xs={12} lg={5} md={6}>
            <Lottie animationData={otpLottie}  width="50%" height="50%" />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Verify