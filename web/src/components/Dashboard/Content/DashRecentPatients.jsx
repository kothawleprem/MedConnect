import React from 'react'
import { Row, Col, Card } from "react-bootstrap";
import Table from 'react-bootstrap/Table';


const DashRecentPatients = () => {
  return (
    <div>
      <Card>
        <Card.Title style={{ margin: "10px" }}>Recent Patients</Card.Title>
        <Table hover responsive>
          <thead>
            <tr style={{ color: "grey", fontWeight: 500 }}>
              <th>Patent Name</th>
              <th>Consultation Id</th>
              <th>Date</th>
              <th>City</th>
              <th>View Consultation</th>
            </tr>
          </thead>
          <tbody className="ap-table">
            <tr>
              <td>
                {/* <img
                  alt=""
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="appoint-img"
                /> */}
                Jhon dev
              </td>
              <td>OPS-234</td>
              <td>5/3/23</td>
              <td>Male</td>
              <td>Diabetes</td>
            </tr>

            <tr>
              <td>
                {/* <img
                  alt=""
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="appoint-img"
                /> */}
                Jhon dev
              </td>
              <td>OPS-234</td>
              <td>5/3/23</td>
              <td>Male</td>
              <td>Diabetes</td>
            </tr>

            <tr>
              <td>
                {/* <img
                  alt=""
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="appoint-img"
                /> */}
                Jhon dev
              </td>
              <td>OPS-234</td>
              <td>5/3/23</td>
              <td>Male</td>
              <td>Diabetes</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default DashRecentPatients