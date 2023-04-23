import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import axios from "axios";

const DoctorReceivedPayments = () => {
  const [payments, setPayments] = useState([]);
  const [payouts, setPayouts] = useState([])

  const temp_payments = [
    {
      consultation_id: 1,
      date: "2023-04-25",
      fees: 1500,
      view_url: "https://example.com/consultation/1",
    },
    {
      consultation_id: 2,
      date: "2023-04-27",
      fees: 2000,
      view_url: "https://example.com/consultation/2",
    },
    {
      consultation_id: 3,
      date: "2023-04-29",
      fees: 1000,
      view_url: "https://example.com/consultation/3",
    },
  ];

  const temp_payouts = [
    {
      payout_id: 1,
      date: "2023-04-25",
      amount: 5000,
    },
    {
      payout_id: 2,
      date: "2023-04-27",
      amount: 8000,
    },
    {
      payout_id: 3,
      date: "2023-04-29",
      amount: 10000,
    },
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/doctors/received_payments/`,
        config
      )
      .then(function (response) {
        const data = response.data;
        setPayments(data);
        console.log(data);
      });
      axios
        .get(
          `http://${process.env.REACT_APP_API_URL}/api/doctors/doctor_payouts_list/`,
          config
        )
        .then(function (response) {
          const data = response.data;
          setPayouts(data);
          console.log(data);
        });
  }, []);

  const renderTableRows = () => {
    return payments.map((payment) => {
      return (
        <tr key={payment.consultation_id}>
          <td>{payment.consultation_id}</td>
          <td>{payment.date}</td>
          <td>{payment.fees}</td>
          <td>View</td>
        </tr>
      );
    });
  };

  const renderPayoutRows = () => {
    return payouts.map((payment) => {
      return (
        <tr key={payment.consultation_id}>
          <td>{payment.payout_id}</td>
          <td>{payment.last_payout_date}</td>
          <td>{payment.amount}</td>
          <td>{payment.paid === true ? "Paid" : "Pending"}</td>
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
                    <th>Consultation Id</th>
                    <th>Date</th>
                    <th>Fees</th>
                    <th>View Consultation</th>
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
                Recent Payouts
              </Card.Title>
              <Table hover responsive>
                <thead>
                  <tr style={{ color: "grey", fontWeight: 500 }}>
                    <th>Payout Id</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
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
