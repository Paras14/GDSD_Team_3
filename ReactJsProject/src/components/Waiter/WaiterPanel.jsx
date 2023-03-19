import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";


function WaiterPanel() {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(0);
  async function getRestaurantId(){
    const user = JSON.parse(localStorage.getItem("user"));
    axios.get(Global.baseUrl+"restaurants/waiter/"+user.id).then((res) =>{
      setRestaurantId(res.data.id);
    })
  }
    useEffect( () => {
    getRestaurantId();
    }, []);
  return restaurantId!==0 && (
    <Container>
      <div>
        <p className="fs-1 text-center p-3 m-4 text-capitalize fw-bold">
          Welcome Waiter
        </p>
        <Row>
          <Button
            className="mb-3 text-capitalize fs-3"
            size="lg"
            onClick={() => {
              navigate("/WaiterReservationList");
            }}
          >
            View Guest Reservation List
          </Button>
          <Button
            className="mb-3 text-capitalize fs-3"
            size="lg"
            onClick={() => {
              navigate("/tableReservations");
            }}
          >
            View Table Reservations
          </Button>

          <Button className="text-capitalize fs-3" size="lg"
          onClick={() => {
              navigate("/RestaurantDetails/" + restaurantId);
            }}
          >
            View your restaurant
          </Button>
        
          
        </Row>
      </div>
    </Container>
  );
}

export default WaiterPanel;
