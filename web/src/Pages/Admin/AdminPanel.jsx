import React, { useState ,useEffect} from "react";
import { Container, Row, Col, Form ,Button } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Bar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import CardList from "./CardList";

import axios from 'axios';

// const data = [
//   { id: 1, name: "John Doe", email: "johndoe@example.com", phone: "555-1234" },
//   { id: 2, name: "Jane Smith", email: "janesmith@example.com", phone: "555-5678" },
//   { id: 3, name: "Bob Johnson", email: "bobjohnson@example.com", phone: "555-9012" },
// ];



function AdminPanel() {
  const [data, setData] = useState([]);


  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (

    <>
        <Bar/>
<Container>
  <br/>
  <br/>

<Row className=" d-flex align-items-center justify-content-center">
<Col xs={12} lg={6} md={12} >

<center>
<h2 style={{fontWeight:800}} >Admin Panel</h2>

</center>


<h5 style={{fontWeight:600}} >Doctors Request</h5>


<div className="container">
      <CardList data={data} />
    </div>


</Col>
  </Row>

</Container>
    
    </>
  )
}

export default AdminPanel