import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import ReviewCheckBox from "./ReviewCheckBox2";
import StarRating from "../starRatings";
import axios from "axios";
import { Global } from '../../helpers/Global.js';

function AddEditReview() {
  const [rating, setRating] = useState(0);
  const [quickService, setQuickService] = useState(false);
  const [deliciousFood, setDeliciousFood] = useState(false);
  const [politeBehavior, setPoliteBehavior] = useState(false);
  const [valueForMoney, setValueForMoney] = useState(false);
  const [other, setOther] = useState('');
  const handleFinish = (e) => {
    e.preventDefault();
    console.log(quickService);
    console.log(deliciousFood);
    console.log(politeBehavior);
    console.log(valueForMoney);
    console.log(other);
    console.log(rating);

    const userId = 1;
    const restaurantId = 2;

  // const review = {
  //   userTd: 1,
  //   restaurantId: 2,
  //   rating: rating,
  //   quickService: quickService,
  //   deliciousFood: deliciousFood,
  //   politeBehavior: politeBehavior,
  //   valueForMoney: valueForMoney,
  //   comment: other
  // };

  const url = Global.baseUrl + "reviews?userId=" + userId + "&restaurantId=" + restaurantId+
  "&rating="+rating+"&quickService="+quickService+"&deliciousFood="+deliciousFood+"&politeBehavior="+
  politeBehavior+"&valueForMoney="+valueForMoney+"&comment="+other;
    axios
      .post(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


}

  // const handlePost = () => {
  //   const url =   ;
  //   axios
  //     .post(url, review)
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
        <ReviewCheckBox quickService={quickService} setQuickService={setQuickService} 
        deliciousFood={deliciousFood} setDeliciousFood={setDeliciousFood}
        politeBehavior={politeBehavior} setPoliteBehavior={setPoliteBehavior}
        valueForMoney={valueForMoney} setValueForMoney={setValueForMoney}
        other = {other} setOther={setOther}
        />
        <div className="m-4 text-center p-4">
          <div as={Col} md="4">
            <Button
            onClick={
              handleFinish
            }
            >Submit</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AddEditReview;
