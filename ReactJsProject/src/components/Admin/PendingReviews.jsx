import React from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Global } from "../../helpers/Global";


function PendingReviews() {
  const navigate = useNavigate();
  const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const [pendingData, setPendingData] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const baseUrl = Global.baseUrl;

  useEffect(() => {
    // Get email from local storage
    const email = localStorage.getItem("useremail");
    setEmail(email);
  }, []);

  useEffect(() => {
    if (email !== "") {

      // Get Pending Reviews Data with email in query params
      axios
      .get(baseUrl + "admin/petitions/review/detailedPending/a", {
        params: {
          email: email,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPendingData(res.data);
        if (res.data.length === 0) {
          console.log("There is no Pending Requests for Reviews");
          setMessage(<p>There is no Pending Requests for Reviews</p>);
        }
      })
      .catch((err) => console.log(err));

    }

  }, [email]);

  // const pendingData = [
  //   { reviewer: "example_customer1", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer2", restaurant: "example_restaurant2", time_of_post: "15.12.2022 10:04"},
  //   { reviewer: "example_customer3", restaurant: "example_restaurant3", time_of_post: "14.12.2022 9:04"},
  //   { reviewer: "example_customer4", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer5", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer6", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer7", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer8", restaurant: "example_restaurant4", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer9", restaurant: "example_restaurant4", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer10", restaurant: "example_restaurant2", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer11", restaurant: "example_restaurant2", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer12", restaurant: "example_restaurant2", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer13", restaurant: "example_restaurant2", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer14", restaurant: "example_restaurant2", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer15", restaurant: "example_restaurant3", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer16", restaurant: "example_restaurant3", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer17", restaurant: "example_restaurant3", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer18", restaurant: "example_restaurant3", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer19", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
  //   { reviewer: "example_customer20", restaurant: "example_restaurant1", time_of_post: "16.12.2022 11:04"},
  // ];
  return (
    <Container>
      <div>
        <p className="text-uppercase text-center m-4 p-2 fs-1">
        PENDING REVIEW POSTS
        </p>
        <div style={{overflow:"scroll", maxHeight:"25rem"}}>
          {message}
          {
            console.log(pendingData.length)
          }
          {pendingData.length !== 0 && pendingData.map( (data) => {

                /*const userreviewresponse = await axios.get(baseUrl + "users/" + data.userId);
                setUserReview(userreviewresponse.data);*/
                console.log(data);

                return (
                <div className="d-flex justify-content-between mb-2 p-3 m-2 bg-light rounded">
                    
                    <p className="fs-2 fw-bold">{data.reviewId}</p>
                    <p className="fs-2 ">{data.reviewRating}</p>
                    <p className="fs-2 ">{data.userFirstname}</p>
                    <p className="fs-2 ">{data.userLastname}</p>
                    <p className="fs-2 ">{data.reviewCreatedAt}</p>
                    <p className="fs-2 ">{data.reviewComment}</p>
                  
                    <Button
                        onClick={() => {

                            axios
                            .put(`${baseUrl}admin/petitions/review/update`, 
                            {
                              id: data.reviewPetitionID,
                              status: "rejected",
                              message: data.reviewPetitionMessage,
                              createdAt: data.reviewPetitionCreatedAt,
                              updatedAt: data.reviewPetitionUpdatedAt,
                              reviewId: data.reviewId,
                            },
                            {
                              params: {
                                email: email,
                              },
                            })
                            .then((response) => {
                              console.log(response);
                              navigate("/pendingRestaurantRegistration")
                            })
                            .catch((error) => {
                              console.log(error);
                            });

                          }}
                        
                        >
                        Decline
                    </Button>
                    <Button
                        onClick={() => {

                          axios
                          .put(`${baseUrl}admin/petitions/review/update`, 
                          {
                            id: data.reviewPetitionID,
                            status: "accepted",
                            message: data.reviewPetitionMessage,
                            createdAt: data.reviewPetitionCreatedAt,
                            updatedAt: data.reviewPetitionUpdatedAt,
                            reviewId: data.reviewId,
                          },
                          {
                            params: {
                              email: email,
                            },
                          })
                          .then((response) => {
                            console.log(response);
                            navigate("/pendingRestaurantRegistration")
                          })
                          .catch((error) => {
                            console.log(error);
                          });

                        }}
                        >
                        Accept
                        
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

export default PendingReviews;
