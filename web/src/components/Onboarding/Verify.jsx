import React from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Lottie from "lottie-react";
import otpLottie from "../../lotties/otp.json";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Verify = () => {
     const { state } = useLocation();
     const { email } = state;
    const [OTP, setOTP] = useState("");
    const [incorrect, setIncorrect] = useState(false);
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
             navigate("/scheduling", {
               state: {
                 email: email,
               },
             });
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
      <Container>
        <Row className="border d-flex align-items-center justify-content-center">
          <Col xs={12} lg={6} md={6}>
            <Form>
              <MuiOtpInput value={OTP} onChange={handleChange} />
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs={12} lg={6} md={6}>
            <Lottie animationData={otpLottie} width="80%" height="80%" />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Verify