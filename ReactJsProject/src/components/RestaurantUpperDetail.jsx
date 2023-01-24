import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Global } from "../helpers/Global.js";

import RestaurantPhoto from "./RestaurantPhoto";

function RestaurantUpperDetail({restaurantDetail}) {
  const navigate = useNavigate();
//   const arrow = <FontAwesomeIcon icon={faArrowRight} />;


//const restaurantDetail = [
  //  { name: "Restaurant 1", info: "The restaurant is located in the quiet streets of the historic old town of Fulda. A special experience: The cozy restaurant, in summer with a wonderful street terrace, friendly staff and delicious dishes from regional and Mediterranean cuisine.user1@gmail.com"}];
  return (
    <Container>
      {console.log("RestaurantUpperDetail: restaurantDetail: ", restaurantDetail)}
    <br></br>
      <Row>
        <RestaurantPhoto
          restaurantDetail={restaurantDetail}
        />
      </Row>
      <br></br>
      <Row>
        <Container>
          <Row>
            <Col>
              <h2>{restaurantDetail.name}</h2>
            </Col>
            <Col lg={4} md={3}></Col>
            <Col>
              <Button
              size="lg"
              className="text-center"
              onClick={() => {
                  navigate("/ReservationDetails");
              }}
              >
              Chat with the manager
              </Button>
            </Col>
            <Col>
              <Button
              size="lg"
              className="text-center"
              onClick={() => {
                  navigate("/ReservationDetails");
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
