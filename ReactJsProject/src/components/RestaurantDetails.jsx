import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Global } from "../helpers/Global.js";
import RestaurantUpperDetail from "./RestaurantUpperDetail.jsx";
import RestaurantTabDetails from "./RestaurantTabDetails.jsx";

function RestaurantDetails () {
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;
    const { restaurantId } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Restaurant Details`;

        axios
            .get(baseUrl + "restaurants/" + restaurantId)
            .then((response) => {
                setRestaurantDetail(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        restaurantDetail !== null
        ?
        <div>
            {console.log(restaurantDetail)}
            <RestaurantUpperDetail
                restaurantDetail={restaurantDetail}
            />
            <RestaurantTabDetails
                restaurantDetail={restaurantDetail}
            />
        </div>
        :
        <div></div>
    );

}

export default RestaurantDetails;