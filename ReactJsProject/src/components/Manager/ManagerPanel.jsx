import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";


function ManagerPanel() {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(0);
  async function getRestaurantId(){
    const user = JSON.parse(localStorage.getItem("user"));
    axios.get(Global.baseUrl+"restaurants/manager/"+user.id).then((res) =>{
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
          Welcome Manager
        </p>
        <Row>
          <Button
            className="mb-3 text-capitalize fs-3"
            size="lg"
            onClick={() => {
              navigate("/guestReservationList");
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

          <Button
            className="mb-3 text-capitalize fs-3"
            size="lg"
            onClick={() => {
              const user = JSON.parse(localStorage.getItem("user"));
              navigate("/chat/"+user.id);
            }}
          >
            View messages
          </Button>
          <Button className="text-capitalize fs-3" size="lg"
          onClick={() => {
              navigate("/RestaurantDetails/" + restaurantId);
            }}
          >
            View your restaurant
          </Button>
        
          
        </Row>
        <Row>
          <Button className="text-capitalize fs-3 mt-3" size="lg"
            onClick={() => {
                navigate("/WaiterRegister/" + restaurantId);
              }}
            >
              Register a Waiter
            </Button>
        </Row>
        <Row>
          <Button className="text-capitalize fs-3 mt-3" size="lg"
            onClick={() => {
                navigate("/TableMap/" );
              }}
            >
              Create Map for Restaurant
            </Button>
        </Row>
      </div>
    </Container>
  );
}

export default ManagerPanel;
