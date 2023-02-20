import React,{useState} from 'react'
import Bar from './Navbar/Navbar'
import '../Dcform.css'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';




export default function Status() {
    const [status, setStatus] = useState(true)
  return (
    <>
    <Bar/>
    <br></br><br></br>
<div className='container'>  
    <div class="section-title">
            <h2>Profile status</h2>
            <p>You can continue setting up your profile or edit respose while we verify all of your Information
            </p>
          </div>
        
       

<center>  

<div>
          <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>Status:</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Approve</Card.Subtitle>
        { status  &&
    <img src="https://cdn4.iconfinder.com/data/icons/basicolor-arrows-checks/24/ok_check_done-512.png" style={{width:"3rem"}} alt='pending'/>
    }
        <Card.Text>
          Congratulation your profile is approve 🎉
        </Card.Text>
      
      </Card.Body>
    </Card>
          </div>
<div> 
   
</div>
<br/>
<div>
<Link style={{ textDecoration: 'none'  }} to="/Scheduling"> <p className="main-btn ">Continue</p> </Link> 


</div>
</center>


    </div>

    </>
  )
}
