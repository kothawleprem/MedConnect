import React from 'react'
import Bar from './Navbar/Navbar'
import '../Dcform.css'
import { Link } from 'react-router-dom';
import Header from './Navbar/header';



export default function Verification() {
  return (
    <>
    <Header/>
    <br></br><br></br>
<div className='container'>  
    <div class="section-title">
            <h2>Your Information is being verified</h2>
            <p>You can continue setting up your profile or edit respose while we verify all of your Information
            </p>
          </div>
<center>  
<div> 
    <img src="Assets/waiting.png" alt='pending' />
</div>
<br/>
<div>
<Link style={{ textDecoration: 'none'  }} to="/Status"> <p className="main-btn ">Check status</p> </Link> 
&nbsp;
<Link style={{ textDecoration: 'none' }} to="/dcform"> <p className="main-btn ">View response</p> </Link> 

</div>
</center>


    </div>
    </>
    
  )
}
