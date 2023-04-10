import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import axios from "axios";
import { useEffect, useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useNavigate } from "react-router-dom";

import '../Dcform.css'

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
  qualification: undefined,
  specialization: undefined,
  desc: undefined,
  imp_doc: undefined,
  v_clip: undefined,
  photo_doc: undefined,
  sign_doc: undefined,
});

const AddPrescription = () => {

///
 const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddButton = () => {
    setShowForm(true);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    // you can add your own logic to submit the form data to the server or store it in the state
    setShowForm(false);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  }
/////

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
         .get(`http://127.0.0.1:8000/api/doctors/profile/`, config)
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
          //  if (data.gender === "Male"){
          //   m_value.current =true
          //  }
          //  else if (data.gender === "Female"){
          //   f_value.current = true;
          //  }
          //  else if (data.gender === "Other") {
          //    console.log("other....");
          //    o_value.current = true;
          //  }
          //  console.log(m_value.current, f_value, o_value)
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
               qualification: data.qualification,
               specialization: data.specialization,
               desc: data.description,
               imp_doc: data.files,
               v_clip: data.video,
               photo_doc: data.photo,
               sign_doc: data.signature,
             });
         });
     }, []);
 
    // const ipfs = ipfsHttpClient({
    //   url: "https://ipfs.infura.io:5001/api/v0",
    //   headers: {
    //     authorization,
    //   },
    // });

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
        qualification: formData.qualification,
        specialization: formData.specialization,
        description: formData.desc,
        files: formData.imp_doc,
        video: formData.v_clip,
        photo: formData.photo_doc,
        signature: formData.sign_doc,
      };

      const token = localStorage.getItem("token")
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      };

      axios
        .post("http://127.0.0.1:8000/api/doctors/profile/", data, config)
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
      <br></br>
      <br></br>
      <section id="appointment" class="appointment section-bg">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Add Prescription</h2>
          
          </div>

          <Form>
            {/* First_name and Last_name */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  Type<span style={{ color: "red" }}> *</span>
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
                Medicine<span style={{ color: "red" }}> *</span>
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

          

            {/* DOB and Phone No */}
            <Row className="mb-3">
          

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                Power<span style={{ color: "red" }}> *</span>
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


            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>
              Frequence<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                value={formData.address}
                name="address"
                onChange={handleChange}
                type="text"
                placeholder="Enter your address"
              />
            </Form.Group>


      

            {/* Description */}
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>
              Remarks<span style={{ color: "red" }}> *</span>
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

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>
              Next Investigation / Other Remarks<span style={{ color: "red" }}> *</span>
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

        
            
            <center>
              <Button
                variant="primary"
                onClick={handleSubmit}
                type="submit"
                className="main-btn"
              >
                Add
              </Button>
            </center>
          </Form>


          ////

          <div>
      <button onClick={handleAddButton}>Add</button>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
          <br />
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} />
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
        </div>
      </section>
    </div>
  );

}

export default AddPrescription