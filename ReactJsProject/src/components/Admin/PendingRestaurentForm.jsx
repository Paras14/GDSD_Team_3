import React from "react";
import { Container, Card } from "react-bootstrap";

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
        <h1>PENDING RESTAURANT REGISTRATIONS</h1>
        <div>
          {restaurentData.map((data) => {
            return (
              <Card>
                <Card body>{data.restaurentName}</Card>
                <Card body>{data.managerName}</Card>
              </Card>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default PendingRestaurentForm;
