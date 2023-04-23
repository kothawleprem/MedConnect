import React from 'react'
import { Row, Col, Card } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';


const DashRecentPatients = () => {
  const [patients, setPatients] = useState()

  const temp_patients = [
    {
      id: 1,
      patient_name: "Priya Patel",
      consultation_id: "CONS-12345",
      date: "2023-04-22",
      city: "Mumbai",
    },
    {
      id: 2,
      patient_name: "Rahul Sharma",
      consultation_id: "12346",
      date: "2023-04-21",
      city: "Delhi",
    },
    {
      id: 3,
      patient_name: "Neha Singh",
      consultation_id: "12347",
      date: "2023-04-20",
      city: "Bangalore",
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
    axios.get(`http://${process.env.REACT_APP_API_URL}/api/consultation/patients/?limit=3`, config)
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