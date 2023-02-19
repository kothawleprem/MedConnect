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
                                    <h1 className="slider-title mb-10" data-animation="fadeInUp" data-delay="0.3s"><span>Gift</span>   <span>A</span>    <span>Smile</span></h1>
                                    <p className="mb-25" data-animation="fadeInUp" data-delay="0.9s">The opportunity to care for your patients is your greatest honour and previlege.<br/>It is your responsibility to not only treat your patients, provide them care, but also <br></br>embrace them.<br></br>The dynamic process of improving patient care should always be on the thoughts of healthcare professionals. Quality must be taken into account in all areas of patient care, including non-medical ones.</p>
                                    <p  className="main-btn1" data-animation="fadeInUp" data-delay="1.5s" style={{fontSize: '25px',}}><span style={{fontFamily:'Elephant',fontSize:"50px"}}>"</span>Our Patients are our best Teachers<span style={{fontFamily:'Elephant',fontSize:"50px"}}>"</span><i className="lni-chevron-right"></i></p>
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
