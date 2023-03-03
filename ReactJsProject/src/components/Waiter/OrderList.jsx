import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { isAuthorized } from '../../helpers/isAuthorized';
import { useNavigate, useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global.js';
import FoodDetailsDisplay from './FoodDetailsDisplay';

const dummyOrder = [
    { name: "Food 1", Quantity: 2, Price: 10},
    { name: "Food 2", Quantity: 2, Price: 10},
    { name: "Food 3", Quantity: 2, Price: 10},
]

let totalPrice = 0;

dummyOrder.map((food) => {
    totalPrice += food.Quantity*food.Price;
});



const OrderList = () => {

    // const isauthorized = isAuthorized();
    // const [user, setUser] = useState(null);
    // const navigate = useNavigate();
    const [orderData, setOderData] = useState([]);
    const [foodData, setFoodData] = useState([]);
    const [quantities, setQuantity] = useState([]);
    const baseUrl = Global.baseUrl;
    let params = useParams();

    console.log(params)
    
const displayFoodItems = (foodItem, idx) => {
    return (
      <FoodDetailsDisplay
        key={foodItem.id}
        name={foodItem.name}
        image={foodItem.image}
        ingredients={foodItem.ingredients}
        price={foodItem.price}
        quantity={quantities[idx]}
      />
    );
  }

    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `OrderListReservations`;

    //     if (isauthorized) {
    //         console.log("isauthorized");
    //         setUser(JSON.parse(localStorage.getItem("user")));

    //     } else {
    //         navigate("/signIn");
    //     }

    // }, []);


    useEffect(() => {
        
        if (params) {
            console.log("params", params);
            // get reservations from the server
            axios
            .get(`${baseUrl}reservations/order/${params.id}`)
            .then((res) => {
                console.log("Look here res.data.quantity",res.data);
                setQuantity(res.data.map(item => item.quantity));
                setOderData(res.data);
            })
            .catch((err) => console.log(err));
        }

    }, [params]);

    console.log("quantities: ", quantities);


    useEffect(() => {
        console.log(orderData);
        if (orderData.length) {
            const foods = []
            orderData.forEach(element => {
            axios
            .get(`${baseUrl}foods/${element.foodId}`)
            .then((res) => {
                setFoodData(prevdata => [...new Map([...prevdata, res.data].map((m) => [m.id, m])).values()])
            })
            .catch((err) => console.log(err));
            });
        }

    }, [orderData.length]);


    return (
        <Container>
        <br></br>
        <Row>
          <Row>{foodData.map((data, idx) => displayFoodItems(data, idx))}</Row>
        </Row>
        <br></br>
      </Container>
    );

}

export default OrderList;