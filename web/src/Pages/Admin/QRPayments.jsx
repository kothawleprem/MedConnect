import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

const QRPayments = () => {
  const [qr, setQr] = useState();
  const [transactionId, setTransactionId] = useState()
  const { state } = useLocation();
  const { payout_id, upiid, amount } = state;

  const navigate = useNavigate()

  const payment_str = `upi://pay?pa=${upiid}&pn=payout${payout_id}&am=${amount}&cu=INR`;
  console.log(payment_str)

  const handleChange = (e) => {
    const transactionId = e.target.value.trim();
    setTransactionId(transactionId);
  }
  const handleSubmit = (e) => {
    const admin_token = localStorage.getItem("admin_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${admin_token}`,
      },
    };

    const data = {
        payout_id:payout_id,
      transactionId: transactionId,
    };
    console.log(transactionId)

    axios
      .post(
        `http://${process.env.REACT_APP_API_URL}/api/official/payout_list/`,
        data,
        config
      )
      .then((response) => {
        console.log(response.status);
      })
      .then(navigate("/payout"));
  };

  const data = {
    frame_name: "bottom-frame",
    qr_code_text: payment_str,
    image_format: "SVG",
    frame_color: "#02bfff",
    frame_text_color: "#ffffff",
    frame_icon_name: "mobile",
    frame_text: "Scan me",
    marker_left_template: "version13",
    marker_right_template: "version13",
    marker_bottom_template: "version13",
  };

  useEffect(() => {
    axios
      .get(
        `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QR_TOKEN}`,
        { params: data }
      )
      .then(function (response) {
        const data = response.data;
        setQr(data);
      });
  }, []);

  return (
    <>
      {qr !== undefined ? (
        <>
          <br />
          <br />
          <center>
            <div
              dangerouslySetInnerHTML={{ __html: qr }}
              style={{ width: "300px" }}
            ></div>
            <br />
            <Card style={{ width: "300px" }}>
              <Card.Body>
                <Card.Title>UPI Transaction Id</Card.Title>
                <Form.Control as="textarea" rows={2} onChange={handleChange} />
                <br />
                <Button onClick={handleSubmit} type="submit">
                  Submit
                </Button>
              </Card.Body>
            </Card>
          </center>
        </>
      ) : (
        <>Wait</>
      )}
    </>
  );
};

export default QRPayments;
