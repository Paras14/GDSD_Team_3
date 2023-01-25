import React from "react";
import { Container } from "react-bootstrap";
import { StarFill, StarHalf } from "react-bootstrap-icons";
import ReviewCheckBox from "./ReviewCheckBox2";
import ReviewCards from "./ReviewCards";

const responseObjReview = [{
    reviewId:1,
    userId: "Customer_1",
    restaurantId: "Restaurant_1",
    rating: 5,
    quickService: true,
    deliciousFood: true,
    politeBehavior: true,
    valueForMoney: true,
    comment: "Exquisite Dining Experience"
},
{
  reviewId:1,
  userId: "Customer_2",
  restaurantId: "Restaurant_1",
  rating: 4,
  quickService: false,
  deliciousFood: true,
  politeBehavior: true,
  valueForMoney: false,
  comment: "Nice"
}];

function showReviews(review){
  return (
    <ReviewCards
    key = {review.reviewId}
    userId = {review.userId}
    rating = {review.rating}
    quickService = {review.quickService}
    deliciousFood = {review.deliciousFood}
    politeBehavior = {review.politeBehavior}
    valueForMoney = {review.valueForMoney}
    comment = {review.comment}
  />
  );
}

function Review() {
  return (
    <Container className="mt-4 mb-4">
      <div>
        <h1 className="text-uppercase fs-1 text-uppercase text-center"> review</h1>
      </div>
      <div className="col-lg-10">
      {responseObjReview.map(showReviews)}
      </div>
    </Container>
  );
}

export default Review;
