import React,{useState,useEffect} from 'react'
import Bar from './Navbar/Navbar'
import '../Dcform.css'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from "axios";




export default function Status() {
    const [status, setStatus] = useState(true)
    const [statusimg, setStatusimg] = useState()
    const [userRequest, setUserRequest] = useState({
      status: "",
      statusimg: "",
    });
    
    
    useEffect(() => {
      axios
      .get("http://127.0.0.1:8000/api/doctors/request_verification?email=kothawleprem@gmail.com", {
        
      })
      .then(function (response) {
        console.log(response);
        if (response.status === "Approved") {
          setUserRequest({
            status:"Rejected" ,
            statusimg:"https://cdn4.iconfinder.com/data/icons/basicolor-arrows-checks/24/ok_check_done-512.png",
            description:"Congratulation your profile is approve 🎉"
          
          });
          
        } else if ((response.status === "Rejected")) {
          setUserRequest({
            status:"Rejected" ,
            statusimg:"https://cdn4.iconfinder.com/data/icons/basicolor-arrows-checks/24/ok_check_done-512.png",

          });
        } else {
          setUserRequest({
            status:"Pending" ,
            statusimg:"https://cdn4.iconfinder.com/data/icons/basicolor-arrows-checks/24/ok_check_done-512.png",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }, [])
    

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
        <Card.Title>Status: {userRequest.status}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Approve</Card.Subtitle> */}
       
    <img src={userRequest.statusimg} style={{width:"3rem"}} alt='pending'/>
    
        <Card.Text>
        {userRequest.description}
        </Card.Text>
      
      </Card.Body>
    </Card>
          </div>
<div> 
   
</div>
<br/>
<div>
  { userRequest.status=="Approved" ? <Link style={{ textDecoration: 'none'  }} to="/Scheduling"> <p className="main-btn ">Continue</p> </Link> 
: <h1> </h1> }


</div>
</center>


    </div>

    </>
  )
}
