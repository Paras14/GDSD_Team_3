import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ListOfRestaurants() {
  const navigate = useNavigate();
//   const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const pendingData = [
    { name: "Restaurant 1", email: "Restaurant1@gmail.com" },
    { name: "Restaurant 2", email: "Restaurant2@gmail.com" },
    { name: "Restaurant 3", email: "Restaurant3@gmail.com" },
    { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
    { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
    { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
    { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
    { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
    { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
    { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
    { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
    { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
    { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
    { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
    { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
    { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
    { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
    { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
    { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
    { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
    { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
    { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
    { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
    { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
    { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
    { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
    { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
    { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
    { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
    { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
  ];
  return (
    <Container>
      <div>
        <p className="text-uppercase text-center m-4 p-2 fs-1">
          List of Restaurants
        </p>
        <div style={{overflow:"scroll", maxHeight:"25rem"}}>
            {pendingData.map((data) => {
                return (
                <div className="d-flex justify-content-between mb-2 p-3 m-2 bg-light rounded">
                    <p className="fs-4 fw-bold">{data.name}</p>
                    <p className="fs-4 fw-bold">{data.email}</p>
                    <Button
                    onClick={() => {
                        navigate("/");
                    }}
                    >
                    View Details
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

export default ListOfRestaurants;
