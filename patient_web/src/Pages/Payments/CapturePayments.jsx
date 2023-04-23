import React from 'react'
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const CapturePayments = () => {
  const [paymentId, setPaymentId] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    const queryString = window.location.search;
    // console.log("all query", queryString);

    const urlParams = new URLSearchParams(queryString);

    const payment_intent = urlParams.get("payment_intent");
    const slot_id = urlParams.get("slot_id")

    const patient_token = localStorage.getItem("patient_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${patient_token}`,
      },
    };
    const data = {
      slot_id: slot_id,
      stripe_id: payment_intent
    };

    axios
      .post(
        `http://${process.env.REACT_APP_API_URL}/api/consultation/confirm_payment/`,
        data,
        config
      )
      .then(function (response) {
        setPaymentId(response.data.payment_id);
        console.log(response.data.payment_id);
      });
    
  },[])
    
  return (
    <>
    <br /><br />
      <center>
        <img src="https://www.ignitebh.com/wp-content/uploads/2020/04/payment_success_icon.png" width="300px"></img>
        <br />
        <h2>Payment Successful</h2>
        <br />
        <Button onClick={() => navigate("/manageappointment")}>Go to: Manage Appointments</Button>
      </center>
    </>
  );
}

export default CapturePayments