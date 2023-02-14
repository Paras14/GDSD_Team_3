import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const dummyOrder = [
    { name: "Food 1", Quantity: 2, Price: 10},
    { name: "Food 2", Quantity: 2, Price: 10},
    { name: "Food 3", Quantity: 2, Price: 10},
]

const totalPrice = 0;

dummyOrder.map((food) => {
    totalPrice += food.Quantity*food.Price;
});

const OrderList = () => {
    return (
      <div>
        <table>
            <tr>
            <th>Food Item</th>
            <th>Quantity</th>
            <th>Price</th>
            </tr>
            {dummyOrder.map((OrderData) => {
                return(
                    <tr>
                        <td>{OrderData.name}</td>
                        <td>{OrderData.Quantity}</td>
                        <td>{OrderData.Price} Euro</td>
                    </tr>
                );
            })};
        </table>
        <table>
            <tr>
                <td>Total Price</td>
                <td>{totalPrice}</td>
            </tr>
        </table>
      </div>  
    );

}

export default OrderList;