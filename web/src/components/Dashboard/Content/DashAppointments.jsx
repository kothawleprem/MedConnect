import React , {useState, useEffect} from 'react'
import { Row, Col, Card } from "react-bootstrap";
import axios from 'axios';

const DashAppointments = () => {
  const [slots, setSlots] = useState();

  const temp_slots = [
    {
      slot_id: 1,
      patient_name: "John Doe",
      start_time: "10:00:00",
    },
    {
      slot_id: 2,
      patient_name: "Jane Smith",
      start_time: "11:00:00",
    },
    {
      slot_id: 3,
      patient_name: "Bob Johnson",
      start_time: "12:00:00",
    },
  ];
 
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
        `http://${process.env.REACT_APP_API_URL}/api/consultation/slot_list/?status=True&limit=3`,
        config
      )
      .then(function (response) {
        const data = response.data;
        setSlots(data[0]);
        console.log(data[0]);
      });
  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <Card>
        <Card.Body style={{ padding: "10px" }}>
          <p className="appoint-title"> Today's Appointments</p>
        </Card.Body>

        {slots != undefined &&
          slots.map((slot) => (
            <Card
              className="appoint-card"
              style={{ margin: "5px" }}
              key={slot.slot_id}
            >
              <Card.Body>
                <div className="appoint">
                  {/* <img
                    alt=""
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="appoint-img"
                  /> */}

                  <Card.Title style={{ marginLeft: "10px", fontSize: "18px" }}>
                    {slot.patient_name}
                  </Card.Title>
                  <p style={{ marginLeft: "70px" }}>{slot.start_time}</p>
                </div>
                {/* <Card.Subtitle
                  style={{
                    marginLeft: "40px",
                    fontSize: "13px",
                    marginTop: "-13px",
                  }}
                >
                  {user.type}
                </Card.Subtitle> */}
              </Card.Body>
            </Card>
          ))}
      </Card>
    </div>
  );
}

export default DashAppointments