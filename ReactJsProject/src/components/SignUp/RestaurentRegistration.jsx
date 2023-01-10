import React from "react";
import { Container, Card, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RestaurentRegistration() {
  const navigate = useNavigate();
  return (
    <Container className="mh-100">
      <Row className="d-flex justify-content-center justify-items-center">
        <Card body className="p-4 col-md-4 mt-4 ">
          <div className="fs-3">Success!</div> Once your restaurant is revised
          by our administrators you will be able to log in with the submitted
          information. .
        </Card>
      </Row>
      <Row className="d-flex justify-content-center justify-items-center mt-4">
        <Button
          className="col-md-4"
          onClick={() => {
            navigate("/");
          }}
        >
          Back To Home Page!!!
        </Button>
      </Row>
    </Container>
  );
}

export default RestaurentRegistration;
