import React,{useState,useEffect} from 'react'
import { Row, Col, Card } from "react-bootstrap";
import { FaBeer } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from "axios";




const Stats = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("lab_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    axios
    .get(`http://${process.env.REACT_APP_API_URL}/api/lab/package`, config)
    .then(function (response) {
      console.log(response ,"RESPONSE");
      setData(response.data);

      
     
    })
    .catch(function (error) {
      console.log(error);
    });

  }, [])
  


  // const data = [
  //   { name: 'Full body checkup', description: 'This is item 1', test:'2', imageUrl: 'https://example.com/item1.jpg',price:1500 },
  //   { name: 'CBC', description: 'This is item 2', test:'2', imageUrl: 'https://example.com/item2.jpg',price:1500 },
  //   { name: 'RTPCR', description: 'This is item 3',  test:'2',imageUrl: 'https://example.com/item3.jpg',price:1500 },
  //   { name: 'Thyroid T3', description: 'This is item 2', test:'2', imageUrl: 'https://example.com/item2.jpg',price:1500 },
  //   { name: 'LFT', description: 'This is item 2',  test:'2',imageUrl: 'https://example.com/item2.jpg' ,price:1500},
  //   { name: 'Hemoglobin', description: 'This is item 2',  test:'2',imageUrl: 'https://example.com/item2.jpg' ,price:1500},
  //   { name: 'Diabetes', description: 'This is item 2',  test:'2',imageUrl: 'https://example.com/item2.jpg' ,price:1500},

  // ];


  return (
    <div>
      <Row>
        <p>All Packages</p>
       
      
        
        {data.length > 0 && data.map((item, index) => (
           <Col xl={3} lg={3} md={6} sm={12}>

          <Card className='statscard'  key={index}> 
          <br/>
          <Card.Title className='stats-total'> {item.name}</Card.Title>

          <Card.Subtitle className="stats-title"> No of Test: {item.no_tests} </Card.Subtitle>

          {/* <FaBeer size={30} className='stats-icon' /> */}

          <img src="https://cdn-icons-png.flaticon.com/512/3358/3358902.png" className='stats-icon' />

          <div className='stats-links'> 
         
          <p className='stats-green'> Price:{item.price}</p>
         
          </div>
          </Card>
          </Col>
                ))}

       
      </Row>
    </div>
  );
}

export default Stats