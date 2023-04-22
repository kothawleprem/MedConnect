import React,{useState,useEffect} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Bar from './Navbar/Navbar'
import '../Dcform.css'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Header from './Navbar/header';




export default function Status() {
    // const [status, setStatus] = useState(true)
    // const [statusimg, setStatusimg] = useState()
    const [userRequest, setUserRequest] = useState({
      status: "",
      statusimg: "",
      description:""
    });
    
    useEffect(() => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      axios
      .get(`http://${process.env.REACT_APP_API_URL}/api/doctors/request_verification/`, config)
      .then(function (response) {
        console.log(response ,"RESPONSE");
        if (response.data.status === "Approved") {
          setUserRequest({
            status:"Approved" ,
            statusimg:"https://cdn4.iconfinder.com/data/icons/basicolor-arrows-checks/24/ok_check_done-512.png",
            description:response.data.remarks
          
          });
          
        } else if ((response.data.status  === "Rejected")) {
          setUserRequest({
            status:"Rejected" ,
            statusimg:"https://cdn-icons-png.flaticon.com/512/2822/2822683.png",
            description:response.data.remarks
          });
        } else {
          setUserRequest({
            status:"Pending" ,
            statusimg:"https://cdn-icons-png.flaticon.com/512/3286/3286236.png",
            description:response.data.remarks
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }, [])
    

  return (
    <>
    <Header/>
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
  { userRequest.status==="Approved" ? <Link style={{ textDecoration: 'none'  }} to="/Scheduling"> <p className="main-btn ">Continue</p> </Link> 
: <h1> </h1> }
&nbsp;

<Link style={{ textDecoration: 'none' }} to="/Formview"> <p className="main-btn ">View response</p> </Link> 


</div>
</center>


    </div>

    </>
  )
}
