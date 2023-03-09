import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserType() {
  const navigate = useNavigate();
  return (
    <div className="container mt-4">
      <div className=" rounded shadow" style={{ backgroundColor: "#AED0FF" }}>
        <p className="py-2 fs-1 fw-bold text-center">
          Register as a costumer or as a restaurant
        </p>
      </div>

      <div class="d-flex justify-content-evenly">
        <Card className="m-2 shadow">
          <Card.Img
            variant="top"
            src="https://media.istockphoto.com/id/1356348368/photo/multiracial-friends-group-taking-selfie-portrait-outside-happy-multi-cultural-people-smiling.jpg?b=1&s=170667a&w=0&k=20&c=5t-v3ptbSMCymqn8O4oIs9uZrQskQGHzt_8AQBuwIx8="
            style={{ width: "auto", height: "400px" }}
          />
          <Card.Body>
            <Card.Title>Costumer</Card.Title>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/customerSignUp");
              }}
            >
              Register as a costumer
            </Button>
          </Card.Body>
        </Card>

        <Card className="m-2 shadow">
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80"
            style={{ width: "auto", height: "400px" }}
          />
          <Card.Body>
            <Card.Title>Restaurant</Card.Title>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/signUp");
              }}
            >
              Register as a restaurant
            </Button>
          </Card.Body>
        </Card>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default UserType;
