
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Tabs from 'react-bootstrap/Tabs';
function RestaurantTabDetails() {
    return (
    <Container>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Info" title="Info">
          <p>This is Restaurant Info</p>
        </Tab>
        <Tab eventKey="Menu" title="Menu">
          <p> This is Menu</p>
        </Tab>
        <Tab eventKey="Review" title="Review">
          <p> This is the Review Section</p>
          </Tab>
          <Tab eventKey="Parking" title="Parking">
          <p> This Restaurant has Parking Facilities Section</p>
          
        </Tab>
      </Tabs>
      </Container>
    );
  }

  export default RestaurantTabDetails;