import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Global } from "../helpers/Global.js";
import Review from "./Reservations/Review.jsx";
import PendingReviews from "./Admin/PendingReviews.jsx";
import PendingReviewPost from "./Admin/PostReviews/PendingReviewPost.jsx";
import FoodDetails from "./HomePage/Reservation/FoodDetailsCard.jsx";

function RestaurantTabDetails({ restaurantDetail }) {
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
        defaultActiveKey="Info"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Info" title="Info">
          <p>{restaurantDetail.description}</p>
          <p>Telephone: {restaurantDetail.telephone} </p>
          <p>Address: {restaurantDetail.address} </p>
          <p>State: {restaurantDetail.state} </p>
          <p>City: {restaurantDetail.city} </p>
          <p>ZIP: {restaurantDetail.zip} </p>
        </Tab>
        <Tab eventKey="Menu" title="Menu">
          <p>
            {foods.length !== 0
              ? 
              foods.map((food) => (
                <FoodDetails
                  key={food.id}
                  name={food.name}
                  image={food.image}
                  ingredients={food.ingredients}
                  price={food.price}
                  displayInput={false}
                />
              ))
              : " This restaurant has no uploaded menu. "}
          </p>
        </Tab>
        <Tab eventKey="Review" title="Review">
          <Review />
        </Tab>
        <Tab eventKey="Parking" title="Parking">
          <p> This Restaurant has no Parking Facilities Section</p>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default RestaurantTabDetails;
