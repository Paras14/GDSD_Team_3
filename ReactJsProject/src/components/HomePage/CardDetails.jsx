import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";

const CardDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const CardComponentDetails = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=770&dpr=1",
      name: "Breuers Restaurant ",
      body: "High-end German dishes & fine wines served in a cozy restaurant with a warm atmosphere.",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Dachsbau Restaurant",
      body: "High-end German dishes & fine wines served in a cozy restaurant with a warm atmosphere.",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Restaurant Ritter",
      body: "Modern takes on regional classics, served with local beers in a centuries-old setting with a garden.",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Wirtshaus Schwarzer Hahn",
      body: "Modern takes on regional classics, served with local beers in a centuries-old setting with a garden.",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Ristorante Pasta e basta",
      body: "Small Italian restaurant with a shaded summer courtyard, serving homemade pasta & pizza.",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Vini & Panini",
      body: "Housemade pasta, stone-oven pizza & seafood dishes in a casual setting with sidewalk tables.",
    },
    {
      id: 7,
      image:
        "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Maharaja Restaurent",
      body: "Welcoming neighborhood restaurant with vaulted ceilings & a typical Indian menu.",
    },
    {
      id: 8,
      image:
        "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Christian & Freunde",
      body: "Welcoming neighborhood restaurant with vaulted ceilings & a typical Indian menu.",
    },
  ];

  return (
    <div className="grid">
      <Container className="mt-4">
        <Container>
          <Form.Group
            className="mb-3 d-flex justify-content-center mt-4"
            controlId="formBasicEmail"
          >
            <Form.Control
              type="text"
              placeholder="Search There"
              size="lg"
              className="mx-4"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <Button variant="primary" size="lg">
              Search
            </Button>
          </Form.Group>
        </Container>
        <Row>
          {CardComponentDetails.filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.name
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return val;
            }
          }).map((card, index) => (
            <Col md={3} key={index}>
              <Card className="box m-2">
                <Card.Img
                  variant="top"
                  src={card.image}
                  style={{ width: "auto", height: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{card.name}</Card.Title>
                  <Card.Text>{card.body}</Card.Text>
                </Card.Body>

                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/restaurentDetails");
                  }}
                >
                  Go to Visit
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default CardDetails;
