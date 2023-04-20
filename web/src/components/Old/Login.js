
import "./Login.css";
import React, { useState } from "react";
import Lottie from "lottie-react";
import login from "../../lotties/login.json";
import validator from "validator";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (e) => {
    var email = e.target.value;
    setEmail(email);

    if (validator.isEmail(email)) {
      setEmailError("Valid Email");
    } else {
      setEmailError("Enter valid Email!");
    }
  };
  const style = {
    height: 400,
    width: 400,
  };

  const sendOtp = () => {
    axios
      .post(`http://${process.env.REACT_APP_API_URL}/api/doctors/email/`, {
        email: email,
      })
      .then(function (response) {
        console.log(response);
        if (response.data == 200) {
          navigate(`/otp`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="all2">
      <section className="reg1">
        <div className="shadow p-3 mb-5 bg-white rounded">
          <div className="container mt-3">
            <div className="reg-content1">
              <div className="reg-form01">
                <h2 className="form-title1" align="left">
                  <span>Sign</span> in
                </h2>
                <br></br>
                <form
                  className="reg-form2"
                  name="loginform"
                  id="reg-form1"
                  align="left"
                >
                  <div className="username1">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Email address
                    </label>
                    <span> *</span>

                    <input
                      placeholder="Enter valid Email"
                      onChange={(e) => validateEmail(e)}
                      type="text"
                      id="logingrno"
                      name="logingrno"
                      className="form-control"
                    />
                    <span
                      className="msg"
                      style={{
                        color: "red",
                      }}
                    >
                      <small>{emailError}</small>
                    </span>
                  </div>

                  <br />
                  <br />

                  <div className="butt1">
                    <button
                      onClick={sendOtp}
                      type="submit"
                      name="submit"
                      value="Submit"
                    >
                      Submit
                    </button>
                  </div>

                  <div className="login2">
                    <span className="forget1">
                      <a href="/Signup"></a>
                    </span>
                  </div>

                  <div className="img1" align="left">
                    <br></br>
                    <br></br>
                    <Lottie animationData={login} style={style} />
                  </div>
                </form>
                <br />
                <br />
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
