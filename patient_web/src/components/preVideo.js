import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

import './preVideo.css'
import Card from "@mui/material/Card";


function PreVideo() {
  const [idToCall, setIdToCall] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let response;
      do {
        response = await fetch(
          "http://127.0.0.1:8000/api/consultation/room/?consultation_id=11"
        );
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } while (response.status !== 200);
      console.log("running 1..")
      const responseData = await response.json();
      setIdToCall(responseData.room_id);
      console.log(responseData.room_id)
      localStorage.setItem("ClientReload", true)
    };
    console.log("running 2");
    fetchData();
  }, []);

 
    const navigate = useNavigate()

  // const [idToCall, setIdToCall] = useState("");
  
  return (
    <div className="buttons">
      <Card className="permit">
        {idToCall.length > 0 ? (
          
          <IconButton
            onClick={() =>
              navigate("/video", {
                state: {
                  idToCall: idToCall,
                },
              })
            }
          >
            <CheckCircleIcon /> &nbsp; Enter Video Call
          </IconButton>
        ) : (
          <IconButton>
            <UnpublishedIcon /> &nbsp; Waiting for Doctor
          </IconButton>
        )}
      </Card>
    </div>
  );
}

export default PreVideo;
