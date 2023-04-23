import React, { useState ,useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';



const UpdateProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState("");

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [city, setCity] = useState(user.city);
  const [mobileNo, setMobileNo] = useState(user.mobileNo);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const patient_token = localStorage.getItem("patient_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${patient_token}`,
      },
    };
    axios
      .get(
        // `http://${process.env.REACT_APP_API_URL}/api/patients/manage_consultations`,
        config
      )
      .then(function (response) {
        const data = response.data;
        setUser(data);
        console.log(data);
      });
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        // `https://example.com/api/users/${user.id}`,
        {
          firstName,
          lastName,
          city,
          mobileNo,
        }
      );
      console.log(response.data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
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
