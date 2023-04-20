import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Bar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const EditSlotRemarks = () => {
  const { state } = useLocation();
  const { slot_id } = state;
  const [remarks, setRemarks] = useState();
  const [slotData, setSlotData] = useState();
  const navigate = useNavigate()

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
        `http://${process.env.REACT_APP_API_URL}/api/consultation/slot/?slot_id=${slot_id}`,
        config
      )
      .then((response) => {
        const result = response.data;
        setSlotData(result);
      });
  }, [setSlotData]);

  const handleChange = (e) => {
    const remarks = e.target.value.trim();
    setRemarks(remarks);
  };

  const handleDeleteClick = () => {
    console.log("delete..");
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "slot_id": slot_id,
      }),
    };
    fetch("http://127.0.0.1:8000/api/consultation/slot/", requestOptions).then(
      (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          if (response.status === 204) {
            navigate('/scheduling')
          }
        }
      }
    );
  };

  const handleSubmit = () => {
    console.log(remarks);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      "slot_id": slot_id,
      "remarks": remarks
    }
    axios
      .patch(
        `http://127.0.0.1:8000/api/consultation/slot/`,
        data,
        config
      )
      .then((response) => {
        console.log(response.status)
        if (response.status === 202) {
          toast.success("Remarks updated, please refresh", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/editslotremarks", {
            state : {
              slot_id: slot_id,
            }
          });
        }
      });
  };

  console.log(slotData);
  return (
    <>
      <Bar />
      <br></br>
      <br></br>
      <div className="container">
        <div class="section-title">
          <h2>Slot</h2>
          <p>
            You can continue setting up your profile or edit respose while we
            verify all of your Information
          </p>
        </div>

        <center>
          <div>
            <Card style={{ width: "30rem" }}>
              <Card.Body>
                {slotData !== undefined ? (
                  <>
                    <Row>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <Card.Text>
                          Start Time: {slotData.start_time}{" "}
                        </Card.Text>
                        <Card.Text>Date: {slotData.date} </Card.Text>
                      </Col>
                      <Col xl={6} lg={6} md={6} sm={12}>
                        <Card.Text>End Time: {slotData.end_time} </Card.Text>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Form>
                        <Form.Group controlId="formGridEmail">
                          <Form.Label>
                            Previous Remarks: {slotData.remarks}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="remarks"
                            // value={slotData.remarks}
                            onChange={handleChange}
                            placeholder="Enter New Remarks"
                          />
                        </Form.Group>
                      </Form>
                    </Row>
                  </>
                ) : (
                  <></>
                )}
                <br />
              </Card.Body>
            </Card>
          </div>
          <div></div>
          <br />
          <div>
            &nbsp;
            <button className="main-btn" onClick={handleSubmit}>
              <p>Update Remarks</p>
            </button>
            &nbsp; &nbsp;
            <button className="main-btn" onClick={handleDeleteClick}>
              <p>Delete Slot</p>
            </button>
          </div>
        </center>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditSlotRemarks;
