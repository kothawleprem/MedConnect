import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PayoutCardList = ({ data }) => {
    console.log("data", data)
    const navigate = useNavigate()
  const handleCardClick = () => {
      navigate("/qrpayments", {
        state: {
          payout_id: data.payout_id,
          upiid: data.payment_details,
          amount: data.amount
        },
      });
  };
  return (
    <>
      
        <Card
          key={data.payout_id}
          className="mb-3"
          onClick={() => handleCardClick(data)}

        >
          <Card.Body>
            <Card.Title>{data.doctor_name}</Card.Title>
            <Card.Text>Amount: {data.amount}</Card.Text>
            <Card.Text>Last Payout Date: {data.last_payout_date}</Card.Text>
            <Card.Text>Payment Details: {data.payment_details}</Card.Text>
            <Button
              style={{ height: "45px" }}
              className="main-btn"
              onClick={() => handleCardClick(data)}
            >
              Pay Now
            </Button>
          </Card.Body>
        </Card>
    </>
  );
};

export default PayoutCardList;
