import React from "react";
import { Container } from "react-bootstrap";
import { StarFill, StarHalf } from "react-bootstrap-icons";
import ReviewCheckBox from "./ReviewCheckBox2";
import ReviewCards from "./ReviewCards";
import { useEffect, useState } from "react";
import axios from "axios";
import { Global } from "../../helpers/Global.js";


/*const reviews = [{
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
*/

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

function Review({restaurantDetail}) {

  const [reviews, setReviews] = useState([]);
  const baseUrl = Global.baseUrl;

  useEffect(() => {
    
    axios
      .get(baseUrl + "reviews/restaurant/" + restaurantDetail.id)
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <Container className="mt-4 mb-4">
      <div>
        <h1 className="text-uppercase fs-1 text-uppercase text-center"> reviews</h1>
      </div>
      <div className="col-lg-10">
      { reviews.length > 0
      ?
      reviews.map(showReviews)
      :
      <p className="fs-3 text-center pt-2">No reviews for this restaurant yet</p>}
      </div>
    </Container>
  );
}

export default Review;
