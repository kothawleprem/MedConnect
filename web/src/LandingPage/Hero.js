import React from 'react'
import './style.css';
import './hero.css';
import './default.css';
import './responsive.css';

import { Link } from 'react-router-dom';




export default function Hero() {
  return (
    <div>
          <section id="home" className="slider-area pt-100">
        <div className="container-fluid position-relative">
            <div className="slider-active">
                <div className="single-slider">
                    <div className="slider-bg">
                        <div className="row no-gutters align-items-center ">
                            <div className="col-lg-4 col-md-5">
                                <div className="slider-product-image d-none d-md-block">
                                    <img src="assets/4.jpg" alt="Slider"/>
                                    <div className="slider-discount-tag">
                                        <p>Assisting<br/>Patients<br/>24*7</p>
                                    </div>
                                </div> 
                            </div>
                            <div className="col-lg-8 col-md-7">
                                <div className="slider-product-content">
                                    <h1 className="slider-title mb-10" data-animation="fadeInUp" data-delay="0.3s"> Expand Your Reach      Connect with Patients Worldwide</h1>
                                    <p className="mb-25" >Welcome to MedConnect, the online healthcare platform that's changing the way patients and doctors connect. We're excited to invite you to join our community of healthcare professionals and help us provide high-quality, accessible healthcare <br/>to patients around the world.</p>
                                    <p  className="main-btn1" style={{fontSize: '25px',}}><span style={{fontFamily:'Elephant',fontSize:"25px"}}></span>Create your Profile<span style={{fontFamily:'Elephant',fontSize:"25px"}}></span><i className="lni-chevron-right"></i></p>
                                </div> 
                            </div>
                        </div> 
                    </div> 
                </div> 

               
               
            </div> 
          
        </div> 
    </section>
    </div>
  )
}
