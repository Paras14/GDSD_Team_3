import React from "react";

import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import RestaurantPhoto from "./RestaurantPhoto";
import { useEffect } from "react";
import { Global } from "../helpers/Global";
import axios from "axios";


function RestaurantUpperDetail({ restaurantDetail }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;
    useEffect(() => {
      console.log("Reached here");
      setUser(JSON.parse(localStorage.getItem("user")));
      console.log("Printing user");
      console.log(user);
    }, []);

  //   const arrow = <FontAwesomeIcon icon={faArrowRight} />;

  //const restaurantDetail = [
  //  { name: "Restaurant 1", info: "The restaurant is located in the quiet streets of the historic old town of Fulda. A special experience: The cozy restaurant, in summer with a wonderful street terrace, friendly staff and delicious dishes from regional and Mediterranean cuisine.user1@gmail.com"}];
  
  

  
  return (
    <div>
      <RestaurantPhoto restaurantDetail={restaurantDetail} />
      <div className="container">
        <div className="row">
          <div className="col-8 p-2"><p className="fs-2 fw-bold">{restaurantDetail.name}</p></div>
          <div className="col-4 p-2">
            <div className="d-flex flex-row-reverse">
            {
              user !== null && (user.rolId === 9 && user.id === restaurantDetail.userId)? 
              <button className="btn btn-primary btn-lg"
                onClick={() => {
                  navigate("/EditRestaurantDetails/" + restaurantDetail.id);
                }}>
                Edit Restaurant
              </button>
              
              : user !== null && user.rolId === 7 ?
                <div>
                  <button className="btn btn-primary btn-lg"
                    onClick={() => {
                      navigate("/EditRestaurantDetails/" + restaurantDetail.id);
                    }}>
                    Edit Restaurant
                  </button>

                  <button className="btn btn-outline-primary btn-lg mx-2"
                  onClick={() => {
                    // Ban Restaurant: delete restaurant
                    axios.delete(baseUrl + "restaurant/" + restaurantDetail.id)
                    .then((response) => {
                      console.log(response);
                      navigate("/adminPanel");
                    })
                    .catch((error) => {
                      console.log(error);
                    });

                  }}>
                  Ban Restaurant
                  </button>
                </div>
              : user !== null && user.rolId === 10 ?
                null
              :
              <div>
                <button className="btn btn-primary btn-lg"
              onClick={() => {
                navigate("/ReservationDetails/" + restaurantDetail.id);
              }}>
                Make a revervation
              </button>


              <button className="btn btn-outline-primary btn-lg mx-2"
              onClick={() => {
                navigate("/chat/" + restaurantDetail.userId);
              }}>
                Ask Manager
              </button>
              </div>
            }
              
            
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantUpperDetail;
