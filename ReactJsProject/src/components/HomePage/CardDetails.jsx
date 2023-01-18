import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import { useEffect } from "react";
import { setUpHome } from "../../helpers/SetUpHome";

const CardDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("-1");
  const [cardDetails, setCardDetails] = useState([]);
  

  const navigate = useNavigate();

  useEffect(() => {

    setUpHome(setCardDetails);

    console.log(cardDetails);

  }, []);

  const filteredList = cardDetails.filter((data) => {
    return filterValue === "-1" ? true : ""+data.restaurantCategoryId === filterValue;
  });

  const onFilterValueSelected = (filterValue) => {
    setFilterValue(filterValue);
  };

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
              placeholder="Search There Your Favourite Restaurent"
              size="lg"
              className="mx-4"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <div className="text-primary">
              <FilterDropdown filterValueSelected={onFilterValueSelected} />
            </div>
          </Form.Group>
        </Container>
        <Row>
          {filteredList
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                return val;
              }
            })
            .map((card, index) => (
              <Col md={3} key={index}>
                <Card className="box m-2">
                  <Card.Img
                    variant="top"
                    src={card.image}
                    style={{ width: "auto", height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>{card.name}</Card.Title>
                    <Card.Text>{card.description}</Card.Text>
                  </Card.Body>

                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("/RestaurantDetails_alt");
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
