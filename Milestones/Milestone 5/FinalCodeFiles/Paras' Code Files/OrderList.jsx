import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { isAuthorized } from '../../helpers/isAuthorized';
import { useNavigate, useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global.js';
import FoodDetailsDisplay from './FoodDetailsDisplay';

const OrderList = () => {

    const [orderData, setOderData] = useState([]);
    const [foodData, setFoodData] = useState([]);
    const [quantities, setQuantity] = useState([]);
    const [currentStatus, setCurrentStatus] = useState("");
    const status = ["pending","processing","done"];
    const [tableNumber, setTableNumber] = useState([]);
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


    useEffect(() => {
        
        if (params) {
            console.log("params", params);
            // get reservations from the server
            axios
            .get(`${baseUrl}reservations/order/${params.id}`)
            .then((res) => {
                console.log("Look here res.data",res.data);
                setQuantity(res.data.map(item => item.quantity));
                setOderData(res.data);
            })
            .catch((err) => console.log(err));
        }

        axios
        .get(`${baseUrl}reservations/order/${params.id}`)
        .then((res) => {
            console.log("Get resevation status",res.data[0].status);
            setCurrentStatus(res.data[0].status);
        })
        .catch((err) => console.log(err));

    }, [params]);

    console.log("quantities: ", quantities);


    useEffect(() => {
        console.log(orderData);
        if (orderData.length) {
            const foods = []
            orderData.forEach(element => {
            axios
            .get(`${baseUrl}foods/${element.foodId}`)
            .then((res) => {//this line of code is updating the state of foodData by adding new data to the existing data and removing any duplicates based on their id
                setFoodData(prevdata => [...new Map([...prevdata, res.data].map((m) => [m.id, m])).values()])
            })
            .catch((err) => console.log(err));
            });
        }

    }, [orderData.length]);

    console.log("Here is Status: ",currentStatus);

    const updateStatus = (cStatus) => {
        setCurrentStatus(cStatus)
        axios
        .put(`${baseUrl}reservations/order/${params.id}/status`, { data: {status: cStatus}})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    useEffect(() => {
      axios
      .get(`${baseUrl}reservations/tables/${params.id}`)
      .then((res) => {
        console.log("This is get Table response",res);
        const tablenumbers = res.data.map(x => x.tableId);
        setTableNumber(tablenumbers);
      })
      .catch((err) => {
        console.log(err);
      })
    }, [orderData.length]);

    return (
        <Container>
        <br></br>
        <Row>
          <Row><Col lg={8} md={8} xs={8}>{foodData.map((data, idx) => displayFoodItems(data, idx))}</Col>
          <Col lg={2} md={2} xs={2}><select name="status" id="status" value={currentStatus} onChange={(e) => updateStatus(e.target.value)}>
            <option value={"pending"}>pending</option>
            <option value={"processing"}>processing</option>
            <option value={"done"}>done</option>
        </select>
        </Col>
        <Col lg={2} md={2} xs={2}>
          For Tables :- {tableNumber.map(item => {
          return (
            <ul className='list-group'>
            <li className='list-group-item'>{item}</li>
            </ul>);
        })}
        </Col>
          </Row>
        </Row>
        <br></br>
      </Container>
    );

}

export default OrderList;