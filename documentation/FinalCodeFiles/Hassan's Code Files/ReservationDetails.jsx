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

function ReservationDetails() {
  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const baseUrl = Global.baseUrl;
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [count, setCount] = useState("");
  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const [user, setUser] = useState(null);
  const [foods, setFoods] = useState([]);
  const [foodCounts, setFoodCounts] = useState([]);
  const [parkings, setParkings] = useState([]);
  // const initialParkings = useRef([]);
  const [checkboxState, setCheckboxState] = useState([]);
  const containerRef = useRef(null);
  const elementInfo = useRef({h: 0, w: 0});
  const containerInfo = useRef({h: 0, w: 0});
  const tableCount = useRef(0);
  
  // const [parkingsOg, setParkingsOg] = useState([]);

  useEffect(() => {
    if (!isauthorized) {
      navigate("/signIn");
    } else {
      getUserRestaurantAndFood();
    }
    async function getUserRestaurantAndFood() {
      // Update the document title using the browser API
      document.title = `Reservation Details`;

      // get user from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      console.log(user);

      // get restaurant details
      const restaurant = await axios.get(
        `${baseUrl}restaurants/${restaurantId}`
      );
      setRestaurantDetail(restaurant.data);

      // get food details
      const foods = await axios.get(
        `${baseUrl}foods/restaurant/${restaurantId}`
      );
      console.log(foods.data);
      setFoods(foods.data);
      setFoodCounts(foods.data.map((food) => 0));

      axios
      .get(baseUrl + "parkings/restaurant/" + restaurantId)
        .then((response) => {
          setParkings(response.data);
          let data = response.data;
          for(let i in data){
            data[i].oldStatus = data[i].status;
          }
          // initialParkings.current = data;
          // console.log(initialParkings.current);
          setParkings(data);
          // parkings = parkings.filter((parking) => parking.status != true);
          // setParkings(response.data);
          console.log("Parkings data filtered: ", parkings);
          setCheckboxState(parkings.map(parking => parking.status));
          console.log("CheckboxStatuses : ", checkboxState);


          // axios.get(baseUrl + 'restaurantMap/' + restaurantId)
          //     .then(response => {
          //         console.log(response.data);
                  
          //         updateElements(response.data);
                  
          //     })
          //     .catch(error => {
          //         console.log(error);
          //     }
          // );
        })
        .catch((error) => {
          console.log(error);
        });

        socket.on('updateTables', async() => {
          if(document.getElementById('closeMapButton').style.display!=='none')
            createMap();
        });
      }
  }, [parkings.length]);

  async function createMap(){
    axios.get(baseUrl + 'restaurantMap/' + restaurantId)
      .then(response => {
          console.log(response.data);
          
          updateElements(response.data);
          
      })
      .catch(error => {
          console.log(error);
      }
    );
  }

  function updateElements(elements){
    tableCount.current = 0;
    document.getElementById("tablesContainer").innerHTML = "";
    document.getElementById("tablesContainer").style.display = "block";
    containerInfo.current = {w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight};
    for(let i=0; i<elements.length; i++){
        // updateDimensions(parseFloat(elements[i].viewHeight)/parseFloat(elements[i].height), parseFloat(elements[i].viewWidth)/parseFloat(elements[i].width));
        const elementHeight = (parseFloat(elements[i].height)/parseFloat(elements[i].viewHeight))*100;
        const elementWidth = (parseFloat(elements[i].width)/parseFloat(elements[i].viewWidth))*100;
        elementInfo.current.h = elementHeight + "%";
        elementInfo.current.w = elementWidth + "%";
        const xRatio = parseFloat(elements[i].x)/parseFloat(elements[i].viewWidth);
        const yRatio = parseFloat(elements[i].y)/parseFloat(elements[i].viewHeight);
        // const widthRatio = parseFloat(containerInfo.current.w)/parseFloat(elements[i].viewWidth);
        // const heightRatio = parseFloat(containerInfo.current.h)/parseFloat(elements[i].viewHeight);
        console.log(containerInfo.current.h, elements[i].viewHeight, yRatio);
        addElement(elements[i].id, elements[i].elementType, xRatio, yRatio, elements[i].tableId, elements[i].status);
    }
  }

  
  function addElement(id, type, x, y, tableId, status){
    const element = document.createElement("button");
    element.id = id;
    element.style.position = "absolute";
    element.style.left = (x*100) + "%";
    element.style.top = (y*100) + "%";
    element.style.height = elementInfo.current.h;
    element.style.width = elementInfo.current.w;
    const color = type==="Table"?"burlywood":type==="Window"?"cornflowerblue":"lightslategray";
    element.style.backgroundColor = color;
    element.style.color = "white";
    element.style.border = "1px solid black";
    element.style.borderRadius = "5px";
    element.style.zIndex = "1";
    
    console.log(type);
    element.innerHTML = type + " " + (type==="Table"?++tableCount.current:"");
    document.getElementById("tablesContainer").appendChild(element);
    if(type==="Table"){
      element.setAttribute("tableId", tableId);
      if(status){
        element.style.backgroundColor = "red";
        element.style.opacity = "0.3";
        element.disabled = true;
      }
      else
        document.getElementById(id).addEventListener("click", (event) => {
          if(event.target.style.opacity === "0.5"){
            element.style.backgroundColor = "burlywood";
            event.target.style.opacity = "1";
          }
            
          else{
            element.style.backgroundColor = "green";
            event.target.style.opacity = "0.5";
          }    
        });
    }
  }

  function showFoodItems(foodItem) {
    return (
      <FoodDetails
        key={foodItem.id}
        name={foodItem.name}
        image={foodItem.image}
        ingredients={foodItem.ingredients}
        price={foodItem.price}
        displayInput={true}
        count={foodCounts[foods.indexOf(foodItem)]}
        setCount={(count) => {
          const newFoodCounts = [...foodCounts];
          newFoodCounts[foods.indexOf(foodItem)] = count;
          setFoodCounts(newFoodCounts);
        }}
      />
    );
  }

  const postDataHandle = (e) => {
    e.preventDefault();

    console.log("date", date);
    console.log("hour", hour);
    console.log("count", count);
    console.log("restaurantId", restaurantId);
    console.log("user", user);
    parkings.map((parking,index) => {
      parking.status = checkboxState[index];
      return parking;
    });
    // console.log("initial Parkings: " + JSON.stringify(initialParkings.current));
    // console.log("parkings: " + JSON.stringify(parkings));
    console.log(parkings);
    let parkingsToSend = [];
    for(let i in parkings){
      console.log(i);
      console.log(parkings[i]);
      if(parkings[i].oldStatus === false && parkings[i].status === true){
        parkingsToSend.push(parkings[i]);
      }
    }

    // const finalParking = validParkings.filter(parking => parking.status==true).map(parking => {
    //   return {"id": parking.id, "number": parking.number, "restaurantId": parking.restaurantId}
    // });

    // console.log("ParkingsToSend :", parkingsToSend);
    // return;

    let tables = [];
    const buttons = document.getElementById("tablesContainer").getElementsByTagName("button");
    for(let i=0; i<buttons.length; i++){
      if(buttons[i].style.backgroundColor === "green"){
        tables.push({id: parseInt(buttons[i].attributes.tableId.value), number: parseInt(buttons[i].innerHTML.split(" ")[1]), restaurantId: parseInt(restaurantId)});
      }
    }
    console.log(tables);
    const reservation = {
      date: date + " " + hour + ":00",
      numberofplaces: count,
      restaurantId: restaurantId,
      userId: user.id,
      table: tables,
      parking: parkingsToSend,
    };

    axios
      .post(`${baseUrl}reservations/`, reservation)
      .then((res) => {
        console.log(res);
        socket.emit('tablesUpdated', {});
        // if there is food in the restaurant
        if (foods.length > 0) {
          // We need to create a list of orders for the foods of the reservation that have a count > 0
          const list = foods
            .filter((food) => foodCounts[foods.indexOf(food)] > 0)
            .map((food) => ({
              foodId: food.id,
              quantity: foodCounts[foods.indexOf(food)],
            }));

          const orders = {
            id: res.data.reservation.id,
            list: list,
          };

          console.log("orders: ", orders);

          // We create the orders
          axios
            .post(`${baseUrl}reservations/order/add`, orders)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        }

        navigate("/reservations");
      })
      .catch((err) => console.log(err));
  };

  //   const arrow = <FontAwesomeIcon icon={faArrowRight} />;

  /*  const restaurantDetail = [
    {
      name: "Restaurant 1",
      info: "The restaurant is located in the quiet streets of the historic old town of Fulda. A special experience: The cozy restaurant, in summer with a wonderful street terrace, friendly staff and delicious dishes from regional and Mediterranean cuisine.user1@gmail.com",
      image:
        "https://media.istockphoto.com/id/1179449390/photo/3d-render-wooden-style-restaurant-cafe.jpg?b=1&s=612x612&w=0&k=20&c=pW8QGTAU93WYvnhMjX-jZw93fZvjkGUMNfPbBphKMFA=",
    },
  ];
*/

const parkSel = (park, index) => {
  return (
    <div className="form-check form-check-inline">
      <input type="checkbox" className="form-check-input" id={park.number} name={park.number} 
      disabled={park.status} 
      checked={checkboxState[index]}
      onChange={event => handleCheckboxChange(index, event.target.checked)}
      />
      <label class="form-check-label" for={park.number}>{park.number}</label>
    </div>
  );
}

const handleCheckboxChange = (index, checked) => {
  setCheckboxState(prevState => {
    const newState = [...prevState];
    newState[index] = checked;
    console.log(newState);
    return newState;
  });
};

  return restaurantDetail !== null ? (
    <div>
      <div>
      <CloseButton id="closeMapButton" style={{position:"absolute", zIndex:"200",
              border: "1px solid black", borderWidth: "thin", display:"none"}}
              onClick={(event) => {
                const container = document.getElementById("tablesContainer");
                container.style.display = "none";
                event.target.style.display = "none";
              }} />
        
        <div ref={containerRef} id="tablesContainer" className="h-75 w-100" style={{display: "none", zIndex:"100", 
        position:"absolute", border: "1px solid black", borderWidth: "thin", backgroundColor: "white", borderRadius:"0.1rem"}}>
            
        </div>
      </div>
      
    
    <Container>
      
      <Row>
        <h2 className="text-center p-4 fw-bold text-uppercase text-danger">
          {restaurantDetail.name}
        </h2>
        <RestaurantPhoto restaurantDetail={restaurantDetail} />
      </Row>
      <Row>
        <Container>
          <Row className="p-4">
            <Col className="col-lg-4">
              <label for="reservation-date" className="fw-bold text-center">
                Date:
              </label>
              <br />
              <input
                class="form-control"
                type="date"
                id="reservation-date"
                name="reservation-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Col>
            <Col className="col-lg-4 ">
              <div>
                <label for="appt" className="fw-bold">
                  Time:
                </label>
              </div>
              <input
                class="form-control"
                type="time"
                id="appt"
                name="appt"
                min="09:00"
                max="21:00"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                required
              />
            </Col>
            <Col className="col-lg-4">
              <div>
                <label for="people_number" className="fw-bold">
                  Number of People:
                </label>
              </div>

              <input
                class="form-control"
                type="text"
                id="people_number"
                name="people_number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                required
              />
            </Col>
          </Row>
          {/* Parking spots already reserved will not be displayed */}
          <Row>
            <div className="col-lg-6">
              <label for="people_number" className="fw-bold">
                Parking:
              </label>
            </div>
              {parkings.length !== 0
              ? 
                parkings.map((park, index) => parkSel(park,index))
              :
              (
              <div>
                  Currently there are no parking spaces available.
              </div>
            )}
            <div className="col-lg-2">
                <Button
                onClick={() => {
                  const container = document.getElementById("tablesContainer");
                  container.style.display = "block";
                  document.getElementById('closeMapButton').style.display = "block";
                  container.innterHTML = "Creating map...";
                  createMap();
                }}
                >
                  Select Tables
                </Button>
            </div>
          </Row>
          <hr></hr>

          {foods.length > 0 ? (
            <Row>
              <label for="select_food" className="fw-bold">
                Select Food:
              </label>
              <br />
              <br />
              <Row>{foods.map(showFoodItems)}</Row>
              <div className="col-lg-8 mt-2 mb-2">
                <textarea
                  id="comments"
                  name="comments"
                  cols={80}
                  placeholder="Additional Comments"
                ></textarea>
              </div>
              <div className="col-lg-2"></div>
            </Row>
          ) : (
            <div className="col-lg-12">
              <h3 className="text-center">
                This restaurant has no uploaded menu to order food
              </h3>
            </div>
          )}

          <Row className="mt-4 text-center w-full m-2">
            <Button size="lg" variant="success" onClick={postDataHandle}>
              Book Now
            </Button>
          </Row>
        </Container>
      </Row>
      <br></br>
    </Container>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default ReservationDetails;
