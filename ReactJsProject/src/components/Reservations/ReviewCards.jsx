import React from "react";
import { Button, Container, Row, Col} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Global } from "../helpers/Global.js";

function starPrinter(rate){
  let stars = "";
  for(let i = 1; i<=rate; i++){
    stars = stars + "⭐";
  }
  return stars;
}

function ReviewCards(props) {
    // const baseUrl = Global.baseUrl;
    // const [review, setReview] = useState([]);

    // useEffect(() => {
    // if (restaurantDetail !== null) {
    //     // Get foods from the restaurant
    //     axios
    //     .get(baseUrl + "reviews/" + reviewId)
    //     .then((response) => {
    //         setReview(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }
    // }, []);
  return (
    <div>
      <div class="card shadow">
        <div class="card-header fw-bold" style={{ backgroundColor: "#AED0FF" }}>
          User: {props.userId}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{starPrinter(props.rating)}</li>
          <li class="list-group-item">
            <div className="row">
              <div className="col-3">{props.quickService?
              <button type="button" class="btn btn-success">Quick Service</button>
              :
              <button type="button" class="btn btn-danger">Quick Service</button>
              }</div>


              <div className="col-3">{props.deliciousFood?
              <button type="button" class="btn btn-success">Delicious Food</button>
              :
              <button type="button" class="btn btn-danger">Delicious Food</button>
              }</div>


              <div className="col-3">{props.politeBehavior?
                <button type="button" class="btn btn-success">Polite Behavior</button>
                :
                <button type="button" class="btn btn-danger">Polite Behavior</button>
              }</div>


              <div className="col-3">{props.valueForMoney?
                <button type="button" class="btn btn-success">Value For Money</button>
                :
                <button type="button" class="btn btn-danger">Value For Money</button>
              }</div>  


            </div>
          </li>
          <li class="list-group-item">
            <p className="mx-5 my-3 fs-5 text-center">{props.comment}</p>
          </li>
        </ul>
      </div>
    </div>
    
  );
}

export default ReviewCards;
