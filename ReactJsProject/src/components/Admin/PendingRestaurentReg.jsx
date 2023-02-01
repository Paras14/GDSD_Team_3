import React from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Global } from "../../helpers/Global";

function PendingRestaurantReg() {
  const navigate = useNavigate();
  const [pendingData, setPendingData] = useState([]);
  const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const baseUrl = Global.baseUrl;
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Get Pending Restaurant Data with email in query params
    axios
      .get(baseUrl + "restaurants/pending", {
        params: {
          email: localStorage.getItem("useremail"),
        },
      })
      .then((res) => {
        setPendingData(res.data);
        if (res.data.length === 0) {
          console.log("There is no Pending Requests for Review");
          setMessage(<p>There is no Pending Requests for Review</p>);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // const pendingData = [
  //   { name: "Restaurent 1", email: "senoman.ali7383@gmail.com" },
  //   { name: "Restaurent 2", email: "paras@gmail.com" },
  //   { name: "Restaurent 3", email: "vachitar@gmail.com" },
  //   { name: "Restaurent 4", email: "hassan@gmail.com" },
  //   { name: "Restaurent 5", email: "louis@gmail.com" },
  //   { name: "Restaurent 6", email: "jesus@gmail.com" },
  // ];
  return (
    <Container>
      <div>
        <p className="text-uppercase text-center m-4 p-2 fs-1">
          PENDING RESTAURANT REGISTRATIONS
        </p>
        <div>
          {message}
          {pendingData.map((data) => {
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
                    navigate("/pendingRestaurentForm");
                  }}
                >
                  {arrow}
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

export default PendingRestaurantReg;
