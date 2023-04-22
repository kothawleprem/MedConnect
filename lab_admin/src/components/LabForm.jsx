import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import axios from "axios";
import { useEffect, useState } from "react";
// import { create as ipfsHttpClient } from "ipfs-http-client";
import { useNavigate } from "react-router-dom";
import Header from "./Header/header";

import './form.css'

const initialFormData = Object.freeze({
  fname: undefined,
  lname: undefined,
  gender: undefined,
  dob: undefined,
  mob_no: undefined,
  address: undefined,
  city: undefined,
  state: undefined,
  pincode: undefined,
  Reg_no: undefined,
  title: undefined,
  desc: undefined,
  imp_doc: undefined,

 
});

const projectId = '2KdPPLUQPwqlijfPMWKTqydNvXa';
const projectSecretKey = 'a4f67328e14c5df9dbd1a894311b8d1e';
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const LabForm = () => {
    const [formData, updateFormData] = React.useState(initialFormData);
    const [checkboxState, setCheckboxState] = useState({});
    const navigate = useNavigate();

    var mv = false;
    var fv = false;
    var ov = false;


     useEffect(() => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      }
       axios
         .get(`http://${process.env.REACT_APP_API_URL}/api/doctors/profile/`, config)
         .then(function (response) {
           console.log(response);
           const data = response.data;
           if (data.gender === "Male"){
            mv =true
           }
           else if (data.gender === "Female"){
            fv = true;
           }
           else if (data.gender === "Other") {
             ov = true;
           }
           setCheckboxState({
             bullet1: mv || false,
             bullet2: fv || false,
             bullet3: ov || false,
           });
    
             updateFormData({
               ...formData,
               fname: data.first_name,
               lname: data.last_name,
               gender: data.gender,
               dob: data.dob,
               mob_no: data.phone,
               address: data.address,
               city: data.city,
               state: data.state,
               pincode: data.pincode,
               Reg_no: data.reg_no,
               title: data.title,
               desc: data.description,
               imp_doc: data.files,
              
             });
         });
     }, []);


    const handleCheckboxChange = (event) => {
      const { id, checked } = event.target;
      setCheckboxState({ ...checkboxState, [id]: checked });
    };



    const handleChange = (e) => {
      updateFormData({
        ...formData,
       
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim()
      });
    };

 



    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(formData);
      const data = {
        first_name: formData.fname,
        last_name: formData.lname,
        gender: formData.gender,
        dob: formData.dob,
        phone: formData.mob_no,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        reg_no: formData.Reg_no,
        title: formData.title,
        description: formData.desc,
        files: formData.imp_doc,
        
      };

      const token = localStorage.getItem("token")
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      };

      axios
        .post(`http://${process.env.REACT_APP_API_URL}/api/doctors/profile/`, data, config)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            navigate("/status", {
              // state: {
              //   email: email,
              // },
            });
          }
        })
        .catch((error) => console.log(error));

    };

  return (
    <div>
      <Header/>
      <br></br>
      <br></br>
      <section id="appointment" class="appointment section-bg">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Fill The Form</h2>
            <p>
              
            </p>
          </div>

          <Form>
            {/* First_name and Last_name */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  First Name<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                  Last Name<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                />
              </Form.Group>
            </Row>

            {/* Gender */}
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>
                Choose Gender<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <div className="gender" onChange={handleChange}>
                <Form.Check
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  value="Male"
                  id="bullet1"
                  checked={checkboxState.bullet1}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  value="Female"
                  id="bullet2"
                  checked={checkboxState.bullet2}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  inline
                  label="Other"
                  name="gender"
                  type="radio"
                  value="Other"
                  id="bullet3"
                  checked={checkboxState.bullet3}
                  onChange={handleCheckboxChange}
                />
              </div>
            </Form.Group>

            {/* DOB and Phone No */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>
                  Choose Birth Date<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  className="form-control"
                  onChange={handleChange}
                ></input>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                  Enter Mobile No<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  value={formData.mob_no}
                  name="mob_no"
                  type="number"
                  placeholder="Enter Mobile No"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            {/* Full Address */}

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>
                Address<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                value={formData.address}
                name="address"
                onChange={handleChange}
                type="text"
                placeholder="Enter your address"
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>
                  City<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  value={formData.city}
                  name="city"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter City"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>
                  State<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  value={formData.state}
                  name="state"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter State"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>
                  Pincode<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  value={formData.pincode}
                  name="pincode"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter pincode"
                />
              </Form.Group>
            </Row>

            {/* Registration no and title */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  Registration No<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  value={formData.Reg_no}
                  name="Reg_no"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Registration No"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                  Title<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  // placeholder="Ex. MBBS, MD,.."
                />
              </Form.Group>
            </Row>

          

            {/* Description */}
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>
                Description<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                as="textarea"
                type="text"
                placeholder="Enter Description"
              />
            </Form.Group>

            {/* Documents and video */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFileMultiple">
                <Form.Label>
                  Upload Document<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  name="imp_doc"
                  // onChange={fileSelectedHandlerDoc}
                  type="file"
                />
                {formData.imp_doc !== undefined ? (
                  <>
                    Your Previous Document: &nbsp;
                    <a href={formData.imp_doc} target="_blank">
                      Click Here
                    </a>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>

              
            </Row>

         
            <center>
              <Button
                variant="primary"
                onClick={handleSubmit}
                type="submit"
                className="main-btn"
              >
                Submit
              </Button>
            </center>
          </Form>
        </div>
      </section>
      
    </div>
  );

}

export default LabForm