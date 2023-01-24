import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <div className="bg-primary p-2 mb-4  text-white">
      <Container>
        <div>
          <p className="text-center fs-4">
            &copy; <span className="fw-bold">Risto.</span> Fulda University of Applied Sciences Software Engineering Project, Fall 2022 For Demonstration Only
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
