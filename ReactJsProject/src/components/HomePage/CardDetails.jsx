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
    <div className="container mt-4">
      <div className=" rounded shadow" style={{backgroundColor : "#AED0FF"}}>
        <p className="py-2 fs-1 fw-bold text-center" >Risto</p>
      </div>

      <div className="rounded shadow bg-white">

        <p className="px-5 py-2 fs-5" >Search for restaurants, make reservations, read reviews, chat with staff 
        and pre-order your meal all in one place. </p>
        <p className="px-5 pb-4 fs-5" >We hope you enjoy using our website and look forward to helping you find your next great meal!</p>
      </div>
      <br></br>

      <hr className="mb-4"></hr>


      <p className="pt-2 fs-3 fw-bold px-3 " >Try search for a restaurant</p>


      <div className="px-5">
      <Form.Group
            className="d-flex justify-content-center mt-4"
            controlId="formBasicEmail"
          >
            <Form.Control
              type="text"
              placeholder="Search There Your Favourite Restaurant"
              size="lg"
              className="me-4"
              maxLength={40}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <div className="text-primary">
              <FilterDropdown filterValueSelected={onFilterValueSelected} />
            </div>
          </Form.Group>
          <br></br>
          <br></br>
      </div>
      <div className ="row">
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
                {/*<Card className="box m-2">
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
                  </Card>*/}

                  <Card  className="m-2">
                        <Card.Img variant="top" src={card.image} style={{ width: "auto", height: "200px" }}/>
                        <Card.Body>
                          <Card.Title>{card.name}</Card.Title>
                          <Card.Text>
                            {card.description}
                          </Card.Text>
                          <Button variant="primary" onClick={() => {navigate("/RestaurantDetails/" + card.id);}}>See more</Button>
                        </Card.Body>
                      </Card>
              </Col>
            ))}

            
      </div>
      <br></br>
      <br></br> 
      <br></br>
      <br></br> 
        
    </div>
  );
};
export default CardDetails;
