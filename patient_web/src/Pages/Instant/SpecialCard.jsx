import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function SpecialCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://media.istockphoto.com/id/1243043960/vector/pregnant-woman-at-the-doctor-s-appointment-a-woman-expecting-a-baby-visits-a-doctor-s-office.jpg?s=612x612&w=0&k=20&c=vXcZXpDQA9KQEt4Prq5_QF58fM1EqYv8nKYBFvNiLps=" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}

     <p style={{color:'orange'}}> Consult now </p>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default SpecialCard;