import logo from './logo.svg';
import './Signup.css';
import Lottie from 'lottie-react';
import login from './lotties/signup.json';
function Signup() {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }
  // };

  const style = {
    height: 400,
    width: 400
  };
  
  return (
        
      <div className="signup">
        <section className="signup1" >
            <div className="shadow p-3 mb-1 bg-white rounded">
              <div className="container mt-3">
                  <div className="reg-content1">
                    <div className="reg-form01">
                      <h2 className="signup-title1" align="left"><span>Sign</span> up</h2><br></br>
                      <form class="signup-form" name="loginform"  align="left" action="/Login" method="post">
                        
                        <div class="Fname">
                          <label for="exampleFormControlInput1" class="form-label">First Name</label><span> *</span>
                          
                          <input placeholder="Enter First Name" type="text" id="firstname"  name="firstname" class="form-control" />
                        </div>
                        
                        <div class="Lname">
                          <label for="exampleFormControlInput1" class="form-label">Last Name</label><span> *</span>
                          
                          <input placeholder="Enter Last Name" type="text" id="lastname"  name="lastname" class="form-control" />
                        </div>
                        
                        <div class="desc-dr">
                            <label for="exampleFormControlInput1" class="form-label">Description</label><span> *</span>
                            <textarea class="form-control" id="desc" rows="3"></textarea>
                        </div>
                        
                        <div class="city">
                            <label for="exampleFormControlInput1" class="form-label">City</label><span> *</span>
                            <select class="form-select" id="cityname" aria-label="Default select example">
                                <option selected>Select City</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        

                        <div class="signup-butt1">         
                          <button  type="submit" name="submit" value="Submit">Signup</button>               
                        </div>
                                    
                        <div class="login1">
                          <span class="forget2">
                            <a href=''>
                              <small>Already have an account?</small>
                            </a>        
                          </span>
                        </div>
                        
                        <div class="signup-img1" align="left">
                        <br></br>
                          <Lottie 
	                          animationData={login}
                            style = {style}
                          />
                        </div>
                      </form>
                    
                    </div>
                  </div>
                </div>
              </div>
          </section>
      </div>
 

  );
}

export default Signup;
