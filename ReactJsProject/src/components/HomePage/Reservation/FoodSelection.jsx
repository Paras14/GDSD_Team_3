import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import RestaurantPhoto from "../../RestaurantPhoto";
import FoodDetails from "./FoodDetailsCard";
import dummyFoods from "./DummyFoodData";

function showFoodItems(foodItem){
    return <FoodDetails
    key={foodItem.foodId}
    foodName={foodItem.foodName}
    imgURL={foodItem.imgURL}
    ingredients={foodItem.ingredients}
    />;
}

function FoodSelection() {
  const navigate = useNavigate();
//   const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const restaurantDetail = [
    { name: "Restaurant 1", info: "The restaurant is located in the quiet streets of the historic old town of Fulda. A special experience: The cozy restaurant, in summer with a wonderful street terrace, friendly staff and delicious dishes from regional and Mediterranean cuisine.user1@gmail.com"}];
  return (
    <Container>
    <br></br>
      <Row>
        <h2>Table Selection</h2>
        <RestaurantPhoto />
        <h4>{restaurantDetail[0].name}</h4>
      </Row>
      <br></br>
      <Row>
        <Container>
        Select Food:<br/>
        Note: If table is not available then checkbox is disabled for corresponding table.<br/>
        <Row>
          {dummyFoods.map(showFoodItems)}
          
        </Row>
        </Container>
        <div className="col-lg-8"></div>
        <div className="col-lg-2">
        <Button
          size="lg"
          className="text-center"
          onClick={() => {
              navigate("/");
          }}
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
