import React, { useState } from 'react';
import { Form, Button, Container,Row } from 'react-bootstrap';
import axios from 'axios';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    total: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/', formData);
      console.log(response.data);
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
        <Row >  
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
          name="total"
          value={formData.total}
          onChange={handleChange}
          
        />
      </Form.Group>
      <br/>
      <Button style={{backgroundColor:'#4365CD'}} type="submit">
        Add 
      </Button>
    </Form>
    </Row>
    </Container>
    
  );
};

export default AddPackage;
