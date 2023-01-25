import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { BuildingUp } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Global } from "../../../helpers/Global.js";
import { isAuthorized } from "../../../helpers/isAuthorized.js";
import RestaurantPhoto from "../../RestaurantPhoto";

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

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Reservation Details`;

    // get user from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const postDataHandle = (e) => {
    e.preventDefault();

    console.log("date", date);
    console.log("hour", hour);
    console.log("count", count);
    console.log("restaurantId", restaurantId);
    console.log("user", user);

    const reservation = {
      date: date + " " + hour + ":00",
      numberofplaces: count,
      restaurantId: restaurantId,
      userId: user.id,
    };

    axios
      .post(`${baseUrl}reservations/`, reservation)
      .then((res) => {
        console.log(res);
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

  useEffect(() => {
    if (!isauthorized) {
      navigate("/signIn");
    }
    axios
      .get(`${baseUrl}restaurants/${restaurantId}`)
      .then((response) => {
        setRestaurantDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   fetch(`${baseUrl}restaurants/${restaurantId}`).then;
  // }, []);

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
          <Row>
            {/*<Col className="col-lg-4">
              <Button
                size="lg"
                className="text-center"
                onClick={() => {
                  navigate("/TableSelection");
                }}
              >
                Select table
              </Button>
              </Col>*/}
            <Col className="col-lg-4">
              <Button
                size="lg"
                className="text-center"
                onClick={() => {
                  navigate("/FoodSelection");
                }}
              >
                Select Food
              </Button>
            </Col> 
            {/*<Col className="col-lg-4">
              <Button
                size="lg"
                className="text-center"
                onClick={() => {
                  navigate("/ParkingSelection");
                }}
              >
                Parking
              </Button>
              </Col>*/}
          </Row>
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

export default ReservationDetails;
