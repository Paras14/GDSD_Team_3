import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import RestaurantPhoto from "../../RestaurantPhoto";

function TableSelection() {
  const navigate = useNavigate();
//   const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const restaurantDetail = [
    { name: "Restaurant 1", info: "The restaurant is located in the quiet streets of the historic old town of Fulda. A special experience: The cozy restaurant, in summer with a wonderful street terrace, friendly staff and delicious dishes from regional and Mediterranean cuisine.user1@gmail.com",
    image: "https://media.istockphoto.com/id/1179449390/photo/3d-render-wooden-style-restaurant-cafe.jpg?b=1&s=612x612&w=0&k=20&c=pW8QGTAU93WYvnhMjX-jZw93fZvjkGUMNfPbBphKMFA="
  }];
  return (
    <Container>
    <br></br>
      <Row>
        <h2>Table Selection</h2>
        <RestaurantPhoto 
          restaurantDetail={restaurantDetail[0]}
        />
        <h4>{restaurantDetail[0].name}</h4>
      </Row>
      <br></br>
      <Row>
        <Container>
        Select a table:<br/>
        Note: If table is not available then checkbox is disabled for corresponding table.<br/>
        <Row>
          <Col className="col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">
              <label for="table-1" className="col-lg-3">Table 1:</label>
              <input type="checkbox" id="table-1" name="table-1" />
              </li>
              <li className="list-group-item">
              <label for="table-2" className="col-lg-3">Table 2:</label>
              <input type="checkbox" id="table-2" name="table-2" disabled />
              </li>
              <li className="list-group-item">
              <label for="table-3" className="col-lg-3">Table 3:</label>
              <input type="checkbox" id="table-3" name="table-3" />
              </li>
              <li className="list-group-item">
              <label for="table-4" className="col-lg-3">Table 4:</label>
              <input type="checkbox" id="table-4" name="table-4" />
              </li>
            </ul>
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
          Save Table
        </Button>
        </div>
      </Row>
      <br></br>
    </Container>
  );
}

export default TableSelection;
