import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import ReviewCheckBox from "./ReviewCheckBox2";
import StarRating from "../starRatings";
import axios from "axios";

// let quickService, deliciousFood, politeBehavior, valueForMoney;

function AddEditReview() {
  const [rating, setRating] = useState(0);
  // const [review, setReview] = useState({
  //   userTd: 1,
  //   restaurantId: 2,
  //   rating: 0,
  //   quickService: "",
  //   deliciousFood: "",
  //   politeBehavior: "",
  //   valueForMoney: "",
  //   comment: "",
  // });

  // const handlePost = () => {
  //   const url = "https://jsonplaceholder.typicode.com/todos/1/post";
  //   axios
  //     .post(url, user)
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  return (
    <Container className="mt-4 mb-4">
      <div>
        <h1 className="text-uppercase fs-1 text-uppercase text-center">
          {" "}
          Review/Edit Review
        </h1>
      </div>
      <div className="col-lg-12 mt-4">
        <div className="text-center mb-4 p-4">
          How many stars would you like to give?&emsp;
          <StarRating rating={rating} setRating={setRating} />
          <p className="text-center">This is rating value: {rating}</p>
        </div>
        <div className="text-center">What drove your decision?</div>
        <ReviewCheckBox />
        <div className="text-center mt-4">
          Other <textarea id="comments" name="comments" cols={20}></textarea>
        </div>

        <div className="m-4 text-center p-4">
          <div as={Col} md="4">
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AddEditReview;
