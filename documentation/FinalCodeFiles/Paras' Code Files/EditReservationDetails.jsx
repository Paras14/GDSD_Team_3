import React from "react";
import { useEffect, useState, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { BuildingUp } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Global } from "../../../helpers/Global.js";
import { isAuthorized } from "../../../helpers/isAuthorized.js";
import RestaurantPhoto from "../../RestaurantPhoto";
import FoodDetails from "./FoodDetailsCard";
import socket from "../../Chat/Socket.js";
import CloseButton from 'react-bootstrap/CloseButton';

function EditReservationDetails() {
  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const { reservationId } = useParams();
  const baseUrl = Global.baseUrl;
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [count, setCount] = useState("");
  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const [user, setUser] = useState(null);
  const [foods, setFoods] = useState([]);
  const [foodCounts, setFoodCounts] = useState([]);
  const [reservation, setReservation] = useState(null);
  const [parkings, setParkings] = useState([]);
  const [checkboxState, setCheckboxState] = useState([]);
  const [userSelectedParkings, setUserSelParking] = useState([]);
  const containerRef = useRef(null);
  const elementInfo = useRef({h: 0, w: 0});
  const containerInfo = useRef({h: 0, w: 0});
  const tableCount = useRef(0);
  const restaurantId = useRef(0);
  useEffect(() => {
    
    async function getUserReservationRestaurantAndFood() {

      //get Parkings selected for a reservation
        axios
        .get(baseUrl + 'reservations/' + reservationId + '/parkings')
        .then((res) => {
          const data = res.data;
          setUserSelParking(data.map((item) => item.parkingId))
          console.log("User Selected Parkings array: "+ userSelectedParkings);
        })

      //get Parkings for restaurant
        axios
      .get(baseUrl + "parkings/restaurant/" + restaurantId.current)
        .then((response) => {
          setParkings(response.data);
          let data = response.data;
          for(let i in data){
            data[i].oldStatus = data[i].status;
          }
          
          //set Parkings
          setParkings(data);

          //Set Checkbox states according to parking status of variou parking states
          console.log("Parkings data filtered: ", parkings);
          setCheckboxState(parkings.map(parking => parking.status));
          console.log("CheckboxStatuses : ", checkboxState);
        })
        .catch((error) => {
          console.log(error);
        });
        
    }

  }, [parkings.length]);

  const postDataHandle = (e) => {
    e.preventDefault();

    console.log("date", date);
    console.log("hour", hour);
    console.log("count", count);
    console.log("user", user);
    
    //set parking.status as per boolean values in checkboxState array
    const validParkings = parkings.map((parking,index) => {
      parking.status = checkboxState[index];
      return parking;
    });

    console.log(parkings);
    let parkingsToSend = [];
    for(let i in parkings){
      console.log(i);
      console.log(parkings[i]);
      //This is to just send value that are now changed from false to true
      if(parkings[i].oldStatus === false && parkings[i].status === true){
        parkingsToSend.push(parkings[i]);
      }
    }
    
    //Reversation object to be sent
    const reservation = {
      // id: reservationId,
      // date: date + " " + hour + ":00",
      // numberofplaces: count,
      // restaurantId: restaurantId.current,
      // userId: user.id,
      // table: tables,
      parking: parkingsToSend,
    };

//To put Parking Options on webpage
  const parkSel = (park, index) => {
  var userBool = true;
  if(userSelectedParkings.includes(park.id)){
    userBool = false;
  }
  return (
    <div className="form-check form-check-inline">
      <input type="checkbox" className="form-check-input" id={park.number} name={park.number} 
      disabled={park.status && userBool}
      checked={checkboxState[index]}
      onChange={event => handleCheckboxChange(index, event.target.checked)}
      />
      <label class="form-check-label" for={park.number}>{park.number}</label>
    </div>
  );
}
//To handle change of checkboxes for options
const handleCheckboxChange = (index, checked) => {
  setCheckboxState(prevState => {
    const newState = [...prevState];
    newState[index] = checked;
    console.log(newState);
    return newState;
  });
};


  return restaurantDetail !== null ? (
          <Row>
          <div>
            <label for="people_number" className="fw-bold">
              Parking:
            </label>
          </div>
          {console.log("Parkings :",parkings)}
            {parkings.length !== 0
            ? 
              parkings.map((park, index) => parkSel(park,index))
            :
            (
            <div>
                Currently there are no parking spaces available.
            </div>
          )}
          </Row>
  ) : (
    <div>Loading...</div>
  );
}}

export default EditReservationDetails;
