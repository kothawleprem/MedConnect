import React from 'react'
import { Card, Container, Row, Col, Form, Button} from 'react-bootstrap'
import { FaUpload } from "react-icons/fa";

const BookSlot = () => {
  return (
    <>
      <Container>
        <br />
        <div className="doctor-info">
          {/* Dr Name specialization email, phone, city */}
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Doctor Details</Card.Title>
                  <Card.Text>
                    <Row>
                      <Col xl={6} md={6} xs={12}>
                        Doctor Name: Dr. Shubham Saroj
                        <br />
                        Specialization: General Physician
                        <br />
                        Email: shubham@gmail.com
                        <br />
                        Phone: +91 987478958
                        <br />
                        City: Thane, Maharashtra
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={6} lg={6} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Slot Details</Card.Title>
                  <Card.Text>
                    <Row>
                      <Col>
                        Date: 03/12/2022
                        <br />
                        Time Slot: 10:30 to 11:30
                        <br />
                        Remarks: It is a long established fact that a reader
                        will be distracted by the readable content of a page
                        when looking at its layout.
                        <br />
                        City: Thane, Maharashtra
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="patient-remarks">
          <br />
          <Row>
            <Col xl={6} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Add your Remarks for Doctor</Card.Title>
                  <Form.Control as="textarea" rows={2} />
                  <br />
                  <Button type="submit">Add</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="patient-file">
          <br />
          <Row>
            <Col xl={6} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Upload your files</Card.Title>
                  <br />
                  <Button type="submit">
                    Upload <FaUpload />
                  </Button>
                  <br /> View your uploaded file &nbsp;
                  <a href="./document" target="_blank">
                    here
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="submit-btn">
          <br />
          <Card>
            <Container>
              <Row>
                <Col>
                  <br />
                  <Card.Title className="mb-2">Fees: Rs. 300</Card.Title>
                  <br />
                </Col>
                <Col>
                  <br />
                  <Button type="submit">
                    Proceed to Payments <FaUpload />
                  </Button>
                  <br />
                </Col>
              </Row>
            </Container>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default BookSlot