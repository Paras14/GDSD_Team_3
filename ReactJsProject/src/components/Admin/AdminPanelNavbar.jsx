import React from "react";
import { Container } from "react-bootstrap";
import Logo from "./../HomePage/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function AdminPanelNavbar() {
  const element = <FontAwesomeIcon icon={faUser} />;
  return (
    <div className=" bg-primary ">
      <Container>
        <div className="d-flex justify-content-between ">
          <div>
            <Logo fill="white" />
          </div>

          <div className="align-self-center">
            <p className="text-light fs-3">Admin Panel</p>
          </div>
          <div className="align-self-center d-flex text-light">
            <p className="fs-4"> {element}</p>
            <p className="ms-2 fs-4">Administrator</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AdminPanelNavbar;
