import React from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function PendingRestaurantReg() {
  const navigate = useNavigate();
  const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const pendingData = [
    { name: "Restaurent 1", email: "senoman.ali7383@gmail.com" },
    { name: "Restaurent 2", email: "paras@gmail.com" },
    { name: "Restaurent 3", email: "vachitar@gmail.com" },
    { name: "Restaurent 4", email: "hassan@gmail.com" },
    { name: "Restaurent 5", email: "louis@gmail.com" },
    { name: "Restaurent 6", email: "jesus@gmail.com" },
  ];
  return (
    <Container>
      <div>
        <p className="text-uppercase text-center m-4 p-2 fs-1">
          PENDING RESTAURANT REGISTRATIONS
        </p>
        <div>
          {pendingData.map((data) => {
            return (
              <div className="d-flex justify-content-between mb-2 p-3 m-2 bg-light rounded">
                <p className="fs-4 fw-bold">{data.name}</p>
                <p className="fs-4 fw-bold">{data.email}</p>
                <Button
                  onClick={() => {
                    navigate("/pendingRestaurentForm");
                  }}
                >
                  {arrow}
                </Button>
              </div>
            );
          })}
        </div>
        <div className="m-4 text-center">
          <Button
            onClick={() => {
              navigate("/adminPanel");
            }}
          >
            Back to Main Menu
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default PendingRestaurantReg;
