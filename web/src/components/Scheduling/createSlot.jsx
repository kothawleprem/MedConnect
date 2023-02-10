import React, { useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TimePicker from "react-time-picker";
import { ToastContainer, toast } from "react-toastify";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

 import "react-toastify/dist/ReactToastify.css";

const CreateSlot = () => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [time, setTime] = React.useState("10:00");
    const today = new Date().toISOString().substr(0, 10);
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10);
    // console.log(today, tomorrow)
    // const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    // const tod = {today.toLocaleDateString()}
    
    const handleChangeStart = (e) => {
        e.preventDefault();
      setStartTime({
        ...startTime,
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
     const handleSubmit = (day) => {
      console.log("submit")
       console.log(startTime['start_time'], endTime['end_time'], day)
       const req = {
         doctor_id: 3,
         date: day,
         start_time: startTime["start_time"],
         end_time: endTime["end_time"],
         remarks: "NA",
       };
       fetch(`http://127.0.0.1:8000/api/consultation/slot/`, {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
         body: JSON.stringify(req),
       }).then(async (response) => {
         const result = await response.json();
         console.log(result);
         console.log(response.status, result['message'])
         if(response.status === 201){
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
         }
         else{
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
      <h1>Select Date and Time</h1>
      <h3>Select Date</h3>
      <Row>
        <Tabs
          defaultActiveKey="today"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="today" title={today}>
            <Row>
              <Col xs={4}>
                <input
                  type="text"
                  name="start_time"
                  placeholder="Start_time"
                  onChange={handleChangeStart}
                  required
                />
              </Col>
              <Col xs={4}>
                <input
                  type="text"
                  name="end_time"
                  placeholder="End_time"
                  onChange={handleChangeEnd}
                  required
                />
              </Col>
            </Row>
            <br />
            <button onClick={() => handleSubmit(today)}>Add Slot</button>
          </Tab>
          <Tab eventKey="tomorrow" title={tomorrow}>
            <Row>
              <Col xs={4}>
                <input
                  type="text"
                  name="start_time"
                  placeholder="Start_time"
                  onChange={handleChangeStart}
                  required
                />
                {/* <TimePicker /> */}
              </Col>
              <Col xs={4}>
                <input
                  type="text"
                  name="end_time"
                  placeholder="End_time"
                  onChange={handleChangeEnd}
                  required
                />
              </Col>
            </Row>
            <br />
            <button onClick={() => handleSubmit(tomorrow)}>Add Slot</button>
          </Tab>
        </Tabs>
      </Row>
      <ToastContainer />
    </>
  );
}

export default CreateSlot