import React ,{useState,useEffect}from 'react'
import { useNavigate, useLocation, Link } from "react-router-dom";
import Header from '../../components/Header/header';
import { Card, Container } from 'react-bootstrap';
import { Row, Col,Button } from "react-bootstrap";
import axios from 'axios';



function Packageview() {
    const { state } = useLocation();
    const navigate = useNavigate()

    const { labId } = state;
    console.log(labId);

     const [data, setData] = useState("");
     const pdata = [
        { id: 1, name: "Basic Women's Health Checkup", price:1099, description:"includes 12 test", discount:"-22%" ,disprice:1499, img:"https://images1-fabric.practo.com/dx/labs/PRL-HWP/logo.jpg/360x240" },
        { id: 2, name: "Vitamin Deficiency Health Checkup", price:899,description:"includes 12 test", discount:"-25%" ,disprice:1299, img:"https://images1-fabric.practo.com/dx/labs/PRL-VDHC/logo.jpg/400x268" },
        { id: 3, name: "Young Indian Health Checkup", price:899,  description:"includes 12 test",discount:"-22%" ,disprice:1499, img:"https://images1-fabric.practo.com/dx/labs/PRL-YIHC/logo_0gMZNaj.jpg/360x240" },

       
      ];


    useEffect(() => {
        axios
          .get(
            `http://127.0.0.1:8000/api/lab/labs_package/?labid=${labId}`
            //   config
          )
          .then((response) => {
            console.log(response.data);
            setData(response.data);
          })
          .catch((error) => console.log(error));
   

     
    }, [])




  const handleSubmit = (item) => {
    navigate("/payments", {
        state: {
          amount: item.price,
          package_id: item.id,
        },
      })
    // const patient_token = localStorage.getItem("patient_token");
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Token ${patient_token}`,
    //   },
    // };
    // const data = {
    //   "package_id": item.id,

    // }
    // axios
    //   .post(
    //     `http://${process.env.REACT_APP_API_URL}/api/consultation/book_slot/`,
    //     data,
    //     config
    //   )
    //   .then(function (response) {
    //     // setConsultationId(response.data.consultation_id);
    //   })
    //   .then(
    //     navigate("/payments", {
    //       state: {
    //         amount: item.price,
    //         slot_id: item.id,
    //       },
    //     })
    //   );
    // console.log('clicked')
  }


  return (
    <>
      <Header />
      <Container>
        Packageview {labId}
        <Row>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <h5>Lab: {labId}</h5>
                <h6>About {labId}:</h6>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {data.length > 0 && data.map((item) => (
            <Col xl={3} lg={3} md={4} sm={12}>
              <Card className="statscard">
                <Card.Body>
                  <div>
                    <p>Packages Id: {item.id}</p>
                    <Card.Title>Packages Name:{item.name}</Card.Title>
                    <p>Packages description:{item.description}</p>
                    <Card.Subtitle>Packages price:{item.price}</Card.Subtitle>
                    <br />
                    <Button
                      className="main-btn"
                      onClick={() => handleSubmit(item)}
                    >
                      {" "}
                      Book now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Packageview