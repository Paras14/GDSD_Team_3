import axios from "axios";
import React from "react";// Paras: Unnecessary import, could be import along with others in the line below
import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";

//Paras: Could have added more comments to breifly explain the code
function ManagerPanel() {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(0);
  async function getRestaurantId(){//Paras: It is good to use either use Asyn/await or Promises
    const user = JSON.parse(localStorage.getItem("user"));//Paras: Can put it in a try-catch block
    axios.get(Global.baseUrl+"restaurants/manager/"+user.id).then((res) =>{
      setRestaurantId(res.data.id);
    })
  }
useEffect( () => {
   getRestaurantId();
}, []);
  return restaurantId!==0 && ( //Paras: This is clever way to conditional rendering, but it is not a recommended way according to well acclaimed Airbnb styling guide
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
      </div>
    </Container>
  );
}

export default ManagerPanel;
