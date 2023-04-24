import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import axios from "axios";

const DoctorReceivedPayments = () => {
  const [payments, setPayments] = useState([]);
  const [payouts, setPayouts] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("lab_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios
      .get(
        `http://localhost:8000/api/lab/received_payments/`,
        config
      )
      .then(function (response) {
        const data = response.data;
        setPayments(data);
        console.log(data);
      });
  }, []);

  const renderTableRows = () => {
    return payments.map((payment) => {
      return (
        <tr key={payment.appointment_id}>
          <td>{payment.appointment_id}</td>
          <td>{payment.date}</td>
          <td>{payment.fees}</td>
        </tr>
      );
    });
  };

  const renderPayoutRows = () => {
    return payments.map((payment) => {
      return (
        <tr key={payment.consultation_id}>
          <td>{payment.consultation_id}</td>
          <td>{payment.date}</td>
          <td>{payment.fees}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Title style={{ margin: "10px" }}>
                Payments by Patients
              </Card.Title>
              <Table hover responsive>
                <thead>
                  <tr style={{ color: "grey", fontWeight: 500 }}>
                    <th>Appointment Id</th>
                    <th>Date</th>
                    <th>Fees</th>
                  </tr>
                </thead>
                <tbody className="ap-table">
                  {payments !== undefined ? <></> : <></>}
                  {renderTableRows()}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col>
           
            <Card>
              <Card.Title style={{ margin: "10px" }}>
                Payments by Patients
              </Card.Title>
              <Table hover responsive>
                <thead>
                  <tr style={{ color: "grey", fontWeight: 500 }}>
                    <th>Payout Id</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className="ap-table">
                  {payments !== undefined ? <></> : <></>}
                  {renderPayoutRows()}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DoctorReceivedPayments;
