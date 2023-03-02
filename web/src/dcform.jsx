import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useNavigate, useLocation } from "react-router-dom";

import './Dcform.css'

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

const projectId = '2KdPPLUQPwqlijfPMWKTqydNvXa';
const projectSecretKey = 'a4f67328e14c5df9dbd1a894311b8d1e';
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const Dcform = () => {
    const [formData, updateFormData] = React.useState(initialFormData);
    const navigate = useNavigate();
    const { state } = useLocation();
    const { email } = state;
 
    const ipfs = ipfsHttpClient({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });


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
      const req = {
        email: email,
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
      console.log(req)
      fetch("http://127.0.0.1:8000/api/doctors/profile/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }).then(async (response) => {
        const res = await response.json();
        console.log(res)
        if (response.status === 201) {
          navigate("/status", {
            state: {
              email: email,
            },
          });
        }
      });

      

      // const files = formData.imp_doc;

      // if (!files || files.length === 0) {
      //   return alert("No files selected");
      // }
  
      // const file = files[0];
      // // upload files
      // const result = await ipfs.add(file);
      // console.log(result)
      // // ... submit to API or something
      
    

      
    };
  

  return (
    <div>
      <br></br>
      <br></br>
      <section id="appointment" class="appointment section-bg">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Fill The Form</h2>
            <p>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
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
                  id={`inline-$"radio"-1`}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  value="Female"
                  id={`inline-$"radio"-2`}
                />
                <Form.Check
                  inline
                  label="Other"
                  name="gender"
                  type="radio"
                  value="Other"
                  id={`inline-$"radio"-3`}
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
                  className="form-control"
                  onChange={handleChange}
                ></input>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                  Enter Mobile No<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
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
                  onChange={handleChange}
                  type="text"
                  placeholder="Ex. MBBS, MD,.."
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
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Qualification"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                  Specialization<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  name="specialization"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Specialization"
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
              </Form.Group>

              <Form.Group as={Col} controlId="formFileMultiple">
                <Form.Label>
                  Video Link<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
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
              </Form.Group>
            </Row>

            <Button variant="primary" onClick={handleSubmit} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </section>
    </div>
  );

}

export default Dcform