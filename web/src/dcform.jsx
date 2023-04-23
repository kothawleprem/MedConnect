import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import axios from "axios";
import { useEffect, useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useNavigate } from "react-router-dom";

import './Dcform.css'
import Header from './components/Navbar/header';

const initialFormData = Object.freeze({
  name: undefined,
  gender: undefined,
  dob: undefined,
  mob_no: undefined,
  address: undefined,
  city: undefined,
  state: undefined,
  pincode: undefined,
  Reg_no: undefined,
  qualification: undefined,
  specialization: undefined,
  desc: undefined,
  imp_doc: undefined,
  v_clip: undefined,
  photo_doc: undefined,
  sign_doc: undefined,
});

const projectId = '2KdPPLUQPwqlijfPMWKTqydNvXa';
const projectSecretKey = 'a4f67328e14c5df9dbd1a894311b8d1e';
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const Dcform = () => {
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
               name: data.name,
               gender: data.gender,
               dob: data.dob,
               mob_no: data.phone,
               address: data.address,
               city: data.city,
               state: data.state,
               pincode: data.pincode,
               Reg_no: data.reg_no,
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
 
    const ipfs = ipfsHttpClient({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });

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

    const fileSelectedHandlerDoc = async (event) => {
      const result = await ipfs.add(event.target.files[0]);
      updateFormData({
        ...formData,
        imp_doc: "https://infura-ipfs.io/ipfs/" + result.path,
      });
      // console.log("result", result);
    };

    const fileSelectedHandlerPhoto = async (event) => {
      const result = await ipfs.add(event.target.files[0]);
      updateFormData({
        ...formData,
        photo_doc: "https://infura-ipfs.io/ipfs/" + result.path,
      });
    };
  
    const fileSelectedHandlerSign = async (event) => {
      const result = await ipfs.add(event.target.files[0]);
      updateFormData({
        ...formData,
        sign_doc: "https://infura-ipfs.io/ipfs/" + result.path,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(formData);
      const data = {
        name: formData.name,
        gender: formData.gender,
        dob: formData.dob,
        phone: formData.mob_no,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        reg_no: formData.Reg_no,
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
      
      
      <section id="appointment" class="appointment section-bg">
        <div class="container" >
          <div class="section-title">
            <h2>Data Verification Form</h2>

          </div>

          <Form style={{marginLeft:'300px',width:'700px'}}>
            {/* First_name and Last_name */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                   Name<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
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
            </Row>

            {/* Qualification and specialization */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  Qualification<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Qualification"
                />
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                  Specialization<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Specialization"
                />
              </Form.Group> */}
              <Form.Group as={Col} controlId="formGridSpecialization">
                <Form.Label>
                  Specialization<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  <option value="">Select a specialization</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Gynaecology">Gynaecology</option>
                  <option value="Diabetology">Diabetology</option>
                  <option value="Psychological Counselling">
                    Psychological Counselling
                  </option>
                </Form.Select>
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
                  onChange={fileSelectedHandlerDoc}
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

              <Form.Group as={Col} controlId="formFileMultiple">
                <Form.Label>
                  Video Link<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  value={formData.v_clip}
                  name="v_clip"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
            </Row>

            {/* Photo and Sign */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFileMultiple">
                <Form.Label>
                  Photo<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  name="photo_doc"
                  onChange={fileSelectedHandlerPhoto}
                  type="file"
                />
                {formData.imp_doc !== undefined ? (
                  <>
                    Your Previous Photo: &nbsp;
                    <a href={formData.photo_doc} target="_blank">
                      Click Here
                    </a>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formFileMultiple">
                <Form.Label>
                  Signature<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  name="sign_doc"
                  onChange={fileSelectedHandlerSign}
                  type="file"
                />
                {formData.sign_doc !== undefined ? (
                  <>
                    Your Previous Signature: &nbsp;
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

export default Dcform