import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

function PendingRestaurentForm() {
  const restaurentData = [
    {
      restaurentName: "Restaurent 1",
      managerName: "Manager 1",
      managerEmail: "manager@gmail.com",
      city: "Fulda",
      state: "Hessen",
      zipCode: "36039",
      managerTellophone: "5675767869",
      restaurentType: "Chinese",
    },
  ];
  return (
    <Container>
      <div>
        <h1 className="text-center fs-4 p-3 m-3">
          PENDING RESTAURANT REGISTRATIONS
        </h1>
        <div>
          {restaurentData.map((data) => {
            return (
              <div>
                <Row className="mb-3">
                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">Restaurent Name:</span>
                      {data.restaurentName}
                    </p>
                  </Card>

                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">Manager Name:</span>
                      {data.managerName}
                    </p>
                  </Card>

                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">Manager Email:</span>
                      {data.managerEmail}
                    </p>
                  </Card>
                </Row>

                <Row className="mb-3">
                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">City:</span>
                      {data.city}
                    </p>
                  </Card>
                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">State:</span>
                      {data.state}
                    </p>
                  </Card>
                  <Card body as={Col} md="4">
                    <p>
                      <span className="fs-4 p-2">Phone Number:</span>
                      {data.managerTellophone}
                    </p>
                  </Card>
                </Row>

                <Row className="mb-3">
                  <Card body as={Col} md="6">
                    <p>
                      <span className="fs-4 p-2">Zip Code:</span>
                      {data.zipCode}
                    </p>
                  </Card>
                  <Card body as={Col} md="6">
                    <p>
                      <span className="fs-4 p-2">Restaurent Type:</span>
                      {data.restaurentType}
                    </p>
                  </Card>
                </Row>
              </div>
            );
          })}
        </div>
        <Row>
          <Button className="mb-3" size="lg">
            Decline
          </Button>
          <Button size="lg">Accept</Button>
        </Row>
      </div>
    </Container>
  );
}

export default PendingRestaurentForm;
