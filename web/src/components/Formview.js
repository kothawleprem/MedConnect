import { red } from '@mui/material/colors';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Bar from './Navbar/Navbar';
import Card from 'react-bootstrap/Card';
import '../Dcform.css'
import { Link } from 'react-router-dom';

import axios from "axios";
import { useNavigate } from "react-router-dom";


// import { create as ipfsHttpClient } from "ipfs-http-client";

import '../Dcform.css'
import { useEffect } from 'react';
import Header from './Navbar/header';

const initialFormData = Object.freeze({
    fname: "shubhams",
    lname: "",
    gender: "",
    dob: "",
    mob_no: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    Reg_no: "",
    title: "",
    qualification: "",
    specialization: "",
    desc: "",
    imp_doc: "",
    v_clip: "",
    photo_doc: "",
    sign_doc: ""
});



const Formview = () => {
    const [formData, updateFormData] = React.useState(initialFormData);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
        axios
          .get(
            `http://${process.env.REACT_APP_API_URL}/api/doctors/profile/`, config
          )
          .then(function (response) {
            console.log(response);
            const data = response.data
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
              imp_doc: data.file,
              v_clip: data.video,
              photo_doc: data.photo,
              sign_doc: data.signature,
            });
          });
    },[updateFormData])




    return (
      <div>
        <Header/>

        <section id="appointment" class="appointment section-bg">
          <div class="container" data-aos="fade-up">
            <Card>
              <Form style={{ margin: "1rem" }}>
                {/* First_name and Last_name */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>
                      Name<span style={{ color: "red" }}> </span> :
                    </Form.Label>{" "}
                    {formData.name}
                  </Form.Group>
                </Row>

                {/* Gender */}
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>
                    Gender<span style={{ color: "red" }}> </span> :
                  </Form.Label>
                  {formData.gender}
                </Form.Group>

                {/* DOB and Phone No */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridAddress1">
                    <Form.Label>
                      Birth Date<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.dob}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>
                      Mobile No<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.mob_no}
                  </Form.Group>
                </Row>

                {/* Full Address */}

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>
                    Address<span style={{ color: "red" }}> </span>
                  </Form.Label>
                  {formData.address}
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>
                      City<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.city}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>
                      State<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.state}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>
                      Pincode<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.pincode}
                  </Form.Group>
                </Row>

                {/* Registration no and title */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>
                      Registration No<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.Reg_no}
                  </Form.Group>
                </Row>

                {/* Qualification and specialization */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>
                      Qualification<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.qualification}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>
                      Specialization<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.specialization}
                  </Form.Group>
                </Row>

                {/* Description */}
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>
                    Description<span style={{ color: "red" }}> </span>:
                  </Form.Label>
                  {formData.desc}
                </Form.Group>

                {/* Documents and video */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formFileMultiple">
                    <Form.Label>
                      Upload Document<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.imp_doc}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formFileMultiple">
                    <Form.Label>
                      Upload Video<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.v_clip}
                  </Form.Group>
                </Row>

                {/* Photo and Sign */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formFileMultiple">
                    <Form.Label>
                      Photo<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.photo_doc}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formFileMultiple">
                    <Form.Label>
                      Signature<span style={{ color: "red" }}> </span>:
                    </Form.Label>
                    {formData.sign_doc}
                  </Form.Group>
                </Row>
                <center>
                  <Link style={{ textDecoration: "none" }} to="/dcform">
                    <p className="main-btn">Edit</p>
                  </Link>
                </center>
              </Form>
            </Card>
          </div>
        </section>
      </div>
    );

}

export default Formview