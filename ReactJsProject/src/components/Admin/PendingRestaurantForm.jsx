import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Global } from "../../helpers/Global";

function PendingRestaurantForm() {
  const {restaurantId} = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [petition, setPetition] = useState(null);
  const baseUrl = Global.baseUrl;
  const [managerData, setManagerData] = useState(null);
  const [restaurantTypeData, setRestaurantTypeData] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    const getRestaurantData = async () => {
      // Get email from local storage
      const email = localStorage.getItem("useremail");
      setEmail(email);

      // Get restaurant data with restaurantId in params
      const response = await axios.get(`${baseUrl}restaurants/${restaurantId}`);
      setRestaurantData(response.data);

      // Get manager data with restaurantId in params
      const managerResponse = await axios.get(`${baseUrl}users/${response.data.userId}`);
      setManagerData(managerResponse.data);

      // Get restaurant type data with restaurantId in params
      const restaurantTypeResponse = await axios.get(`${baseUrl}restaurantCategories/${response.data.restaurantCategoryId}`);
      setRestaurantTypeData(restaurantTypeResponse.data);

      // Get petition data with restaurantId in params
      const petitionResponse = await axios.get(`${baseUrl}admin/petitions/restaurant/${restaurantId}`);
      console.log(petitionResponse.data[0]);
      setPetition(petitionResponse.data[0]);
    };

    getRestaurantData();

  }, []);

  /*const restaurantData = [
    {
      restaurantName: "Restaurent 1",
      managerName: "Manager 1",
      managerEmail: "manager@gmail.com",
      city: "Fulda",
      state: "Hessen",
      zipCode: "36039",
      managerTellophone: "5675767869",
      restaurentType: "Chinese",
    },
  ];*/
  return (
    <Container>
      <div>
        <h1 className="text-center fs-4 p-3 m-3">
          PENDING RESTAURANT REGISTRATIONS
        </h1>
        <div>

          {petition && (
              <div>
                <Row className="mb-3">
                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">Restaurant Name:</span>
                      {restaurantData.name}
                    </p>
                  </Card>

                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">Manager Name:</span>
                      {managerData.firstname} {managerData.lastname}
                    </p>
                  </Card>

                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">Manager Email:</span>
                      {managerData.email}
                    </p>
                  </Card>
                </Row>

                <Row className="mb-3">
                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">City:</span>
                      {restaurantData.city}
                    </p>
                  </Card>
                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">State:</span>
                      {restaurantData.state}
                    </p>
                  </Card>
                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">Phone Number:</span>
                      {restaurantData.telephone}
                    </p>
                  </Card>
                </Row>

                <Row className="mb-3">
                  <Card body as={Col} md="6">
                    <p>
                      <span className="fs-4 p-2">Zip Code:</span>
                      {restaurantData.zip}
                    </p>
                  </Card>
                  <Card body as={Col} md="6">
                    <p>
                      <span className="fs-4 p-2">Restaurent Type:</span>
                      {restaurantTypeData.name}
                    </p>
                  </Card>
                </Row>
              </div>
          )}
            
        </div>
        <Row>
          <Button className="mb-3" size="lg"
            onClick={() => {
              console.log(petition);
              axios
                .put(`${baseUrl}admin/petitions/restaurant/update`, 
                {
                  id: petition.id,
                  status: "rejected",
                  message: petition.message,
                  createdAt: petition.createdAt,
                  updatedAt: petition.updatedAt,
                  restaurantId: petition.restaurantId,
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
          <Button size="lg"
            onClick={() => {
              console.log(petition);
              axios
                .put(`${baseUrl}admin/petitions/restaurant/update`,
                {
                  id: petition.id,
                  status: "accepted",
                  message: petition.message,
                  createdAt: petition.createdAt,
                  updatedAt: petition.updatedAt,
                  restaurantId: petition.restaurantId,
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
          >Accept</Button>
        </Row>
      </div>
    </Container>
  );
}

export default PendingRestaurantForm;
