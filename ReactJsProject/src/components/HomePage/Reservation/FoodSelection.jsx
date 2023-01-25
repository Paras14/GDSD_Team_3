import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import RestaurantPhoto from "../../RestaurantPhoto";
import FoodDetails from "./FoodDetailsCard";
import dummyFoods from "./DummyFoodData";
import { useState } from "react";

function showFoodItems(foodItem) {
  return (
    <FoodDetails
      key={foodItem.id}
      name={foodItem.name}
      image={foodItem.image}
      ingredients={foodItem.ingredients}
      price={foodItem.price}
      displayInput={true}
    />
  );
}

function FoodSelection() {
  const navigate = useNavigate();
  //   const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const restaurantDetail = [
    {
      name: "Restaurant 1",
      info: "The restaurant is located in the quiet streets of the historic old town of Fulda. A special experience: The cozy restaurant, in summer with a wonderful street terrace, friendly staff and delicious dishes from regional and Mediterranean cuisine.user1@gmail.com",
      image:
        "https://media.istockphoto.com/id/1179449390/photo/3d-render-wooden-style-restaurant-cafe.jpg?b=1&s=612x612&w=0&k=20&c=pW8QGTAU93WYvnhMjX-jZw93fZvjkGUMNfPbBphKMFA=",
    },
  ];
  return (
    <Container>
      <br></br>
      <Row>
        <h2>Table Selection</h2>
        <RestaurantPhoto restaurantDetail={restaurantDetail[0]} />
        <h4>{restaurantDetail[0].name}</h4>
      </Row>
      <br></br>

      <Row>
        Select Food:
        <br />
        Note: If table is not available then checkbox is disabled for
        corresponding table.
        <br />
        <Row>{dummyFoods.map(showFoodItems)}</Row>
        <div className="col-lg-8 mt-2 mb-2">
          <textarea id="comments" name="comments" cols={80}>
            Additional Comments
          </textarea>
        </div>
        <div className="col-lg-2">
          <Button
            size="lg"
            className="text-center"
            // onClick={() => {
            //     navigate("/");
            // }}
          >
            Save Food
          </Button>
        </div>
      </Row>
      <br></br>
    </Container>
  );
}

export default FoodSelection;
