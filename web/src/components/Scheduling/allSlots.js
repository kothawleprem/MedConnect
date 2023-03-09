import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



const AllSlots = () => {
  const [todaySlots,setTodaySlots] = useState("")
  const [tommorowSlots, setTommorowSlots] = useState("");
    useEffect(() => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      axios.get(
        `http://127.0.0.1:8000/api/consultation/slot_list/`, config
      ).then( response => {
        const data = response.data;
        console.log(response);
        setTodaySlots(data[0]);
        setTommorowSlots(data[1])
      }
        
      )
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
              <>
                    <Card style={{ width: '18rem' }}>

        <ListGroup.Item  key={slot.slot_id}>  {slot.start_time} {slot.end_time}</ListGroup.Item>
      
     

                {/* <button key={slot.slot_id}>
                  {slot.start_time} {slot.end_time}
                </button> */}
             

                <br />
                </Card>
                <br />

              </>
            ))}
          </>
             
      ) : (
          <> No Slots created for this 
          day!!! 
          
          <br/>
          </>
        )} 
         </ListGroup>
             
      </Tab>
      <Tab eventKey="tommorow" title="Tommorow">

        {tommorowSlots.length > 0 ? (
          <>
               

            {tommorowSlots.map((slot) => (
              <>
               <Card style={{ width: '18rem' }}>  
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
  );
}

export default AllSlots