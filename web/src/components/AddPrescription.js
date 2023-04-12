import { useState } from "react";
import React  from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import '../Dcform.css'


export default function AddPrescription() {
    const [showForm, setShowForm] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [type, setType] = useState('');
    const [medicine, setMedicine] = useState('');
    const [power, setPower] = useState('');
    const [frequency, setFrequency] = useState('');
    const [remarks, setRemarks] = useState('');
    const [addremarks, setAddremarks] = useState('');
    const navigate = useNavigate();

  
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

    const handleAddemarksChange = (event) => {
      setAddremarks(event.target.value);
    }
    

    const handleSubmit = async (e) => {
      e.preventDefault()
      const data = {
        medicines: medicines,
        addremarks: addremarks,
       
      };
      console.log(data,);
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      };

      // axios
      //   .post("http://127.0.0.1:8000/api/doctors/", data, config)
      //   .then((response) => {
      //     console.log(response.data);
      //     if (response.status === 201) {
      //       navigate("/status", {
              
      //       });
      //     }
      //   })
      //   .catch((error) => console.log(error));

    };
  
  return (
    <div class="container">
      <Row> 
      <Col>  
      <br/>
 
          <Row className="align-items-center">
            <Col>
              <h5>Add Medicine</h5> 
            
            </Col>
            <Col>
              <Button className="add-button" onClick={handleAddButton}>
                <span className="add-icon">+</span>
              </Button>
            </Col>
          </Row>
  
    <br/> 
    <br/> 

    {showForm && (
      
      <Form  onSubmit={handleFormSubmit}>
      
    
        <Form.Group >
          
        <Row>  
              <Col> 
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
                 </Col>
                
             
                 <Col>  
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
                </Col>
             
               <Form.Label>
               Remarks:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={remarks} 
                  onChange={handleRemarksChange}
                  placeholder="Enter Last Name"
                />
               
               </Row>
              </Form.Group>
              <br/>
              <center>   
              <Button className="main-btn" type="submit">Add</Button>
              </center>
             
      </Form>
      

    )}

<Form onSubmit={handleSubmit}>



      <Form.Group className="mb-3" >
              <Form.Label>
              Next Investigation / Other Remarks:
              </Form.Label>
              <Form.Control
                name="desc"
                value={addremarks}
                onChange={handleAddemarksChange}
                as="textarea"
                type="text"
                placeholder="Enter Description"
              />
            </Form.Group>
      <br/>
      <center>   
      <Button className="main-btn" type="submit">Submit</Button>
      </center>

</Form>
    </Col>
<Col>  
    <ul>
      <br/>
      <p> Medicines</p>
      {medicines.map((medicine, index) => (
        <li key={index}>
          <div>Type: {medicine.type}</div>
          <div>Medicine: {medicine.medicine}</div>
          <div>Power: {medicine.power}</div>
          <div>Frequency: {medicine.frequency}</div>
          {medicine.remarks && <div>Remarks: {medicine.remarks}</div>}
        </li>
      ))}

      <h5> Next Investigation / Other Remarks: {addremarks}</h5>
    </ul>
    </Col>
    </Row>
  </div>
  )
}
