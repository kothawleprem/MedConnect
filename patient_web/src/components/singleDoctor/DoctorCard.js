import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./DoctorCard.css";

export default function DoctorCard(props) {
    const navigate = useNavigate();
  const data = props.result

  const handleClick = () => {
    console.log(data.doctor_id)
    navigate("/doctorProfile",{
      state:{
        doctor_id:data.doctor_id
      }
    })
  }
  return (
    <div>
      <br />
      <Card className="doctorcard ">
        <Card.Body>
          <Row>
            <Col>
              <Card>
                <img
                  className="dcimg"
                  src={data.photo}
                />
              </Card>
            </Col>
            <Col>
              <Card.Title className="dctititle">Dr. {data.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {data.qualification}
              </Card.Subtitle>
              <p>{data.specialization}</p>
              <p>{data.city}</p>
              <Button className="button" onClick={handleClick}>Know more</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* <Card className="doctor">
        <Row>
          <Col xl="2" lg="2" md="3" sm="6">
            <div className="imgDiv">
              <h2>hh</h2>
              <img
                className="dcimg"
                src="https://assets.mfine.co/api/contentservice/attachments/downloadFromDb?fileName=Dr.-Neeraj%20(1).jpg/w_229,h_310"
              />
            </div>
          </Col>
          <Col xl="10" lg="10" md="9" sm="6">
            Dr. Prem Kothawle  <br />
            Dentist <br/>
            Thane
          </Col>
        </Row>
      </Card> */}
    </div>
  );
}
