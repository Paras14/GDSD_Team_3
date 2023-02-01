import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function ManagerPanel() {
  const navigate = useNavigate();
  return (
    <Container>
      <div>
        <p className="fs-1 text-center p-3 m-4 text-capitalize fw-bold">
          Welcome Manager
        </p>
        <Row>
          <Button
            className="mb-3 text-capitalize fs-3"
            size="lg"
            onClick={() => {
              navigate("/guestReservationList");
            }}
          >
            View Guest Reservation List
          </Button>
          <Button
            className="mb-3 text-capitalize fs-3"
            size="lg"
            onClick={() => {
              navigate("/tableReservations");
            }}
          >
            View Table Reservations
          </Button>

          <Button
            className="mb-3 text-capitalize fs-3"
            size="lg"
            onClick={() => {
              const user = JSON.parse(localStorage.getItem("user"));
              navigate("/chat/"+user.id);
            }}
          >
            View messages
          </Button>
          <Button className="text-capitalize fs-3" size="lg"
          onClick={() => {
              navigate("/myRestaurant");
            }}
          >
            View your restaurant
          </Button>
        </Row>
      </div>
    </Container>
  );
}

export default ManagerPanel;
