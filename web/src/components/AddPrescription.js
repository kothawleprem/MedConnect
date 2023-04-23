import { useState } from "react";
import React  from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from 'react-bootstrap/Table';

import '../Dcform.css'
import Header from "./Navbar/header";


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
        medicine_list: medicines,
        remarks: addremarks,
        consultation_id: 11
       
      };
      console.log(medicines,"medicine");
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      };

      axios
        .post(
          `http://${process.env.REACT_APP_API_URL}/api/consultation/prescription/`,
          data,
          config
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            navigate("/", {});
          }
        })
        .catch((error) => console.log(error));

    };
  
  return (
    <>  
    <Header/>
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
                  placeholder="Enter Type"
                /> 
         
                <Form.Label>
                Medicine<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={medicine} 
                  onChange={handleMedicineChange}
                  placeholder="Enter Medicine Name"
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
                  placeholder="Enter Power"
                />

                <Form.Label>
                Frequency<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={frequency} 
                  onChange={handleFrequencyChange}
                  placeholder="Enter Frequency"
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
                  placeholder="Enter your Remarks"
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
      <h5> Medicines</h5>
      <Table striped bordered hover>

        <thead>
          <tr>
            <th>Type</th>
            <th>Medicine</th>
            <th>Power</th>
            <th>Frequency</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td>{medicine.type}</td>
              <td>{medicine.medicine}</td>
              <td>{medicine.power}</td>
              <td>{medicine.frequency}</td>
              <td>{medicine.remarks}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    

      <h5> Next Investigation / Other Remarks: {addremarks}</h5>
    </ul>
    </Col>
    </Row>
  </div>
  </>
  )
}
