import React, { useState ,useEffect} from "react";
import { Card, Button ,Modal,Row,Col } from "react-bootstrap";
import axios from "axios";


const CardList = ({ data }) => {

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (item) => {
        setSelectedCard(item);
      };
    
      const handleCloseModal = () => {
        setSelectedCard(null);
      };

      const handleAccept = (selectedCard) => {
        const newStatus = { status: "accepted", cardId: selectedCard.id };
        axios
          .post("api stauts", newStatus)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      const handleReject = (selectedCard) => {
        const newStatus = { status: "rejected", cardId: selectedCard.id };
        console.log(newStatus);
        axios
          .post("api satus", newStatus)
          .then((response) => {
            console.log(response)

        })
          .catch((error) => {
            console.error(error);
          });
      };
  return (
    <>
      <div>
        {data.map((item) => (
          <Card
            key={item.id}
            className="mb-3"
            onClick={() => handleCardClick(item)}
          >
            <Card.Body>
              <Card.Title>
              {item.doctor_name}
              </Card.Title>
              <Card.Text>Email: {item.email}</Card.Text>
              <Card.Text>Request Id: {item.request_id}</Card.Text>
              <Card.Text>Current Status: {item.status}</Card.Text>
              <Button
                style={{ height: "45px" }}
                className="main-btn"
                onClick={() => handleCardClick(item)}
              >
                View profile{" "}
              </Button>
            </Card.Body>
          </Card>
        ))}
        <Modal
          show={selectedCard !== null}
          onHide={handleCloseModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCard && (
              <>
                <Row>
                  <Col>
                    <p>First Name: {selectedCard.name}</p>
                    <p>Last Name: {selectedCard.last_name}</p>
                    <p>Gender: {selectedCard.gender}</p>
                    <p>DOB: {selectedCard.dob}</p>
                    <p>Email: {selectedCard.email}</p>
                    <p>Phone: {selectedCard.phone}</p>
                  </Col>

                  <Col>
                    <p>Address: {selectedCard.address}</p>
                    <p>City: {selectedCard.city}</p>
                    <p>State: {selectedCard.state}</p>
                    <p>Pincode: {selectedCard.pincode}</p>
                    <p>Reg_no: {selectedCard.reg_no}</p>

                    <p>Title: {selectedCard.title}</p>
                    <p>Qualification: {selectedCard.qualification}</p>
                    <p>Specialization: {selectedCard.specialization}</p>
                  </Col>
                  <Col>
                    <p>Description: {selectedCard.description}</p>
                    <p>Uploaded Document: {selectedCard.files}</p>
                    <p>Sign Document: {selectedCard.signature}</p>
                    <p>Uploaded Video: {selectedCard.video}</p>
                  </Col>
                </Row>

                <Button
                  variant="success"
                  className="mr-10"
                  onClick={() => handleAccept(selectedCard)}
                >
                  Accept
                </Button>
                <br />
                <br />
                <Button
                  variant="danger"
                  onClick={() => handleReject(selectedCard)}
                >
                  Reject
                </Button>
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CardList;
