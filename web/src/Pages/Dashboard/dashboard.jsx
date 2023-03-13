import React from "react";
import { Container, Row, Col} from "react-bootstrap";

import { useMediaQuery } from "react-responsive";
import './dashboard.css'


import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import ContentMain from "../../components/Dashboard/Content/ContentMain";
import Dcform from "../../dcform";


const Dashboard = () => {
  return (
    <div>
      <Container style={{backgroundColor:'#4365CD'}} fluid>
        <Row>
          <Col
            xl={3}
            lg={3}
            md={2}
            sm={6}
            className="sidebar-wrapper"
          >
            
           
            <Sidebar/>
            
            
          </Col>
          <Col
            xl={9}
            lg={9}
            md={10}
            sm={6}
            className="content-wrapper"
          
          >


            <ContentMain/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
