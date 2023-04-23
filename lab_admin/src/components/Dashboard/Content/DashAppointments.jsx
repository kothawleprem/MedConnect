
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import {Card, Table, Container, Row, Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { create as ipfsHttpClient } from "ipfs-http-client";




const DashAppointments = () => {
  // const [appointments,setAppointments] = useState([])
  const [formData, updateFormData] = React.useState();


  const projectId = '2KdPPLUQPwqlijfPMWKTqydNvXa';
const projectSecretKey = 'a4f67328e14c5df9dbd1a894311b8d1e';
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });


  const fileSelectedHandlerDoc = async (event) => {
    const result = await ipfs.add(event.target.files[0]);
    updateFormData({
      ...formData,
      imp_doc: "https://infura-ipfs.io/ipfs/" + result.path,
    });
    console.log("result", result);
    

    const token = localStorage.getItem("token")
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      };

    axios
    .post(`http://${process.env.REACT_APP_API_URL}/api/doctors/profile/`, result, config)
    .then((response) => {
      console.log(response.data);
      
    })
    .catch((error) => console.log(error));

    


  };

    



    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Token ${token}`,
    //     },
    //   };
    //   axios
    //     .get(
    //       `http://${process.env.REACT_APP_API_URL}/api/doctors/received_payments/`,
    //       config
    //     )
    //     .then(function (response) {
    //       const data = response.data;
    //       setAppointments(data);
    //       console.log(data);
    //     });
    // }, []);

    const appointments = [ {consultation_id:'12',start_time:"12",end_time:"12",date:'12-3'},
    {consultation_id:'12',start_time:"12",end_time:"12",date:'12-3'},
    {consultation_id:'12',start_time:"12",end_time:"12",date:'12-3'},
  
  ]

   

    const renderTableRows = () => {
      return appointments.map((appointment) => {
        return (
          <tr key={appointment.consultation_id}>
            <td>{appointment.consultation_id}</td>
            <td>{appointment.start_time}</td>
            <td>{appointment.end_time}</td>
            <td>{appointment.date}</td>
            <td> 

                 <Form.Group as={Col} controlId="formFileMultiple">
                <Form.Label>
                  Upload Document<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  name="imp_doc"
                  onChange={fileSelectedHandlerDoc}
                  type="file"
                />
              </Form.Group>
    
                      </td>
          </tr>
        );
      });
    };

  return (
    <>
      <Card>
        <Card.Title style={{ margin: "10px" }}>All Appointments </Card.Title>
        <Table hover responsive>
          <thead>
            <tr style={{ color: "grey", fontWeight: 500 }}>
              <th>Name</th>
              <th>Date</th>
              <th>Package name</th>
              <th>view</th>
              <th>Upload Report</th>
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

export default DashAppointments