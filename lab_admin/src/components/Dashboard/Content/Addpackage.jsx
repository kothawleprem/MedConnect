import React, { useState } from 'react';
import { Form, Button, Container,Row } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddPackage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    no_tests: '',
  });

  const handleSubmit = async (event) => {
    const token = localStorage.getItem("lab_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    event.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/lab/package/",
        formData, config
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Package Created,please refresh", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.warn("please retry", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value,
      });
  };

  return (
    <Container>
      <p style={{ fontWeight: "600", fontSize: "25px" }}>Add Package</p>
      <br />
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="total">
            <Form.Label>Total number of test included</Form.Label>
            <Form.Control
              type="number"
              name="no_tests"
              value={formData.no_tests}
              onChange={handleChange}
            />
          </Form.Group>
          <br />
          <Button style={{ backgroundColor: "#4365CD" }} type="submit">
            Add
          </Button>
        </Form>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default AddPackage;
