import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from "react";
import axios from "axios";
import { Global } from "../helpers/Global.js";

function RestaurantTabDetails({restaurantDetail}) {

  const baseUrl = Global.baseUrl;
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    
    if (restaurantDetail !== null) {

      // Get foods from the restaurant
      axios
        .get(baseUrl + "foods/restaurant/" + restaurantDetail.id)
        .then((response) => {
          setFoods(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    }

  }, []);

    return (
    <Container>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Info" title="Info">
          <p>{ restaurantDetail.description }</p>
          <p>Telephone: { restaurantDetail.telephone } </p>
          <p>State: { restaurantDetail.state } </p>
          <p>City: { restaurantDetail.city } </p>
          <p>ZIP: { restaurantDetail.zip } </p>
        </Tab>
        <Tab eventKey="Menu" title="Menu">
          <p> {foods.length !== 0 ?
              foods.toString()
            : "This restaurant has no uploaded menu." } </p>
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