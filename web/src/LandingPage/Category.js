import React from 'react'
import { Link } from 'react-router-dom';


export default function Category() {
  return (
    <>
        <section id="discount-product" className="discount-product pt-70">
        <div className="container">
            <div class="row">
                <div className="col-lg-6 " >
                    <div className="single-discount-product mt-30">
                        <div className="product-image">
                            <img src="assets/Group 1.png" style={{height: '254px',}} alt="Product" />
                        </div> 
                        <div className="product-content">
                            <h4 className="content-title ">MedConnect Consult</h4>
                            <br/>
                            <p>Consult online and grow your practice.<br/> Reach new patients and connect with <br/> your patients online.</p>
                            <br/>

                            <br/>

                            

                        </div> 
                    </div> 
                </div>
                <div className="col-lg-6 ">
                    <div className="single-discount-product mt-30">
                        <div className="product-image">
                            <img src="assets/Group 2.png" alt="Product"/>
                        </div> 
                        <div className="product-content">
                            <h4 className="content-title mb-15">With MedConnect Consult you can</h4>
                             <p>- Answer medical queries & showcase your expertise</p>
                                  <p>- Maximise your earnings with paid online consultations</p>
                                  <p>- Offer online follow-ups to your clinic patients</p>
                        </div> 
                    </div> 
                </div>

             
            </div> 
        </div> 
    </section>
    </>
  )
}
