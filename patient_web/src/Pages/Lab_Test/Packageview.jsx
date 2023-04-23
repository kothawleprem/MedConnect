import React ,{useState,useEffect}from 'react'
import { useNavigate, useLocation, Link } from "react-router-dom";
import Header from '../../components/Header/header';
import { Card } from 'react-bootstrap';
import { Row, Col,Button } from "react-bootstrap";
import axios from 'axios';


function Packageview() {
    const { state } = useLocation();
    const { packageId } = state;

     const [data, setData] = useState("");

    useEffect(() => {
        axios
        .post(
          `http://${process.env.REACT_APP_API_URL}/api//`,
          data,
        //   config
        )
        .then((response) => {
          console.log(response.data);
          setData(response.data)
          
        })
        .catch((error) => console.log(error));
   

     
    }, [])

    
    const handleSubmit = (e) => {
        axios
        .post(
          `http://${process.env.REACT_APP_API_URL}/api//`,
          data,
        //   config
        )
        .then((response) => {
          console.log(response.data);
        
          
        })
        .catch((error) => console.log(error));
   
   
      
  }



  return (
    <>
    <Header/>

    Packageview  {packageId}
    <Col xl={3} lg={3} md={4} sm={12}>
    <Card className='statscard'>
        <div>
            <p>Packages Id: {packageId}</p>
            <p>Packages Name:{data.name}</p>
            <p>Packages description:{data.description}</p>
            <p>Packages About:{data.about}</p>


            <Button style={{ textDecoration: 'none' }}   onClick={handleSubmit} > <h6 style={{color:'#fe7865' }} >Book now</h6> </Button>  


        </div>
    </Card>
    </Col>
    </>
  )
}

export default Packageview