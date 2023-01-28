import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ReviewCheckBox from "./ReviewCheckBox2";
import StarRating from "../starRatings";

// let quickService, deliciousFood, politeBehavior, valueForMoney;

function AddEditReview() {
  const [rating, setRating] = useState(0);
  return (
    <Container className="mt-4 mb-4">
      <div>
        <h1 className="text-uppercase fs-1 text-uppercase text-center"> Review/Edit Review</h1>
      </div>
      <div className="col-lg-10 mt-4">
        <div className="text-center mb-4 p-4">
            How many stars would you like to give?&emsp;
            <StarRating rating={rating} setRating = {setRating}/>
            <p>This is rating value: {rating}</p>
        </div>
        <div className="text-center">
            What drove your decision?
        </div>
        <ReviewCheckBox />
        <div className="text-center mt-4">
            Other <textarea id="comments" name="comments" cols={20}>
          </textarea>
        </div>
      </div>
    </Container>
  );
}

export default AddEditReview;
