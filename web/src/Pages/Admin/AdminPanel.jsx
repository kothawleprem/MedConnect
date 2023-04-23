import React, { useState ,useEffect} from "react";
import { Container, Row, Col, Form ,Button, Dropdown } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Bar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import CardList from "./CardList";

import axios from 'axios';
import Header from "../../components/Navbar/header";

const data = [
  { id: 1, name: "John Doe", email: "johndoe@example.com", phone: "555-1234" },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com", phone: "555-5678" },
  { id: 3, name: "Bob Johnson", email: "bobjohnson@example.com", phone: "555-9012" },
];



function AdminPanel() {
  const [data, setData] = useState([]);
  const [status_, setStatus_] = useState("PENDING")

  const handleItemClick = (event) => {
    const selected = event.target.innerText;
    setStatus_(selected);
    // Make API request with selected item ID
    const admin_token = localStorage.getItem("admin_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${admin_token}`,
      },
    };
    // console.log(status_)
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/official/list_requests/?status=${selected}`,
        config
      )
      .then((response) => {
        const data = response.data;
        setData(data);
        console.log(data);
      });
  };

  useEffect(() => {
    const admin_token = localStorage.getItem("admin_token")
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${admin_token}`,
      },
    };
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/official/list_requests/?status=${status_}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Header/>
      <Container>
        <br />
        <br />

        <Row className=" d-flex align-items-center justify-content-center">
          <Col xs={12} lg={6} md={12}>
            <center>
              <Row>
                <Col>
                  <h2 style={{ fontWeight: 800 }}>Admin Panel</h2>
                </Col>
                <Col>
                  <Button>Payments Payout</Button>
                </Col>
              </Row>
            </center>

            <h5 style={{ fontWeight: 600 }}>Doctors Request</h5>
            <br />
            <Row>
              <Col xl={4} lg={4} md={3} xs={6} sm={6}>
                <Dropdown className="d-inline ml-auto md-5">
                  <Dropdown.Toggle id="dropdown-autoclose-true">
                    {status_}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={handleItemClick}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={handleItemClick}>
                      Rejected
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={handleItemClick}>
                      Accepted
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={handleItemClick}>
                      Pending
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <br />
            <div className="container">
              <CardList data={data} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminPanel