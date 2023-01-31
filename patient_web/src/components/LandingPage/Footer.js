import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
    <section id="footer" class="footer-area">
        <div class="container">
            <div class="footer-widget pt-75 pb-120">
                <div class="row">
                    <div class="col-lg-3 col-md-5 col-sm-7">
                        <div class="footer-logo mt-40">
                            <Link to="#">
                                <img src="https://images1-fabric.practo.com/practices/1240571/terna-speciality-hospital-research-centre-navi-mumbai-5c51a98214e65.jpg" alt="Logo"/>
                            </Link>
                            <p class="mt-10">Gravida nibh vel velit auctor aliquetn quibibendum auci elit cons equat ipsutis sem nibh id elit.</p>
                        
                        </div> 
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-5">
                        <div class="footer-link mt-50">
                            <h5 class="f-title">Services</h5>
                            <ul>
                                <li><Link to="#">Consult Doctors</Link></li>
                                <li><Link to="#">Book Dignostic Test</Link></li>
                                <li><Link to="#">Search for doctors</Link></li>
                                <li><Link to="#">Book Full Body Checkups</Link></li>
                                <li><Link to="#">Health app</Link></li>
                            </ul>
                        </div> 
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-5">
                        <div class="footer-link mt-50">
                            <h5 class="f-title">Help</h5>
                            <ul>
                                <li><a to="#">Forum</a></li>
                                <li><a to="#">Blog</a></li>
                                <li><a to="#">Help Center</a></li>
                                <li><a to="#">Contact Us</a></li>
                                <li><a to="#">Privacy Policy</a></li>
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
                                            <p>+88123 4567 890</p>
                                            <p>+88123 4567 890</p>
                                        </div>
                                    </div> 
                                </li>
                                <li>
                                    <div class="single-footer-info mt-20">
                                        <span>Email :</span>
                                        <div class="footer-info-content">
                                            <p>contact@yourmail.com</p>
                                            <p>support@yourmail.com</p>
                                        </div>
                                    </div> 
                                </li>
                                <li>
                                    <div class="single-footer-info mt-20">
                                        <span>Address :</span>
                                        <div class="footer-info-content">
                                            <p>5078 Jensen Key, Port Kaya, WV 73505</p>
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
