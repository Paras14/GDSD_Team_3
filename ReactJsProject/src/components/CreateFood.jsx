import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Global } from "../helpers/Global.js";

const CreateFood = () => {
    const [foodCategories, setFoodCategories] = useState([]);
    const [foodCategory, setFoodCategory] = useState(0);
    const [foodName, setFoodName] = useState("");
    const [foodIngredients, setIngredients] = useState("");
    const [foodPrice, setPrice] = useState(0);
    const [foodImage, setImage] = useState("");
    const {restaurantId} = useParams();
    const navigate = useNavigate();
    const baseUrl = Global.baseUrl;
    useEffect(() => {
       
        axios.get(baseUrl + "foodCategories")
            .then((res) => {
                setFoodCategories(res.data);
            })
            .catch((err) => console.log(err));

    }, []);


    const postDataHandle = (e) => {
        e.preventDefault();
    
    
        
    
        axios
          .post(`${baseUrl}foods/`, {name: foodName, ingredients: foodIngredients, price: foodPrice, image: foodImage, foodCategoryId: foodCategory, restaurantId: restaurantId })
          .then((res) => {
            console.log(res.data);
    
            navigate("/RestaurantDetails/" + res.data.restaurantId);
          })
          .catch((err) => console.log(err));
      };
    


    return foodCategories.length !== 0  && (
        <Container>
          <Row>
            <h2 className="text-center p-4 fw-bold text-uppercase text-danger">
              Add Food
            </h2>
          </Row>
          <Row>
            <Container>
              <Row className="p-4">
                <Col className="col-lg-6">
                  <label for="food-name" className="fw-bold text-center">
                    Food Name:
                  </label>
                  <br />
                  <input
                    class="form-control"
                    type="text"
                    id="food-name"
                    name="food-name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    required
                  />
                </Col>
                <Col className="col-lg-6 ">
                  <div>
                    <label for="appt" className="fw-bold">
                      Food Categories:
                    </label>
                  </div>
                   <select
                        className="form-select"
                        type="select"
                        name="food-categories"
                        id="food-categories"
                        value={foodCategory}
                        onChange={(e) => setFoodCategory(e.target.value)}
                    >
                        <option key="" value="">Select Food Type</option>
                        {  foodCategories.length !==0 && foodCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                        ))}
                    </select>
                </Col>
                
              </Row>
              <hr></hr>
            <Row className="p-4">
            <Col className="col-lg-4">
                  <label for="food-ingredients" className="fw-bold text-center">
                    Food Ingredients:
                  </label>
                  <br />
                  <input
                    class="form-control"
                    type="text"
                    id="food-ingredients"
                    name="food-ingredients"
                    value={foodIngredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                  />
                </Col>
                <Col className="col-lg-4">
                  <label for="food-image" className="fw-bold text-center">
                    Food Image:
                  </label>
                  <br />
                  <input
                    class="form-control"
                    type="text"
                    id="food-image"
                    name="food-image"
                    value={foodImage}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </Col>
                <Col className="col-lg-4">
                  <label for="food-price" className="fw-bold text-center">
                    Food Price:
                  </label>
                  <br />
                  <input
                    class="form-control"
                    type="text"
                    id="food-price"
                    name="food-price"
                    value={foodPrice}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Col>
            </Row>
              
    
              <Row className="mt-4 text-center w-full m-2">
                <Button size="lg" variant="success" onClick={postDataHandle}>
                  Add
                </Button>
              </Row>
            </Container>
          </Row>
          <br></br>
        </Container>
      ) 
    }

export default CreateFood;