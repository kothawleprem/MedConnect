import React from 'react'
import { Link } from 'react-router-dom';

import './header.css';


export default function Header() {
  return (
   <>
 
 <header className="header-area">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand" href="index.html">
                            <img className="logo" src="/Assets/MedConnect.png"  alt="Logo"/>
                        </a> 
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="bar-icon"></span>
                            <span className="bar-icon"></span>
                            <span className="bar-icon"></span>
                            <span className="bar-icon"></span>

                        </button>

                        <div className="collapse navbar-collapse side" id="navbarSupportedContent">
                            <ul id="nav" className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                <Link style={{ textDecoration: 'none' }} to="/">Home</Link>
                                     
                                </li>

                                <li className="nav-item">
                                    <Link  style={{ textDecoration: 'none' }} to="/finddoctor">Find Doctors</Link>
                                </li>
                                <li className="nav-item">
                                    < Link  style={{ textDecoration: 'none' }} to="/service">Video Consult</Link>
                                </li>
                
                                <li  className="nav-item">
                                    <Link style={{ textDecoration: 'none' }}  to="/team">Lab Test</Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link  style={{ textDecoration: 'none' }} to="/contact">Contact</Link>
                                </li>
                                
                               
                           
                            </ul> 
                          <Link style={{ textDecoration: 'none' }} to="/login" >   <p className="main-btn btn-lg">Login</p>  </Link> 
                        </div>
                    </nav> 
                </div>
            </div> 
        </div> 
    </header>
   </>
  )
}
