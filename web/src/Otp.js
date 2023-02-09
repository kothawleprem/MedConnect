// import OTPInput from "react-otp-input";
import { MuiOtpInput } from 'mui-one-time-password-input'

import React, { useState } from "react";
import "./Otp.css";
import Lottie from 'lottie-react';
import login from './lotties/otp.json';
import { useNavigate } from "react-router-dom"
import axios from "axios";


function Otp() {
  const [OTP, setOTP] = useState("");
  const [incorrect, setIncorrect] = useState(false)
  const navigate = useNavigate();

  function handleChange(OTP) {
    setOTP(OTP);
  }

 const submitOtp =()=>{
  axios.post('http://127.0.0.1:8000/api/doctors/verify_email/', {
    email: OTP,
   
  })
  .then(function (response) {
    console.log(response);
    if(response.status==401){
      console.log("Incorrect OTP")
      setIncorrect(true);
    
    } else if(response.status=200) {
     console.log("correct")
     navigate(`/dashboard`)


    } else{
      console.log("try again")
    }
   
  })
  .catch(function (error) {
    console.log(error);
  });

 }

  const style = {
    height: 400,
    width: 400
  };
  
  return (
    <div className="otp-form">
        <section className="otp-reg1" >
            <div className="shadow p-3 mb-5 bg-white rounded">
              <div className="container mt-3">
                  <div className="reg-content1">
                    <div className="reg-form01">
                      <h2 className="form-title1" align="left"><span>Verify </span> Mail</h2><br></br>
                      <form class="reg-form2" name="loginform" id="reg-form1" align="left" action="/Login" method="post">
                        <div class="otp">
                         
                             <MuiOtpInput value={OTP} onChange={handleChange} />
                        </div>
                        <br></br>
                        <div class="resend">

                       {incorrect ? <p> Incorrect Otp!!</p> : <p> </p> } 

                            <p className="p3">Didn't receive the code?</p>
                            <a href="" className="p2">Resend</a>
                        </div>
                        <br></br>
                        <div class="butt2">         
                          <button  onClick={submitOtp} type="submit" name="submit" value="Submit">Verify</button>               
                        </div>
                                    
                        {/* <div class="login1">
                          <span class="forget2">
                            <a href=''>
                              <small>Create an account?</small>
                            </a>        
                          </span>
                        </div> */}
                        
                        <div class="img1" align="left">
                        <br></br><br></br>
                          <Lottie 
	                          animationData={login}
                            style = {style}
                          />
                        </div>
                      </form>
                      <br/><br/><br></br><br></br>
                    </div>
                  </div>
                </div>
              </div>
          </section>
      </div>
 

  );
}

export default Otp;
