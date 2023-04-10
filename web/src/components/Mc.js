import { useState } from "react";
import React  from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import '../Dcform.css'


export default function Mc() {
    const [showForm, setShowForm] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [type, setType] = useState('');
    const [medicine, setMedicine] = useState('');
    const [power, setPower] = useState('');
    const [frequency, setFrequency] = useState('');
    const [remarks, setRemarks] = useState('');
  
    const handleAddButton = () => {
      setShowForm(true);
    }
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      const newMedicine = { type, medicine, power, frequency, remarks };
      setMedicines([...medicines, newMedicine]);
      setType('');
      setMedicine('');
      setPower('');
      setFrequency('');
      setRemarks('');
      setShowForm(false);
    }
  
    const handleTypeChange = (event) => {
      setType(event.target.value);
    }
  
    const handleMedicineChange = (event) => {
      setMedicine(event.target.value);
    }
  
    const handlePowerChange = (event) => {
      setPower(event.target.value);
    }
  
    const handleFrequencyChange = (event) => {
      setFrequency(event.target.value);
    }
  
    const handleRemarksChange = (event) => {
      setRemarks(event.target.value);
    }
  
  return (
    <div class="container">
      <Row> 
      <Col>  
      <br/>
    <Button  className="main-btn" onClick={handleAddButton}>Add Medicine</Button>

    <br/> 
    <br/> 

    {showForm && (
      <Form onSubmit={handleFormSubmit}>

        <Form.Group  controlId="formGridPassword">
                <Form.Label>
                Type:<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                 
                  type="text"
                  id="type" 
                  value={type}
                   onChange={handleTypeChange}
                  placeholder="Enter Last Name"
                /> 

                <Form.Label>
                Medicine<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={medicine} 
                  onChange={handleMedicineChange}
                  placeholder="Enter Last Name"
                />

                <Form.Label>
                Power<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={power}
                  onChange={handlePowerChange} 
                  placeholder="Enter Last Name"
                />

                <Form.Label>
                Frequency<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={frequency} 
                  onChange={handleFrequencyChange}
                  placeholder="Enter Last Name"
                />

               <Form.Label>
               Remarks<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={remarks} 
                  onChange={handleRemarksChange}
                  placeholder="Enter Last Name"
                />
              
              </Form.Group>
              <br/>
              <center>   
              <Button className="main-btn" type="submit">Add</Button>
              </center>

      </Form>

    )}
    </Col>
<Col>  
    <ul>
      {medicines.map((medicine, index) => (
        <li key={index}>
          <div>Type: {medicine.type}</div>
          <div>Medicine: {medicine.medicine}</div>
          <div>Power: {medicine.power}</div>
          <div>Frequency: {medicine.frequency}</div>
          {medicine.remarks && <div>Remarks: {medicine.remarks}</div>}
        </li>
      ))}
    </ul>
    </Col>
    </Row>
  </div>
  )
}
