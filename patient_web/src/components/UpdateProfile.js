import React, { useState ,useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';



const UpdateProfile = () => {
  const [showModal, setShowModal] = useState(false);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [city, setCity] = useState();
  const [mobileNo, setMobileNo] = useState();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      f_name:firstName,
      l_name:lastName,
      city:city,
      mobile_no:mobileNo

    };

    const token = localStorage.getItem("token")
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
    };

    axios
      .post(`http://${process.env.REACT_APP_API_URL}/api/paitent/profile/`, data, config)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
           console.log("profile updated");
           setShowModal(false);
        }
      })
      .catch((error) => console.log(error));

  };




  return (
    <>
      <Button className='main-btn' onClick={handleShow}>
        Update Profile
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="mobileNo">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile No."
                value={mobileNo}
                onChange={(event) => setMobileNo(event.target.value)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary"  onClick={handleClose}>
              Close
            </Button>
            <Button  variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProfile;
