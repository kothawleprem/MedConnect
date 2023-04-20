import React from 'react'
import { Row, Col, Card } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';


const DashRecentPatients = () => {
  const [patients, setPatients] = useState()
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios.get("http://${process.env.REACT_APP_API_URL}/api/consultation/patients/?limit=3", config)
    .then(function(response) {
      const data = response.data
      setPatients(data)
      console.log(data)
    })
  }, [])

  const renderTableRows = () => {
    return patients.map((patient) => {
      return (
        <tr key={patient.patient_id}>
          <td>{patient.patient_name}</td>
          <td>{patient.consultation_id}</td>
          <td>{patient.date}</td>
          <td>{patient.city}</td>
          <td>View</td>
        </tr>
      );
    });
  };
  return (
    <div>
      <Card>
        <Card.Title style={{ margin: "10px" }}>Recent Patients</Card.Title>
        <Table hover responsive>
          <thead>
            <tr style={{ color: "grey", fontWeight: 500 }}>
              <th>Patent Name</th>
              <th>Consultation Id</th>
              <th>Date</th>
              <th>City</th>
              <th>View Consultation</th>
            </tr>
          </thead>
          <tbody className="ap-table">
          {patients !== undefined ? renderTableRows() : <></> }
            {/* {renderTableRows()} */}
            {/* <tr>
              <td>
                <img
                  alt=""
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="appoint-img"
                />
                Jhon dev
              </td>
              <td>OPS-234</td>
              <td>5/3/23</td>
              <td>Male</td>
              <td>Diabetes</td>
            </tr> */}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default DashRecentPatients