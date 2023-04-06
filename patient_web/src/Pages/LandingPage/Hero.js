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
                                        <p>Free<br/>follow-up for 3 days</p>
                                    </div>
                                </div> 
                            </div>
                            <div className="col-lg-8 col-md-7">
                                <div className="slider-product-content">
                                    <h1 className="slider-title mb-10" data-animation="fadeInUp" data-delay="0.3s"><span>Consult</span> <span> Doctor</span>  Online</h1>
                                    <p className="mb-25" data-animation="fadeInUp" data-delay="0.9s">Schedule an appointment today start getting  medical care and advice you need.<br/>Whether you need to discuss a minor ailment or have questions about a chronic condition, we are here to help.</p>
                                    <Link  style={{ textDecoration: 'none' }}  className="main-btn" to="/" data-animation="fadeInUp" data-delay="1.5s">Explore More  <i className="lni-chevron-right"></i></Link>
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
