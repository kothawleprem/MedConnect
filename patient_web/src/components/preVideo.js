import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

import './preVideo.css'
import Card from "@mui/material/Card";

function PreVideo() {
    const navigate = useNavigate()

  const [idToCall, setIdToCall] = useState("");
  let intervalId = setInterval(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/consultation/room/?consultation_id=2`
      );
      if (response.status === 200) {
        const data = await response.json();
        setIdToCall(data["room_id"]);
        console.log(data["room_id"]);
        clearInterval(intervalId);
      }
      console.log("running");

    } catch (error) {
      // Handle error if needed
    }
  }, 5000);
  localStorage.setItem("id", idToCall);
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
