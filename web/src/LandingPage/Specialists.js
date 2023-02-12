import React from 'react'
import { Link } from 'react-router-dom';

export default function Specialists() {
  return (
    <>

<section id="team" class="team-area pt-40 pb-50 mt-50">

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="section-title text-center pb-25">
                        <h3 class="title mb-15">Consult top doctors online for any health concern</h3>
                        <p>TOOLS DESIGNED TO HELP YOU MAKE HEALTHIER DECISIONS</p>
                    </div>
                </div>
            </div> 

            <div class="row justify-content-center">
                <div class="col-lg-2 col-md-6 col-sm-8">
                    <div class="single-temp text-center mt-30">
                        <div class="team-image">
                            <img src="assets/s1.png" alt="Team" />
                        </div>
                        <div class="team-content mt-30">
                            <h4 class="title mb-10"><Link style={{ textDecoration: 'none' }} to="#">Symptom Checker</Link></h4>
                            <p>Tell us how you're feeling for suggested next steps and treatment plans.</p>
                            <br/>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-2 col-md-6 col-sm-8">
                    <div class="single-temp text-center mt-30">
                        <div class="team-image">
                            <img src="assets/c2.jpg" alt="Team" />
                        </div>
                        <div class="team-content mt-10">
                            <h4 class="title mb-10"><Link style={{ textDecoration: 'none' }} to="#">Depression or anxiety</Link></h4>
                            <p>Emotional or mental helth concern</p>
                            <br/><br/><br/><br/>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-2 col-md-6 col-sm-8">
                    <div class="single-temp text-center mt-30">
                        <div class="team-image">
                            <img src="assets/s2.png" alt="Team" />
                        </div>
                        <div class="team-content mt-10">
                            <h4 class="title mb-10"><Link  style={{ textDecoration: 'none' }} to="#">Drugs and Supplements</Link></h4>
                            <p>Everything you need to know about prescription and OTC drugs.</p>
                            <br></br><br></br><br></br>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-2 col-md-6 col-sm-8">
                    <div class="single-temp text-center mt-30">
                        <div class="team-image">
                            <img src="assets/s3.png" alt="Team" />
                        </div>
                        <div class="team-content mt-30">
                            <h4 class="title mb-10"><Link style={{ textDecoration: 'none' }} to="#">Recipes</Link></h4>
                            <p>From breakfast ideas to noguilt desserts, prepare dishes that are healthy and delicious.</p>
                            <br></br>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-2 col-md-6 col-sm-8">
                    <div class="single-temp text-center mt-30">
                        <div class="team-image">
                            <img src="assets/s4.png" alt="Team" />
                        </div>
                        <div class="team-content mt-10">
                            <h4 class="title mb-10"><Link style={{ textDecoration: 'none' }} to="#">Check In, Check Up</Link></h4>
                            <p>Holistically evaluate your condition management by taking these assesment.</p>
                            <br></br>
                        </div>
                    </div> 
                </div>

                <div class="col-lg-2 col-md-6 col-sm-8">
                    <div class="single-temp text-center mt-30">
                        <div class="team-image">
                            <img src="assets/s5.png" alt="Team" />
                        </div>
                        <div class="team-content mt-30 pr-20">
                            <h4 class="title mb-10"><Link style={{ textDecoration: 'none' }} to="#">The Visit</Link></h4>
                            <p>With this interactive IBD appointment experience, you decide what you want to learn next.</p>
                        </div>
                    </div> 
                </div>

            </div> 
        </div> 
    </section>
    
    </>
  )
}
