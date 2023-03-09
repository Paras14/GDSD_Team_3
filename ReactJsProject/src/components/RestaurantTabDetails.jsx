import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Global } from "../helpers/Global.js";
import Review from "./Reservations/Review.jsx";
import PendingReviews from "./Admin/PendingReviews.jsx";
import PendingReviewPost from "./Admin/PostReviews/PendingReviewPost.jsx";
import FoodDetails from "./HomePage/Reservation/FoodDetailsCard.jsx";

function RestaurantTabDetails({ restaurantDetail }) {
  const baseUrl = Global.baseUrl;
  const [foods, setFoods] = useState([]);
  const [user, setuser] = useState(null);
  const [parkingsNumber, setParkingsNumber] = useState(0);
  const [parkings, setParkings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (restaurantDetail !== null) {
      
      setuser(JSON.parse(localStorage.getItem("user")));
      // Get foods from the restaurant
      axios
        .get(baseUrl + "foods/restaurant/" + restaurantDetail.id)
        .then((response) => {
          setFoods(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    axios
    .get(baseUrl + "parkings/restaurant/" + restaurantDetail.id)
    .then((response) => {
      setParkings(response.data);
      setParkingsNumber(response.data.length);
      console.log("Number of Parkings", parkingsNumber);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [parkingsNumber])

  const getFreeParkings = () => {
    let freeParkings = [];
    console.log("parkings", parkings);
    parkings.forEach(parking => {
      if (!parking.status) {
        freeParkings.push(parking);
      }
    });
    return freeParkings;
  }

  const addParking = () => {
    axios
    .post(baseUrl + "parkings", {
      number: parkingsNumber + 1,
      restaurantId: restaurantDetail.id,
      status: false
    }, {params: {email: user.email}})
    .then((response) => {
      console.log("Parking added");
      setParkingsNumber(parkingsNumber + 1);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const deleteParking = () => {
    if (parkingsNumber > 0) {
      axios
      .delete(baseUrl + "parkings/" + parkings[parkingsNumber - 1].id, {params: {email: user.email}})
      .then((response) => {
        console.log("Parking deleted");
        setParkingsNumber(parkingsNumber - 1);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  
  return (
    <div className="container">
      <div class="card text-center">
        
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="information-tab" data-bs-toggle="tab" data-bs-target="#information-tab-pane" type="button" role="tab" aria-controls="information-tab-pane" aria-selected="true">Information</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="menu-tab" data-bs-toggle="tab" data-bs-target="#menu-tab-pane" type="button" role="tab" aria-controls="meun-tab-pane" aria-selected="false">Menu</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false">Reviews</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="parking-tab" data-bs-toggle="tab" data-bs-target="#parking-tab-pane" type="button" role="tab" aria-controls="parking-tab-pane" aria-selected="false">Parking</button>
            </li>
          </ul>
        </div>
        
        <div class="card-body">
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="information-tab-pane" role="tabpanel" aria-labelledby="information-tab" tabindex="0">
              <div className="row px-5 mx-5">

                <div className="col-md-4 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      Telephone
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.telephone}</li>
                    </ul>
                  </div>     
                </div>

                <div className="col-md-4 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      Address
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.address}</li>
                    </ul>
                  </div>     
                </div>

                <div className="col-md-4 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      State
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.state}</li>
                    </ul>
                  </div>     
                </div>

                <div className="col-md-4 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      City
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.city}</li>
                    </ul>
                  </div>     
                </div>

                <div className="col-md-4 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      ZIP
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.zip}</li>
                    </ul>
                  </div>     
                </div>

                <div className="col-md-12 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      Description
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.description}</li>
                    </ul>
                  </div>     
                </div>

              </div>
            </div>
            <div class="tab-pane fade" id="menu-tab-pane" role="tabpanel" aria-labelledby="menu-tab" tabindex="0">
              {
                user !== null &&
                user.rolId === 9?  
                <Button className="btn-primary m-1" 
                  onClick = {() => navigate("/createFood/" + restaurantDetail.id)}
                > Add Food</Button>
                : null
              }
              <p>
                {foods.length !== 0
                  ? 
                  foods.map((food) => (
                    <FoodDetails
                      key={food.id}
                      name={food.name}
                      image={food.image}
                      ingredients={food.ingredients}
                      price={food.price}
                      displayInput={false}
                    />
                  ))
                  :
                  <p className="text-center mt-4 fs-3"> This restaurant has no uploaded menu</p>
            }
              </p>
            </div>
            <div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="0">
              <Button
                className="btn-primary m-1"
                onClick={() => navigate("/AddReview/" + restaurantDetail.id)}
              > Add Review</Button>
              <Review 
                restaurantDetail={restaurantDetail}
              />
            </div>
            <div class="tab-pane fade" id="parking-tab-pane" role="tabpanel" aria-labelledby="parking-tab" tabindex="0">
              {user !== null && user.rolId === 9? //If the user is a restaurant owner, he can add parking facilities and remove them 
                <div className="row">
                  <div className="col-md-6">
                    <Button className="btn-primary m-1" onClick={addParking}>Add Parking Facility</Button>
                  </div>
                  <div className="col-md-6">
                    <Button className="btn-danger m-1" onClick={deleteParking}>Remove Parking Facility</Button>
                  </div>
                </div>

                : null
                
                }  
            
              <p className="text-center mt-4 fs-3">{parkings !== [] && parkingsNumber > 0?"This restaurant has "+parkingsNumber+" places in total. "+ getFreeParkings().length +" of them are free.":"This Restaurant has no Parking Facilities Section"}</p>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default RestaurantTabDetails;
