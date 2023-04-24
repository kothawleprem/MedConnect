
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import {Card, Table, Container, Row, Col } from "react-bootstrap"

const Appointments = () => {
    const [appointments,setAppointments] = useState([])


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
          `http://localhost:8000/api/lab/lab_appointments/`,
          config
        )
        .then(function (response) {
          const data = response.data;
          setAppointments(data);
          console.log(data);
        });
    }, []);


    const renderTableRows = () => {
      return appointments.map((appointment) => {
        return (
          <tr key={appointment.id}>
            <td>{appointment.id}</td>
            <td>{appointment.date}</td>
            <td>{appointment.package_id}</td>
            <td>{appointment.package_name}</td>
            <td>{appointment.patient_email}</td>
            <td>View</td>
          </tr>
        );
      });
    };

  return (
    <>
          <p style={{fontWeight:'600',fontSize:'25px'}}>All Appointments</p>
          <br/>

      <Card>

        {/* <Card.Title style={{ margin: "10px" }}>All Appointments </Card.Title> */}
        <Table hover responsive>
          <thead>
            <tr style={{ color: "grey", fontWeight: 500 }}>
              <th>Id</th>
              <th>Package Id.</th>
              <th>Date</th>
              <th>Package name</th>
              <th>Patient Name</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody className="ap-table">
            {appointments !== undefined ? <></> : <></>}
            {renderTableRows()}
          </tbody>
        </Table>
      </Card>
    </>
  );
}

export default Appointments