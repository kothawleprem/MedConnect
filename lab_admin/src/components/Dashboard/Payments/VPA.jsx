import React from 'react'
import { useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap' 
import { useState } from 'react'

import axios from 'axios'

const VPA = () => {
    const [upiId, setUpiId] = useState("")
    const [verified, setVerified] = useState(false)

    const handleChange = (e) => {
      const upiId = e.target.value.trim();
      setUpiId(upiId);
    };

    const verifyVPA = () => {
      console.log("verifyy")
      const dvconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          "x-api-key": `${process.env.REACT_APP_VPA_KEY}`,
        },
      };
      console.log(upiId, dvconfig)

      axios.get(
        `https://production.deepvue.tech/v1/verification/upi?vpa=${upiId}`, dvconfig
      )
      .then((response) => {
        console.log(response.data.data.account_exists);
        setVerified(response.data.data.account_exists);
      })
    }
 
    const handleSubmit = () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      
      const data = {
        upiId: upiId
      };
      
      axios
        .post(
          `http://${process.env.REACT_APP_API_URL}/api/doctors/vpa/`, data,
          config
        )
        .then((response) => {
          console.log(response.status);
          // if (response.status === 202) {
          //   toast.success("Remarks updated, please refresh", {
          //     position: "top-right",
          //     autoClose: 5000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //     theme: "light",
          //   });
          // }
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        };
      axios
        .get(`http://${process.env.REACT_APP_API_URL}/api/doctors/vpa/`, config)
        .then(function (response) {
          const data = response.data;
          setUpiId(data.upiId);
          console.log(data);
        });
    }, []);
  return (
    <>
      <Container>
        <Row>
          <Col xl={6} lg={6} md={6} sm={12}>
            UPI Id: {upiId}
          </Col>
          <Col xl={6} lg={6} md={6} sm={12}>
            <Card>
              <Card.Body>
                <Card.Title>Update UpiId</Card.Title>
                <Form.Control as="textarea" rows={2} onChange={handleChange} />
                <p>
                  &nbsp; Verify VPA First:
                  <b>
                    <button onClick={verifyVPA}>Click here</button>
                  </b>
                  {verified === false ? (
                    <>&nbsp; Not Yet Verified</>
                  ) : (
                    <>
                      VPA Verified <br />
                      <Button onClick={handleSubmit} type="submit">
                        Submit
                      </Button>
                    </>
                  )}
                  {/* {verified} */}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default VPA