import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import RestaurantPhoto from "../../RestaurantPhoto";

function ParkingSelection() {
  const navigate = useNavigate();
//   const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const restaurantDetail = [
    { name: "Restaurant 1", info: "The restaurant is located in the quiet streets of the historic old town of Fulda. A special experience: The cozy restaurant, in summer with a wonderful street terrace, friendly staff and delicious dishes from regional and Mediterranean cuisine.user1@gmail.com"}];
  return (
    <Container>
    <br></br>
      <Row>
        <h2>Parking Selection</h2>
        <RestaurantPhoto />
        <h4>{restaurantDetail[0].name}</h4>
      </Row>
      <br></br>
      <Row>
        <Container>
        Parking places required:<br/>
        <Row>
          <Col className="col-lg-6">
          <input type="text" id="parking-places" name="parking-places" />
          </Col>
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
          Save Parking
        </Button>
        </div>
      </Row>
      <br></br>
    </Container>
  );
}

export default ParkingSelection;
