import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import './header.css';


export default function Navbarhead() {
  return (
   <>
 
 <header className="header-area">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <nav className="navbar navbar-expand-lg">
                        <div className="navbar-brand">
                            <img  src="Assets/MedConnect.png" 
                            width="450"
                            height="50" 
                            alt="img"/>
                        </div> 
                        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="bar-icon"></span>
                            <span className="bar-icon"></span>
                            <span className="bar-icon"></span>
                            <span className="bar-icon"></span>

                        </button> */}

                        <div className="collapse navbar-collapse side" id="navbarSupportedContent">
                            <ul id="nav" className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                <Link style={{ textDecoration: 'none' }} to="/">Home</Link>
                                     
                                </li>

                                {/* <li className="nav-item">
                                    <Link  style={{ textDecoration: 'none' }} to="/search">Find Doctors</Link>
                                </li>
                                <li className="nav-item">
                                    < Link  style={{ textDecoration: 'none' }} to="/bySpecialization">Specialization</Link>
                                </li> */}
                
                                <li  className="nav-item">
                                    <Link style={{ textDecoration: 'none' }}  to="/team">Lab Test</Link>
                                </li>
                                
                                <Link style={{ textDecoration: 'none' }} to="/login" >   <p className="main-btn btn-lg">Login</p>  </Link> 

                            </ul> 
                        </div>
                    </nav> 
                </div>
            </div> 
        </div> 
    </header>
   </>
  )
}
