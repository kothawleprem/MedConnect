import logo from './logo.svg';
import './Login.css';

import React, { useState } from "react";
import Lottie from 'lottie-react';
import login from './lotties/login.json';
import validator from 'validator'
function Login() {
  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('Valid Email')
    } else {
      setEmailError('Enter valid Email!')
    }
  }
  const style = {
    height: 400,
    width: 400
  };
  
  return (
        
      <div className="all2">
        <section className="reg1" >
            <div className="shadow p-3 mb-5 bg-white rounded">
              <div className="container mt-3">
                  <div className="reg-content1">
                    <div className="reg-form01">
                      <h2 className="form-title1" align="left"><span>Sign</span> in</h2><br></br>
                      <form class="reg-form2" name="loginform" id="reg-form1" align="left" action="/Login" method="post">
                        
                        <div class="username1">
                          <label for="exampleFormControlInput1" class="form-label">Email address</label><span> *</span>
                          
                          <input placeholder="Enter valid Email" onChange={(e) => validateEmail(e)} type="text" id="logingrno"  name="logingrno" class="form-control" />
                          <span class="msg" style={{
                            
                            color: 'red',
                            }}><small>{emailError}</small></span>
                        </div>
                        

                        <br/><br/>
                        
                        <div class="butt1">         
                          <button  type="submit" name="submit" value="Submit">Submit</button>               
                        </div>
                                    
                        <div class="login2">
                          <span class="forget1">
                            <a href='/Signup'>
                              <small>Create an account?</small>
                            </a>        
                          </span>
                        </div>
                        
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

export default Login;
