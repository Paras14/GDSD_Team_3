import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();
  return (
    <Container>
      <div>
        <p className="fs-1 text-center p-3 m-4 text-capitalize fw-bold">
          Welcome Administrator
        </p>
        <Row>
          <Button
            className="mb-3 text-capitalize fs-3"
            size="lg"
            onClick={() => {
              navigate("/pendingRestaurentRegistration");
            }}
          >
            View Pending restaurant registration
          </Button>
<<<<<<< HEAD
          <Button
            className="mb-3 text-capitalize fs-3"
            size="lg"
            onClick={() => {
              navigate("/pendingReviewPost");
=======
          <Button className="mb-3 text-capitalize fs-3" size="lg"
          onClick={() => {
              navigate("/PendingReviews");
>>>>>>> 647e63829508fa954d80b6bb71b3e9530b783b15
            }}
          >
            View pending review posts
          </Button>

          <Button
            className="mb-3 text-capitalize fs-3"
            size="lg"
            onClick={() => {
              navigate("/ListOfUsers");
            }}
          >
            View list of users
          </Button>
          <Button className="text-capitalize fs-3" size="lg">
            View list of restaurants
          </Button>
        </Row>
      </div>
    </Container>
  );
}

export default AdminPanel;
