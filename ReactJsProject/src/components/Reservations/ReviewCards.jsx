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
    <Container className="border w-35">
    <Row>
        <Col className="col-lg-3 border border-primary mr-3 text-truncate">
            {props.userId}
        </Col>
        <Col className="col-lg-7 mb-4">
            {starPrinter(props.rating)}
            <div style={{fontWeight:"100",margin:"0.5rem"}}>
            {props.quickService?"Quick Service":""}
            &ensp;- {props.deliciousFood?"Delicious Food":""}
            &ensp;- {props.politeBehavior?"Polite Behavior":""}
            &ensp;- {props.valueForMoney?"Value For Money":""}
            </div>
            <div style={{fontStyle:"italic",margin:"1rem"}}>{props.comment}</div>
        </Col>
    </Row>
    </Container>
  );
}

export default ReviewCards;
