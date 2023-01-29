import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ReviewCheckBox from "./ReviewCheckBox2";
import StarRating from "../starRatings";

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
  }
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
        <ReviewCheckBox quickService={quickService} setQuickService={setQuickService} 
        deliciousFood={deliciousFood} setDeliciousFood={setDeliciousFood}
        politeBehavior={politeBehavior} setPoliteBehavior={setPoliteBehavior}
        valueForMoney={valueForMoney} setValueForMoney={setValueForMoney}
        other = {other} setOther={setOther}
        />
        <button 
        onClick={
          handleFinish
        }
        >Submit</button>
      </div>
    </Container>
  );
}

export default AddEditReview;
