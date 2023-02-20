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


// import { create as ipfsHttpClient } from "ipfs-http-client";

import '../Dcform.css'

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





    return (
        <div>
            <Bar />

            <section id="appointment" class="appointment section-bg">
                <div class="container" data-aos="fade-up">

                    <Card>

                        <Form style={{ margin: "1rem" }}>

                            {/* First_name and Last_name */}
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>First Name<span style={{ 'color': 'red', }}> </span> :</Form.Label> {formData.fname}

                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Last Name<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>
                            </Row>

                            {/* Gender */}
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label >Choose Gender<span style={{ 'color': 'red', }}> </span> :</Form.Label>

                            </Form.Group>

                            {/* DOB and Phone No */}
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridAddress1">
                                    <Form.Label >Choose Birth Date<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Enter Mobile No<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>
                            </Row>

                            {/* Full Address */}


                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Address<span style={{ 'color': 'red', }}> </span></Form.Label>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Pincode<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>
                            </Row>

                            {/* Registration no and title */}
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Registration No<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Title<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>
                            </Row>

                            {/* Qualification and specialization */}
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Qualification<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Specialization<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>
                            </Row>

                            {/* Description */}
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Description<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                            </Form.Group>

                            {/* Documents and video */}
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formFileMultiple">
                                    <Form.Label>Upload Document<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>


                                <Form.Group as={Col} controlId="formFileMultiple">
                                    <Form.Label>Upload Video<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>
                            </Row>

                            {/* Photo and Sign */}
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formFileMultiple">
                                    <Form.Label>Photo<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>


                                <Form.Group as={Col} controlId="formFileMultiple">
                                    <Form.Label>Signature<span style={{ 'color': 'red', }}> </span>:</Form.Label>
                                </Form.Group>
                            </Row>
                            <center>
                                <Link style={{ textDecoration: 'none' }} to="/dcform" >   <p className="main-btn">Edit</p>  </Link>
                            </center>

                        </Form>

                    </Card>

                </div>
            </section>
        </div>

    )

}

export default Formview