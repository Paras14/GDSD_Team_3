import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserType() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1 className="text-center my-4 py-4">
        Want to become a Customer or Restaurent!!
      </h1>
      <div className="d-flex justify-content-center justify-items-center flex-column text-center">
        <div className="my-4">
          <p className="fs-4 text-center">Register Yourself as Customer?</p>
          <Button
            onClick={() => {
              navigate("/customerSignUp");
            }}
          >
            Register
          </Button>
        </div>
        <p className="text-uppercase fs-1 text-info fst-italic text-center">or</p>
        <div>
          <p className="fs-4 text-center">Register Yourself as Restaurent?</p>
          <Button
            onClick={() => {
              navigate("/signUp");
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default UserType;
