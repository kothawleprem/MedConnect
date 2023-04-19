import React, { useState ,useEffect} from "react";
import { Card, Button ,Modal } from "react-bootstrap";
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
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>Email: {item.email}</Card.Text>
            <Card.Text>ID: {item.id}</Card.Text>
           
          </Card.Body>
        </Card>
      ))}
      <Modal show={selectedCard !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCard && (
            <>
              <p>Name: {selectedCard.name}</p>
              <p>Email: {selectedCard.email}</p>
              <p>ID: {selectedCard.id}</p>
              <p>Phone: {selectedCard.phone}</p>
              <Button variant="success" className="mr-2" onClick={() => handleAccept(selectedCard)}>
              Accept
            </Button>
            <br/>
            <br/>
            <Button variant="danger" onClick={() => handleReject(selectedCard)}>
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
