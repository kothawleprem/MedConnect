import React, { useState } from 'react'
import { Row, Col, Form } from "react-bootstrap"

// import TimePicker from "react-time-picker";
import { ToastContainer, toast } from "react-toastify";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

 import "react-toastify/dist/ReactToastify.css";
//  import { TimePicker } from 'react-ios-time-picker';
 import Card from 'react-bootstrap/Card';
 import Button from 'react-bootstrap/Button';



const CreateSlot = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotFees, setSlotFees] = useState();
  const [time, setTime] = React.useState("10:00");
  const [value, setValue] = useState('10:00 AM');


  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  var tlocalISOTime = new Date(Date.now() - tzoffset + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, -1);
  const today = localISOTime.substring(0, 10);
  const tomorrow = tlocalISOTime.substring(0, 10);
  console.log(today, tomorrow)

  const handleChange = (e) => {
    const slotFees = e.target.value.trim();
    setSlotFees(slotFees);
  }

  const handleChangeStart = (e) => {
    e.preventDefault();
    setStartTime({
      startTime,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleChangeEnd = (e) => {
    e.preventDefault();
    setEndTime({
      ...startTime,
      [e.target.name]: e.target.value.trim(),
    });
  };


  const onChange = (timeValue) => {
    setValue(timeValue);
 }

  const handleSubmit = (day) => {
    console.log("submit");
    console.log(startTime["start_time"], endTime["end_time"], day);
    const token = localStorage.getItem("token");

    const req = {
      doctor_id: 3,
      date: day,
      start_time: startTime["start_time"],
      end_time: endTime["end_time"],
      remarks: "NA",
      slot_fees: slotFees
    };
    console.log(req)
    

    fetch(`http://${process.env.REACT_APP_API_URL}/api/consultation/slot/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(req),
    }).then(async (response) => {
      const result = await response.json();
      console.log(result);
      console.log(response.status, result["message"]);
      if (response.status === 201) {
        toast.success("Slot Created,please refresh", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.warn(result["message"], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };


  return (
    <>
      <br></br>
      <h4>Schedule Your Appointment Slots</h4>
      <br></br>
      <p>Select Date</p>
      <Row>
        <Tabs
          defaultActiveKey="today"
          id="uncontrolled-tab-example"
          className="mb-5 shadow-sm"
          // variant="pills"
        >
          <Tab eventKey="today" title={today}>
            {/* <img src="assets/sch.png" style={{height:'250px,width:200px'}} /> */}

            <Card body className="shadow-sm" style={{ width: "30rem" }}>
              <Row style={{ margin: "10px" }}>
                <Col md={6}>
                  <p>Enter Start time</p>
                  <input
                    type="time"
                    name="start_time"
                    placeholder="Start_time"
                    onChange={handleChangeStart}
                    required
                  />
                </Col>

                <Col md={6}>
                  <p>Enter End time</p>
                  <input
                    type="time"
                    name="end_time"
                    placeholder="End_time"
                    onChange={handleChangeEnd}
                    required
                  />
                </Col>
              </Row>
              <br />
              <center>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter Slot Fees"
                />
                <br />
                <Button
                  onClick={() => handleSubmit(today)}
                  className="main-btn"
                  // variant="primary"
                  // style={{
                  //   backgroundColor: "#FF7600",
                  //   borderColor: "#FF7600",
                  //   fontWeight: "bold",
                  // }}
                >
                  Add Slot
                </Button>
              </center>
              {/* <button >Add Slot</button> */}
            </Card>
          </Tab>
          {/* <img
            style={{ width: "150px", height: "150px" }}
            src="assets/sch.png"
          /> */}

          <Tab eventKey="tomorrow" title={tomorrow}>
            <Card body style={{ width: "30rem" }}>
              <Row style={{ margin: "10px" }}>
                <Col md={6}>
                  <p>Enter Start time</p>
                  <input
                    type="time"
                    name="start_time"
                    placeholder="Start_time"
                    onChange={handleChangeStart}
                    required
                  />

                  {/* <TimePicker /> */}
                </Col>
                <Col md={6}>
                  <p>Enter End time</p>
                  <input
                    type="time"
                    name="end_time"
                    placeholder="End_time"
                    onChange={handleChangeEnd}
                    required
                  />
                </Col>
              </Row>
              <br />
              <center>
                <Button
                  onClick={() => handleSubmit(tomorrow)}
                  className="main-btn"
                >
                  Add Slot
                </Button>
              </center>
            </Card>
            <br />
          </Tab>
        </Tabs>
      </Row>
      <ToastContainer />
    </>
  );
}

export default CreateSlot