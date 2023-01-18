import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import ListOfRestaurants from "./Admin/ListOfRestaurants";

function RestaurantUpperDetail() {
  const navigate = useNavigate();
//   const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const restaurantDetail = [
    { name: "Restaurant 1", info: "The restaurant is located in the quiet streets of the historic old town of Fulda. A special experience: The cozy restaurant, in summer with a wonderful street terrace, friendly staff and delicious dishes from regional and Mediterranean cuisine.user1@gmail.com" }];
  return (
    <Container>
      <div class=".restaurant-photo">
        <img href="https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"></img>
        <p>{restaurantDetail[0].name}</p>
        <p>{restaurantDetail[0].info}</p>
        <Button
        size="lg"
        className="text-center"
        onClick={() => {
            navigate("/signIn");
        }}
        >
        Make a reservation
        </Button>
      </div>
    </Container>
  );
}

export default RestaurantUpperDetail;
