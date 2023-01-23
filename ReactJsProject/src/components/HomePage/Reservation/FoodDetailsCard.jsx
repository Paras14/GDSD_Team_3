import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

function FoodDetails(props) {
  return (
    <Container className="border">
    <Row>
        <Col className="col-lg-3">
            <img src={props.imgURL} alt="food_img" style={{maxWidth:"100px"}}></img>
        </Col>
        <Col className="col-lg-4">
            <b>{props.foodName}</b><br />
            <i>{props.ingredients}</i>
        </Col>
        <Col className="col-lg-3">
        <input type="number" id="food-quantity" name="food-quantity" step="1"/>
        </Col>
    </Row>
    </Container>
  );
}

export default FoodDetails;
