import OTPInput from "react-otp-input";
import React, { useState } from "react";
import "./Otp.css";
import Lottie from 'lottie-react';
import login from './lotties/otp.json';

function Otp() {
  const [OTP, setOTP] = useState("");
  function handleChange(OTP) {
    setOTP(OTP);
   
  }
  function submit() {
    document.getElementById("result").innerHTML = document.getElementById({OTP}).value


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
                      <h2 className="form-title1" align="left"><span>Verify</span> Mail</h2><br></br>
                      <form class="reg-form2" name="loginform" id="reg-form1" align="left" method="get">
                        <div class="otp" ng-app=" ">
                            <OTPInput
                                onChange={handleChange}
                                value={OTP}
                                inputStyle="inputStyle"
                                numInputs={4}
                                // separator={<span>-</span>}
                            />
                        </div>
                        <br></br>
                        <div class="resend">
                            <p className="p3">Didn't receive the code?</p>
                            <a href="" className="p2">Resend</a>
                        </div>
                        <br></br>
                        <div class="butt2">         
                          <button  type="submit" name="submit" onClick={submit} value="Submit">Verify</button>               
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
