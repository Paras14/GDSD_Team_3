import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { BuildingUp } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import RestaurantPhoto from "../../RestaurantPhoto";

function ReservationDetails() {
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
      <Row>
        <h2 className="text-center p-4 fw-bold text-uppercase text-danger">
          Reservation Page
        </h2>
        <RestaurantPhoto restaurantDetail={restaurantDetail[0]} />
        <h4>{restaurantDetail[0].name}</h4>
      </Row>
      <Row>
        <Container>
          <Row>
            <Col className="col-lg-4">
              <label for="reservation-date">Date and Hour:</label>
              <br />
              <input
                type="date"
                id="reservation-date"
                name="reservation-date"
                required
              />
            </Col>
            <Col className="col-lg-4">
              <div>
                <label for="appt">Choose a time for your Reservation:</label>
              </div>
              <input
                type="time"
                id="appt"
                name="appt"
                min="09:00"
                max="21:00"
                required
              />
            </Col>
            <Col className="col-lg-4">
              <div>
                <label for="people_number">Number of People:</label>
              </div>

              <input
                type="text"
                id="people_number"
                name="people_number"
                required
              />
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col className="col-lg-4">
              <Button
                size="lg"
                className="text-center"
                onClick={() => {
                  navigate("/TableSelection");
                }}
              >
                Select table
              </Button>
            </Col>
            <Col className="col-lg-4">
              <Button
                size="lg"
                className="text-center"
                onClick={() => {
                  navigate("/FoodSelection");
                }}
              >
                Select Food
              </Button>
            </Col>
            <Col className="col-lg-4">
              <Button
                size="lg"
                className="text-center"
                onClick={() => {
                  navigate("/ParkingSelection");
                }}
              >
                Parking
              </Button>
            </Col>
          </Row>
          <Row className="mt-4 text-center w-full m-2">
            <Button size="lg" variant="danger">
              Book Now
            </Button>
          </Row>
        </Container>
      </Row>
      <br></br>
    </Container>
  );
}

export default ReservationDetails;
