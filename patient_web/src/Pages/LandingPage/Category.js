import React from 'react'
import { Link } from 'react-router-dom';


export default function Category() {
  return (
    <>
        <section id="discount-product" className="discount-product pt-80">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 ">
                    <div className="single-discount-product mt-30">
                        <div className="product-image">
                            <img src="assets/lab1.jpg" alt="Product" />
                        </div> 
                        <div className="product-content">
                            <h4 className="content-title mb-15">Instant Doctor <br/> Consultation</h4>
                            <Link style={{ textDecoration: 'none' }}  to="/">Connect now <i className="lni-chevron-right"></i></Link>
                        </div> 
                    </div> 
                </div>
                <div className="col-lg-6 ">
                    <div className="single-discount-product mt-30">
                        <div className="product-image">
                            <img src="assets/lab2.jpg" alt="Product"/>
                        </div> 
                        <div className="product-content">
                            <h4 className="content-title mb-15">Lab Testing<br/>Sample pickup<br/> at your home</h4>
                            <Link style={{ textDecoration: 'none' }} to="#">Book appointment <i className="lni-chevron-right"></i></Link>
                        </div> 
                    </div> 
                </div>

             
            </div> 
        </div> 
    </section>
    </>
  )
}
