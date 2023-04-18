import React from 'react'
import { useEffect, useState } from 'react';

import axios from 'axios';

const CapturePayments = () => {
  const [paymentId, setPaymentId] = useState()
  useEffect(() => {
    const queryString = window.location.search;
    // console.log("all query", queryString);

    const urlParams = new URLSearchParams(queryString);

    const payment_intent = urlParams.get("payment_intent");
    const slot_id = urlParams.get("slot_id")

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      slot_id: slot_id,
      stripe_id: payment_intent
    };

    axios.post("http://127.0.0.1:8000/api/consultation/confirm_payment/", data, config)
    .then(function(response) {
      setPaymentId(response.data.payment_id)
      console.log(response.data.payment_id)
    })
    
  },[])
    
  return (
    <div>CapturePayments</div>
  )
}

export default CapturePayments