import React from "react";
import { Container } from "react-bootstrap";
import { StarFill, StarHalf } from "react-bootstrap-icons";
import { Form } from "react-router-dom";
import ReviewCheckBox from "./ReviewCheckBox";

function PendingReviewPost() {
  return (
    <Container className="text-center mt-4">
      <div>
        <h1 className="text-uppercase fs-1">pending review post</h1>
      </div>
      <div className="fs-3 text-warning">
        <StarFill />
        <StarFill />
        <StarFill />
        <StarFill />
        <StarHalf />
      </div>

      <div className="mt-4">
        <p className="fw-bold">
          Post by example_customer to example_restaurant: 16.12.2022 11:04
        </p>

        <form className="text-center">
          <label className="mx-4 fw-bold">Customer Email</label>
          <input type="email" placeholder="customer@gmail.com" disabled />
        </form>
      </div>

      <div>
        <ReviewCheckBox />
      </div>
    </Container>
  );
}

export default PendingReviewPost;
