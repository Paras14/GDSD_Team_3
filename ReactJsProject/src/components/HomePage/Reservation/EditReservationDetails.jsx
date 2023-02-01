import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { BuildingUp } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Global } from "../../../helpers/Global.js";
import { isAuthorized } from "../../../helpers/isAuthorized.js";
import RestaurantPhoto from "../../RestaurantPhoto";
import FoodDetails from "./FoodDetailsCard";

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

  useEffect(() => {
    
    async function getUserReservationRestaurantAndFood() {

        // Update the document title using the browser API
        document.title = `Reservation Details`;

        // get user from local storage
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);

        // get reservation details
        const reservation = await axios.get(`${baseUrl}reservations/${reservationId}`);
        setReservation(reservation.data);
        const dateObject = new Date(reservation.data.date);

        const localdate = dateObject.toISOString().split('T')[0];
        let localhour = dateObject.toLocaleTimeString();

        console.log("Date day: " + localdate);
        console.log("Date time: " + localhour);
        console.log("Date time first: " + dateObject.toLocaleTimeString().split(':')[0]);
        if (dateObject.toLocaleTimeString().split(':')[0].length === 1) {
            console.log("Date time: " + "0" + dateObject.toLocaleTimeString());
            localhour = "0" + dateObject.toLocaleTimeString();
        }

        setDate(localdate);
        setHour(localhour);
        
        setCount(reservation.data.numberofplaces);


        // get restaurant details
        const restaurant = await axios.get(`${baseUrl}restaurants/${reservation.data.restaurantId}`);
        setRestaurantDetail(restaurant.data);

        // get food details
        const foods = await axios.get(`${baseUrl}foods/restaurant/${reservation.data.restaurantId}`);
        console.log(foods.data);
        setFoods(foods.data);

        // get food orders of the reservation
        const orders = await axios.get(`${baseUrl}reservations/order/${reservationId}`);
        console.log(orders.data);

        // set the food counts
        const foodCounts = foods.data.map(food => {
            const order = orders.data.find(order => order.foodId === food.id);
            return order ? order.quantity : 0;
        });
        console.log("foodCounts: ",foodCounts);
        setFoodCounts(foodCounts);
    }


    if (!isauthorized) {
        navigate("/signIn");
    } else {
        getUserReservationRestaurantAndFood();
    }

  }, []);

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
    console.log("user", user);

    const reservationObj = {
      id: reservationId,
      date: date + " " + hour + ":00",
      numberofplaces: count,
      restaurantId: restaurantDetail.id,
      userId: user.id,
    };

    axios
      .put(`${baseUrl}reservations/${reservationId}`, reservationObj)
      .then((res) => {
        console.log(res);

        // if there is food in the restaurant
        if (foods.length > 0) {
            // First we need to delete the orders of the reservation
            axios.delete(`${baseUrl}reservations/order/${reservationId}`).then(res => {
                console.log(res);
            }).catch(err => console.log(err));


            // We need to create a list of orders for the foods of the reservation that have a count > 0
            const list = foods
                .filter(food => foodCounts[foods.indexOf(food)] > 0)
                .map(food => ({
                    foodId: food.id,
                    quantity: foodCounts[foods.indexOf(food)]
                }));

            const orders = {
                id: reservationId,
                list: list
            }

            // We create the orders
            axios.post(`${baseUrl}reservations/order/add`, orders).then(res => {
                console.log(res);
            }).catch(err => console.log(err));
            
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

  return restaurantDetail !== null ? (
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
          <hr></hr>
          
            
        {foods.length > 0 
        ?
        <Row>
            <label for="select_food" className="fw-bold">
                Select Food:
            </label>
            <br />
            <br />
            <Row>{foods.map(showFoodItems)}</Row>
            <div className="col-lg-8 mt-2 mb-2">
            <textarea id="comments" name="comments" cols={80} placeholder="Additional Comments">
                
            </textarea>
            </div>
            <div className="col-lg-2">
            
            </div>
        </Row>
        :
        <div className="col-lg-12">
            <h3 className="text-center">This restaurant has no uploaded menu to order food</h3>
        </div>
        }
        
            
          
          <Row className="mt-4 text-center w-full m-2">
            <Button size="lg" variant="success" onClick={postDataHandle}>
              Book Now
            </Button>
          </Row>
        </Container>
      </Row>
      <br></br>
    </Container>
  ) : (
    <div>Loading...</div>
  );
}

export default EditReservationDetails;
