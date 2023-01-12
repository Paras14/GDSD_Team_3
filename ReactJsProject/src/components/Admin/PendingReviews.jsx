import React from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function PendingReviews() {
  const navigate = useNavigate();
  const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const pendingData = [
    { reviewer: "example_customer1", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer2", restaurant: "example_restaurant2", time_of_post: "15.12.2022 10:04"},
    { reviewer: "example_customer3", restaurant: "example_restaurant3", time_of_post: "14.12.2022 9:04"},
    { reviewer: "example_customer4", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer5", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer6", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer7", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer8", restaurant: "example_restaurant4", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer9", restaurant: "example_restaurant4", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer10", restaurant: "example_restaurant2", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer11", restaurant: "example_restaurant2", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer12", restaurant: "example_restaurant2", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer13", restaurant: "example_restaurant2", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer14", restaurant: "example_restaurant2", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer15", restaurant: "example_restaurant3", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer16", restaurant: "example_restaurant3", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer17", restaurant: "example_restaurant3", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer18", restaurant: "example_restaurant3", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer19", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
    { reviewer: "example_customer20", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
  ];
  return (
    <Container>
      <div>
        <p className="text-uppercase text-center m-4 p-2 fs-1">
        PENDING REVIEW POSTS
        </p>
        <div style={{overflow:"scroll", maxHeight:"25rem"}}>
            {pendingData.map((data) => {
                return (
                <div className="d-flex justify-content-between mb-2 p-3 m-2 bg-light rounded">
                    <p className="fs-4 fw-bold">{data.reviewer}</p>
                    <p className="fs-4 fw-bold">{data.restaurant}</p>
                    <p className="fs-4 fw-bold">{data.time_of_post}</p>
                    <Button
                        onClick={() => {
                            navigate("/PendingReviewPost");
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

export default PendingReviews;
