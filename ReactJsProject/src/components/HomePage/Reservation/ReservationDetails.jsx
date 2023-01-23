import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import RestaurantPhoto from "../../RestaurantPhoto";

function ReservationDetails() {
  const navigate = useNavigate();
//   const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  //const restaurantDetail = [
    //{ name: "Restaurant 1", info: "The restaurant is located in the quiet streets of the historic old town of Fulda. A special experience: The cozy restaurant, in summer with a wonderful street terrace, friendly staff and delicious dishes from regional and Mediterranean cuisine.user1@gmail.com"}];
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
            <Col className="col-lg-4">
            <label for="reservation-date">Date and Hour:</label>
            <input type="date" id="reservation-date" name="reservation-date" required />
            </Col>
            <Col className="col-lg-3">
            <label for="appt">Choose a time for your Reservation:</label>
            <input type="time" id="appt" name="appt" min="09:00" max="21:00" required />
            </Col>
            <Col className="col-lg-3">
              <label for="people_number">Number of People:</label>
              <input type="text" id="people_number" name="people_number" required />
            </Col>
          </Row>
        </Container>
      </Row>
      <br></br>
    </Container>
  );
}

export default ReservationDetails;
