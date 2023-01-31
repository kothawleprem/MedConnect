import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Peer from "simple-peer";
import io from "socket.io-client";


import "./video.css";
import { Grid } from "@mui/material";
const socket = io.connect("http://localhost:5000");

const Video = () => {
  // const [idToCall, setIdToCall] = useState("");
  // const { state } = useLocation();
  // const { idToCall } = state;
  // // setIdToCall(room_id)
  // console.log(idToCall)
  let idToCall = localStorage.getItem("id");

  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [saudio, setSaudio] = useState(false);
  const [svideo, setSvideo] = useState(false);
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

    socket.on("me", (id) => {
      console.log(id);
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
    socket.on("callEnded", () => {
      console.log("received call ended");
      setCallEnded(true);
      connectionRef.current.destroy();
      window.location.reload(true);
    });

    setName("Patient");
  }, []);

  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       setStream(stream);
  //       myVideo.current.srcObject = stream;
  //     });
  // }, [])

  // let intervalId = setInterval(async () => {
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/api/consultation/room/?consultation_id=2`
  //     );
  //     if (response.status === 200) {
  //       const data = await response.json()
  //       setIdToCall(data["room_id"]);
  //       console.log(data["room_id"])
  //       clearInterval(intervalId);
  //     }
  //     console.log("running");
  //   } catch (error) {
  //     // Handle error if needed
  //   }
  // }, 5000);

  const callUser = () => {
    
    console.log("calling");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    console.log(peer);
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: idToCall,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
      console.log("in peer stream");
    });
    socket.on("callAccepted", (signal) => {
      console.log("call accepted");
      setCallAccepted(true);
      peer.signal(signal);
    });
    
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const muteCall = () => {
    console.log(stream);
    setSaudio(!saudio);
    console.log("muted");
    stream.getAudioTracks()[0].enabled = saudio;
  };

  const stopVideo = () => {
    console.log(stream);
    setSvideo(!svideo);
    console.log("stoped");
    stream.getVideoTracks()[0].enabled = svideo;
  };
  const leaveCall = () => {
    setCallEnded(true);
    socket.emit("disconnectCall");
    connectionRef.current.destroy();
    window.location.reload(true);
  };

  return (
    < >
    <div className="body-video"> 
      <h2 style={{ textAlign: "center", color: "#fff" }}>
        MedConnect - Patient
      </h2>
      <div className="container">
        <Grid container spacing={2} className="video-container">
          <Grid item xs={8} className="video">
            {callAccepted && !callEnded ? (
              <center>
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  className="videoElementOut"
                />
              </center>
            ) : (
              <>
                <center>
                  <div className="videoElementOut"></div>
                </center>
              </>
            )}
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
                // onChange={(e) => setIdToCall(e.target.value)}
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
                      onClick={() => callUser()}
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
      </div>
    </>
  );
};

export default Video;
