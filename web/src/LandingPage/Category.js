import React from 'react'
import { Link } from 'react-router-dom';


export default function Category() {
  return (
    <>
        <section id="discount-product" className="discount-product pt-80">
        <div className="container">
            <div class="row">
                <div className="col-lg-6 ">
                    <div className="single-discount-product mt-30">
                        <div className="product-image">
                            <img src="assets/Group 1.png" style={{height: '254px',}} alt="Product" />
                        </div> 
                        <div className="product-content">
                            <h4 className="content-title mb-15">Safe and Secure</h4>
                            <p>Anonymity and privacy of patient data</p>
                            <p>Security of communications</p>
                            <p>Availability and resilience of the service</p>
                            
                            {/* <Link style={{ textDecoration: 'none' }}  to="/">Connect now <i className="lni-chevron-right"></i></Link> */}
                        </div> 
                    </div> 
                </div>
                <div className="col-lg-6 ">
                    <div className="single-discount-product mt-30">
                        <div className="product-image">
                            <img src="assets/Group 2.png" alt="Product"/>
                        </div> 
                        <div className="product-content">
                            <h4 className="content-title mb-15">PAN India Connectivity</h4>
                            <p>Our system assists patients looking for affordable options<br/>for quality medical treatment in India, offering them<br/>round-the-clock hospital assistance services.</p>
                            {/* <Link style={{ textDecoration: 'none' }} to="#">Book appointment <i className="lni-chevron-right"></i></Link> */}
                        </div> 
                    </div> 
                </div>

             
            </div> 
        </div> 
    </section>
    </>
  )
}
