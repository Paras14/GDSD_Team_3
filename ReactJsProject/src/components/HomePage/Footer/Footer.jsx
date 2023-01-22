import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <div className="bg-primary p-2 mb-4  text-white">
      <Container>
        <div>
          <p className="text-center fs-4">
            &copy; CopyRight. <span className="fw-bold">Risto</span> All rights
            reserved.
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
