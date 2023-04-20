import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";

const DashFreeSlots = () => {
  const [slots, setSlots] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/consultation/slot_list/?status=False`,
        config
      )
      .then(function (response) {
        const data = response.data;
        setSlots(data[0]);
        console.log(data[0]);
      });
  }, []);
  return (
    <div>
      <Card style={{ margin: "10px" }}>
        <Card.Header style={{ fontWeight: "500" }}>
          Free Slots for Today
        </Card.Header>

        <Container>
          <Row style={{ margin: "10px" }}>
          {slots !== undefined && slots.map((slot) => {
            console.log("logging")
            return (
              <>
                <Col xl={4} lg={4} md={4} sm={12}>
                  <Button className="st-butt rounded-pill">
                    {slot.start_time} to {slot.end_time}
                    <img
                      alt=""
                      src="/Assets/add-selection.png"
                      className="st-butticon"
                    />
                  </Button>
                  <br/>
                </Col>
                
              </>
            );
              
          })}
            

            {/* 
        <Col xl={4} lg={4} md={4} sm={12}>
        <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
        </Col> */}

            {/* <Col xl={4} lg={4} md={4} sm={12}>
        <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
        </Col> */}
          </Row>
          {/* <Row style={{margin:'10px'}}>

        <Col>
        <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
        </Col>

        <Col>
        <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
        </Col>

        <Col>
        <Button className='st-butt rounded-pill'>9:00 to 9:30 
        <img alt="" src="/Assets/add-selection.png"  className="st-butticon"/>
        </Button>
        </Col>

      </Row> */}

          {/* <Row style={{ margin: "10px" }}>
            <Col>
              <Button className="st-butt rounded-pill">
                9:00 to 9:30
                <img
                  alt=""
                  src="/Assets/add-selection.png"
                  className="st-butticon"
                />
              </Button>
            </Col>

            <Col>
              <Button className="st-butt rounded-pill">
                9:00 to 9:30
                <img
                  alt=""
                  src="/Assets/add-selection.png"
                  className="st-butticon"
                />
              </Button>
            </Col>

            <Col>
              <Button className="st-butt rounded-pill">
                9:00 to 9:30
                <img
                  alt=""
                  src="/Assets/add-selection.png"
                  className="st-butticon"
                />
              </Button>
            </Col>
          </Row> */}
        </Container>
      </Card>
    </div>
  );
};

export default DashFreeSlots;
