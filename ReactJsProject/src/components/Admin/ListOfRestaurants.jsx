import React from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Global } from "../../helpers/Global.js";

function ListOfRestaurants() {
  const navigate = useNavigate();
  const [pendingRestaurants, setPendingRestaurants] = useState([]);
  const baseUrl = Global.baseUrl;
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from local storage
    const email = localStorage.getItem("useremail");
    setEmail(email);
  }, []);

  useEffect(() => {
    if (email !== "") {
      axios
      .get(baseUrl+"restaurants/all", {params: {email: email}})
      .then((res) => {
        setPendingRestaurants(res.data);
        if (res.data.length === 0) {
          console.log("There is no users");
          setMessage(<p>There is no users</p>);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [email]);
  //   const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  // const pendingData = [
  //   { name: "Restaurant 1", email: "Restaurant1@gmail.com" },
  //   { name: "Restaurant 2", email: "Restaurant2@gmail.com" },
  //   { name: "Restaurant 3", email: "Restaurant3@gmail.com" },
  //   { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
  //   { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
  //   { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
  //   { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
  //   { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
  //   { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
  //   { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
  //   { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
  //   { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
  //   { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
  //   { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
  //   { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
  //   { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
  //   { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
  //   { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
  //   { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
  //   { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
  //   { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
  //   { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
  //   { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
  //   { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
  //   { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
  //   { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
  //   { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
  //   { name: "Restaurant 4", email: "Restaurant4@gmail.com" },
  //   { name: "Restaurant 5", email: "Restaurant5@gmail.com" },
  //   { name: "Restaurant 6", email: "Restaurant6@gmail.com" },
  // ];
  return (
    <Container>
      <div>
        <p className="text-uppercase text-center m-4 p-2 fs-1">
          List of Restaurants
        </p>
        <div style={{ overflow: "scroll", maxHeight: "25rem" }}>
          {pendingRestaurants.length !== 0 && pendingRestaurants.map((data) => {
            return (
              <div className="d-flex justify-content-between mb-2 p-3 m-2 bg-light rounded">
                <img 
                  src={data.image}
                  alt={data.name}
                  className="img-fluid"
                  style={{ width: "100px", height: "100px" }}
                />
                <p className="fs-4 fw-bold">{data.name}</p>
                <p className="fs-4">{data.address}</p>
                <p className="fs-4">{data.telephone}</p>
                <Button
                  onClick={() => {
                    navigate("/RestaurantDetails/" + data.id);
                  }}
                >
                  View Details
                </Button>
              </div>
            );
          })}
        </div>
        <div className="m-4 text-center">
          <Button
            onClick={() => {
              navigate("/adminPanel");
            }}
          >
            Back to Main Menu
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default ListOfRestaurants;
