import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

function FoodDetails(props) {
  return (
    <Container className="border">
    <Row>
        <Col className="col-lg-3">
            <img src={props.image} alt="food_img" style={{maxWidth:"100px"}}></img>
        </Col>
        <Col className="col-lg-4">
            <b>{props.name}</b><br />
            <i>{props.ingredients}</i>
        </Col>
        <Col className="col-lg-2">
            <b>{props.price} €</b>
        </Col>

        <Col className="col-lg-3">
        <b>{props.quantity}</b>
        </Col>

        <Col className="col-lg-3">
        </Col>
        
    </Row>
    </Container>
  );
}

export default FoodDetails;
