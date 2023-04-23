import React ,{useState}from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/Header/header';
import { useNavigate } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";




export default function Lab() {
    const navigate = useNavigate();
    // const [data, setData] = useState("");

    // useEffect(() => {
    //     axios
    //     .post(
    //       `http://${process.env.REACT_APP_API_URL}/api//`,
    //       data,
    //     //   config
    //     )
    //     .then((response) => {
    //       console.log(response.data);
    //       setData(response.data)
          
    //     })
    //     .catch((error) => console.log(error));
   

     
    // }, [])
    



    const data = [
        { id: 1, name: "Basic Women's Health Checkup", price:1099, description:"includes 12 test", discount:"-22%" ,disprice:1499, img:"https://images1-fabric.practo.com/dx/labs/PRL-HWP/logo.jpg/360x240" },
        { id: 2, name: "Vitamin Deficiency Health Checkup", price:899,description:"includes 12 test", discount:"-25%" ,disprice:1299, img:"https://images1-fabric.practo.com/dx/labs/PRL-VDHC/logo.jpg/400x268" },
        { id: 3, name: "Young Indian Health Checkup", price:899,  description:"includes 12 test",discount:"-22%" ,disprice:1499, img:"https://images1-fabric.practo.com/dx/labs/PRL-YIHC/logo_0gMZNaj.jpg/360x240" },

       
      ];


      const handleSubmit = (e) => {
              navigate("/packageview", {
                state: {
                  packageId: e,
                },
              });
         
            
        }
    

  return (
    <>
    <Header/>
    <div className="container pt-50 pb-50">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="section-title text-center pb-25">
                        <h3 className="title mb-15">Popular Health Checkup Packages</h3>
                        <p>Your tests will be conducted in one of our partner labs to ensure highest accuracy of your reports.</p>
                    </div>
                </div>
            </div> 
            </div> 
       {/* <div className="col-lg-8 col-md-8 ml-200">
       <div className="row justify-content-center">
               
            </div>  */}
                    {/* <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active"   aria-labelledby="v-pills-furniture-tab">
                            <div className="product-items mt-30">
                                <div className="row product-items-active"> */}
                              <Row className="justify-content-center">   
                                {data.map((user) => (
                                   
                          
                            <Col xl={3} lg={3} md={4} sm={12}>

                            <Card className='statscard'> 
                            <br/>
                            <Card.Title className='stats-total'> {user.name}</Card.Title>
                  
                            <Card.Subtitle className="stats-title"> {user.description}</Card.Subtitle>
                  
                                  
                            <div className='stats-links'> 
                           
                            <p className='stats-green'> Price:{user.price}</p>
                              <Button style={{ textDecoration: 'none' }}   onClick={() => handleSubmit(user.id)} > <h6 style={{color:'#fe7865' }} >Book now</h6> </Button>  

                           
                            </div>
                            </Card>
                            </Col>
                                   
                                  ))}
                                </Row>
                        



    </>
  )
}
