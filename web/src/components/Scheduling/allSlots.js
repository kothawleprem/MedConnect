import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";

import { Button } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { useNavigate } from "react-router-dom";



const AllSlots = () => {
  const [todaySlots,setTodaySlots] = useState("")
  const [tommorowSlots, setTommorowSlots] = useState("");

  const navigate = useNavigate();

  const handleEditClick = (slot_id) => {
    console.log(slot_id)
    navigate("/editslotremarks", {
      state: {
        slot_id: slot_id,
      },
    });
  }

  const handleDeleteClick = (slot_id) => {
    console.log("delete..")
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slot_id: slot_id,
      }),
    };
    fetch("http://127.0.0.1:8000/api/consultation/slot/", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        else{
          if(response.status === 204){
          toast.success("Slot Deleted, please refresh!", {
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
        }
      })
  }

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
          `http://127.0.0.1:8000/api/consultation/slot_list/?status=None`,
          config
        )
        .then((response) => {
          const data = response.data;
          console.log(response);
          setTodaySlots(data[0]);
          setTommorowSlots(data[1]);
        });
        // fetch(
        //   `http://127.0.0.1:8000/api/consultation/slot_list/?doctor_id=3&date=2023-01-26`
        // ).then(async (response) => {
        //   const result = await response.json();
        //   console.log(result)
        //   setTodaySlots(result[0]);
        //   setTommorowSlots(result[1])
        // });
    },[])
  return (
    <>
      <Tabs
        defaultActiveKey="today"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="today" title="Today">
          <ListGroup variant="flush">
            {todaySlots.length > 0 ? (
              <>
                {todaySlots.map((slot) => (
                    <Card style={{ width: "18rem" }} key={slot.slot_id}>
                      <ListGroup.Item>
                        {" "}
                        {slot.start_time} {slot.end_time} <br />
                        <Button onClick={() => handleEditClick(slot.slot_id)}>
                          <FaEdit className="mr-2" />
                        </Button>
                        <Button onClick={() => handleDeleteClick(slot.slot_id)}>
                          <AiFillDelete className="mr-2" />
                        </Button>
                        {slot.status === true ? (
                          <Button>
                            <GrView className="mr-2" />
                          </Button>
                        ) : (
                          <></>
                        )}
                      </ListGroup.Item>

                      {/* <button key={slot.slot_id}>
                  {slot.start_time} {slot.end_time}
                </button> */}

                      <br />
                    </Card>
                 

                ))}
              </>
            ) : (
              <>
                {" "}
                No Slots created for this day!!!
                <br />
              </>
            )}
          </ListGroup>
        </Tab>
        <Tab eventKey="tommorow" title="Tommorow">
          {tommorowSlots.length > 0 ? (
            <>
              {tommorowSlots.map((slot) => (
                <>
                  <Card style={{ width: "18rem" }}>
                    <button key={slot.slot_id}>
                      {slot.start_time} {slot.end_time}
                    </button>
                    <br />
                  </Card>
                </>
              ))}
            </>
          ) : (
            <>No Slots created for this day!!!</>
          )}
        </Tab>
      </Tabs>

      <ToastContainer />
    </>
  );
}

export default AllSlots