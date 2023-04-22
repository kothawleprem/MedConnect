import React from 'react'
import { Link } from 'react-router-dom';

export default function Specialists() {
  return (
    <>

<section id="team" class="team-area pt-40 pb-50 mt-50">

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="section-title text-center pb-10">
                        <h3 class="title mb-15">Create your free MedConnect profile in 3 simple steps</h3>
                    </div>
                </div>
            </div> 

            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 col-sm-8">
                    <div class="single-temp text-center mt-30">
                        <div class="team-image">
                            <img src="assets/contract.png" alt="Team" />
                        </div>
                        <div class="team-content mt-30">
                            <h4 class="title mb-10"><Link style={{ textDecoration: 'none' }} to="#">Register on MedConnect</Link></h4>
                            <p>Enter your name, email id, mobile number and clinic or establishment name and all details.</p>
                            <br/>
                        </div>
                    </div> 
                </div>

              
              
                <div class="col-lg-4 col-md-6 col-sm-8">
                    <div class="single-temp text-center mt-30">
                        <div class="team-image">
                            <img src="assets/add-user.png" alt="Team" />
                        </div>
                        <div class="team-content mt-10">
                            <h4 class="title mb-10"><Link  style={{ textDecoration: 'none' }} to="#">Add your profile information</Link></h4>
                            <p>Fill details about your practice including your medical registration ,timings more.</p>
                            <br></br><br></br><br></br>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-4 col-md-6 col-sm-8">
                    <div class="single-temp text-center mt-30">
                        <div class="team-image">
                            <img src="assets/profile.png" alt="Team" />
                        </div>
                        <div class="team-content mt-10">
                            <h4 class="title mb-10"><Link  style={{ textDecoration: 'none' }} to="#">Help us verify your details</Link></h4>
                            <p>Complete our a simple verification process online, and go live!</p>
                            <br></br><br></br><br></br>
                        </div>
                    </div> 
                </div>
                <br/>
                <br/>
              <center>
              <p>Note: Verifying your medical registration and qualification ensures that you get listed as a genuine medical practitioner.</p> 

              </center>

              

            </div> 
        </div> 
    </section>
    
    </>
  )
}
