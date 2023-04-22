import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
    <section id="footer" class="footer-area">
        <div class="container">
            <div class="footer-widget pt-10 pb-10">
                <div class="row">
                    <div class="col-lg-3 col-md-5 col-sm-7">
                        <div class="footer-logo mt-40">
                            <Link to="#">
                            <img className="logo" src="Assets/MedConnect.png" 
                            width="250"
                            height="50" 
                            alt="img"/>
                            </Link>
                            <p class="mt-10">
                            MedConnect, your one-stop destination for online healthcare services. Our platform offers a range of convenient and accessible healthcare solutions, including instant doctor consultations and lab testing.
                            </p>
                        
                        </div> 
                    </div>
                  
                    <div class="col-lg-3 col-md-4 col-sm-5" style={{marginLeft:'20px'}}>
                        <div class="footer-link mt-50">
                            <h5 class="f-title">Services</h5>
                            <ul>
                                <li><Link to="/search">Consult Doctors</Link></li>
                                <li><Link to="/bySpecialization">Search for doctors</Link></li>
                                <li><Link to="/team">Lab testing</Link></li>
                            </ul>
                        </div> 
                    </div>
    
                    <div class="col-lg-4 col-md-5 col-sm-7">
                        <div class="footer-info mt-50">
                            <h5 class="f-title">Contact Info</h5>
                            <ul>
                                <li>
                                    <div class="single-footer-info mt-20">
                                        <span>Phone :</span>
                                        <div class="footer-info-content">
                                            <p>+919867837895</p>
                                           
                                        </div>
                                    </div> 
                                </li>
                                <li>
                                    <div class="single-footer-info mt-20">
                                        <span>Email :</span>
                                        <div class="footer-info-content">
                                            <p>MedConnect@gamil.com</p>
    
                                        </div>
                                    </div> 
                                </li>
                                <li>
                                    <div class="single-footer-info mt-20">
                                        <span>Address :</span>
                                        <div class="footer-info-content">
                                            <p>Nerul, Navi Mumbai</p>
                                        </div>
                                    </div> 
                                </li>
                            </ul>
                        </div> 
                    </div>
                </div> 
            </div> 
            <div class="footer-copyright pt-15 pb-15">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="copyright text-center">
                            <p></p>
                        </div> 
                    </div>
                </div>
            </div> 
        </div> 
    </section>
    
    </>
  )
}
