// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
// import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
// import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
// import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import { Grid } from "@mui/material";

import "./video.css";
const socket = io.connect("http://localhost:5000");

const Video = () => {
  useEffect(() => {
    if (!localStorage.getItem("Serverreloaded")) {
      localStorage.setItem("Serverreloaded", true);
      window.location.reload();
    }
  }, []);
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [saudio, setSaudio] = useState(false);
  const [svideo, setSvideo] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("myId", (id) => {
      setMe(id);
      const res = {
        consultation_id: 2,
        room_id: id,
      };

      fetch(`http://127.0.0.1:8000/api/consultation/room/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
      }).then(async (response) => {
        const val = await response.json();
        console.log(val);
      });
    });

    socket.on("callUser", (data) => {
      console.log("1");
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
    socket.on("callEnded", () => {
      console.log("2");
      console.log("received call ended");
      setCallEnded(true);
      connectionRef.current.destroy();
      window.location.reload(true);
    });
    setName("Doctor");

	

  }, []);

  const callUser = (id) => {
    console.log("3");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log("4");
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      console.log("5");
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      console.log("6");
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    console.log("7");
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log("8", caller);
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      console.log("9");
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const muteCall = () => {
    console.log(stream);
    setSaudio(!saudio);
    stream.getAudioTracks()[0].enabled = saudio;
  };

  const stopVideo = () => {
    setSvideo(!svideo);
    stream.getVideoTracks()[0].enabled = svideo;
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket.emit("disconnectCall");
    connectionRef.current.destroy();
    window.location.reload(true);
  };

  return (
    <>
    
      <div className="container">
        <div className="header">  
      
      <Grid  item xs={30} sm={9} md={9} lg={7.8} xl={7.8} className="head" container flexWrap="nowrap" wrap="nowrap">
              <div >
              <img src="Assets/MedConnect.png" alt="/" className="img"/>
              </div>
            
              <div className="title">  
              <p className="titlehead">
                General Physcian Consultation Meeting
              </p> 
              <p className="subtitle"> Dr Prem Khotawale</p> 
              </div>
             
              
          </Grid>
       
          </div>
       
     
        <Grid container spacing={2} className="video-container">
          <Grid item xs={8} className="video">
            {/* {callAccepted && !callEnded ? ( */}
              <center>
                <video
                  playsInline
                  ref={myVideo}
                  autoPlay
                  className="videoElementOut"
                /> 
                <div >  
                <IconButton style={{backgroundColor:"white" , width:"50px"}} className="videoicon" onClick={stopVideo}>
                      <VideocamIcon
                        style={{ color: "grey" }}
                        fontSize="large"
                      />
                    </IconButton>
                    <IconButton style={{backgroundColor:"white" , width:"50px" ,margin:"8px"}} onClick={muteCall} className="videoicon">
                      <MicIcon style={{ color: "green" }} fontSize="large" />
                    </IconButton>
                    <IconButton 
                    style={{backgroundColor:"red" , width:"50px" }}
                    className="videoicon"
                      variant="contained"
                      color="secondary"
                      onClick={leaveCall}
                    >
                      <CallEndIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </IconButton>
                    </div>
              </center>
              
             {/* ) : (
              <>
                <center>
                  <div className="videoElementOut"></div>
                </center>
              </>
            )}  */}
          </Grid>
          <Grid item xs={4} className="video">
            <div className="div">
              {stream && (
                <>
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    className="videoElementIn"
                  />
                </>
              )}
            </div>
            <br />
            <div className="myId">
              <p style={{ color: "white" }}>Your Id: {me}</p>
              <TextField
                id="filled-basic"
                label="ID to call"
                variant="filled"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
              />
              <div className="call-button">
                {callAccepted && !callEnded ? (
                  <>
                    <IconButton onClick={muteCall}>
                      <MicIcon style={{ color: "white" }} fontSize="large" />
                    </IconButton>
                    <br />
                    <IconButton onClick={stopVideo}>
                      <VideocamIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </IconButton>
                    <br />
                    <IconButton
                      variant="contained"
                      color="secondary"
                      onClick={leaveCall}
                    >
                      <CallEndIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </IconButton>
                    {/* <Button onClick={muteCall}>Mute</Button>
                    <Button onClick={stopVideo}>Stop Video</Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={leaveCall}
                    >
                      End Call
                    </Button> */}
                  </>
                ) : (
                  <>
                    <IconButton
                      aria-label="call"
                      onClick={() => callUser(idToCall)}
                    >
                      <PhoneIcon style={{ color: "white" }} fontSize="large" />
                    </IconButton>
                  </>
                )}
              </div>
             
            </div>
          </Grid>
        
        </Grid>

        <Grid>
          {receivingCall && !callAccepted ? (
            <div>
              <center>
                <Card className="caller">
                  <CardHeader
                    avatar={<Avatar>P</Avatar>}
                    title="Incoming Video Call:"
                    subheader="Patient"
                    action={
                      <IconButton color="primary" onClick={answerCall}>
                        <p>Accept</p> &nbsp; <PhoneIcon />
                      </IconButton>
                    }
                    className="callerData"
                  />
                </Card>
              </center>

              {/* <Card className="caller">
                Incoming Video Call: {name}
                <IconButton color="primary" onClick={answerCall}>
                  Accept &nbsp; <PhoneIcon />
                </IconButton>
              </Card> */}
            </div>
          ) : null}
        </Grid>
      
      </div>
    </>
  );
};

export default Video;
