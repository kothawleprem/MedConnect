import React, { useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import TimePicker from "react-time-picker";
import { ToastContainer, toast } from "react-toastify";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

 import "react-toastify/dist/ReactToastify.css";
 import { TimePicker } from 'react-ios-time-picker';
 import Card from 'react-bootstrap/Card';
 import Button from 'react-bootstrap/Button';



const CreateSlot = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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
      <h2>Schedul your appointment</h2>
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
           
          <Card body   className='shadow-sm' style={{ width: '27rem'}}>
            <Row>
              <Col xs={4}>
              <p>Enter Start time</p>

                <input
                  type="text"
                  name="start_time"
                  placeholder="Start_time"
                  onChange={handleChangeStart}
                  required
                />
              </Col>
             
              <Col xs={4}>
              <p>Enter End time</p>
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
            <Button onClick={() => handleSubmit(today)} variant="primary" style={{backgroundColor:"#FF7600",borderColor:"#FF7600", fontWeight:"bold"}}>Add Slot</Button>
            {/* <button >Add Slot</button> */}


            </Card>
           
           
          </Tab>
          <img  style={{width:"150px",height:"150px"}} src="assets/sch.png"/> 

          <Tab eventKey="tomorrow" title={tomorrow}>
          <Card body style={{ width: '28rem' }}>

            <Row>
              <Col xs={4}>
              <p>Enter Start time</p>
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
              <p>Enter End time</p>
                <input
                  type="text"
                  name="end_time"
                  placeholder="End_time"
                  onChange={handleChangeEnd}
                  required
                />
              </Col>
            </Row>
            <br></br>
            <Button onClick={() => handleSubmit(tomorrow)} variant="primary" style={{backgroundColor:"#FF7600",borderColor:"#FF7600", fontWeight:"bold"}}>Add Slot</Button>

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