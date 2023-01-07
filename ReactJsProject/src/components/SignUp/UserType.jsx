import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserType() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1 className="text-center my-4 py-4">
        Want to become a Customer or Manager!!
      </h1>
      <div className="d-flex justify-content-center justify-items-center flex-column text-center">
        <div className="my-4">
          <p className="fs-4">Register Yourself as Customer?</p>
          <Button
            onClick={() => {
              navigate("/customerSignUp");
            }}
          >
            Register
          </Button>
        </div>

        <div>
          <p className="fs-4">Register Yourself as Manager?</p>
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
