import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import RestaurantPhoto from "./RestaurantPhoto";

function RestaurantUpperDetail() {
  const navigate = useNavigate();
//   const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const restaurantDetail = [
    { name: "Restaurant 1", info: "The restaurant is located in the quiet streets of the historic old town of Fulda. A special experience: The cozy restaurant, in summer with a wonderful street terrace, friendly staff and delicious dishes from regional and Mediterranean cuisine.user1@gmail.com"}];
  return (
    <Container>
    <br></br>
      <Row>
        <RestaurantPhoto />
      </Row>
      <br></br>
      <Row>
        <Container>
          <Row>
            <Col>
              <h2>{restaurantDetail[0].name}</h2>
            </Col>
            <Col lg={6} md={6}></Col>
            <Col>
              <Button
              size="lg"
              className="text-center"
              onClick={() => {
                  navigate("/signIn");
              }}
              >
              Make a reservation
            </Button>
            </Col>
          </Row>
        </Container>
      </Row>
      <br></br>
    </Container>
  );
}

export default RestaurantUpperDetail;
