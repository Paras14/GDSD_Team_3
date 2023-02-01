import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { formatDate } from '../Chat/format/formatDate';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';

// this component displays the information of a reservation in the list of reservations of the user
const ManagerReservationCard = ({ reservation }) => {
    
    const baseUrl = Global.baseUrl;
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {

        async function getRestaurant() {
            const restaurantres = await axios
                .get(baseUrl + "restaurants/" + reservation.restaurantId);

            console.log(restaurantres);
            setRestaurant(restaurantres.data);
            const userValue = await axios.get(baseUrl + "users/" + reservation.userId);
            console.log(userValue.data);
            setUser(userValue.data);
        }

        getRestaurant();

    }, []);

    return (
        restaurant !== null && user !== null
        ?
        <div>
            <div class="card mb-3 shadow">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src={restaurant.image}
                     class="img-fluid rounded-start" alt="Restaurant image"></img>
                    </div>
                    <div class="col-md-8">
                        <h5 class="card-header ms-">Reservation: #{reservation.id}</h5>
                    <div class="card-body">
                        <h5 class="card-title ms-2 mb-4">Customer: <Link to={"/otherProfile/" + user.id}>{user.firstname} {user.lastname}</Link></h5>
                        <p class="card-text">Date: <span className='fw-bold'>{ formatDate(reservation.date) }</span></p>
                        <p class="card-text mb-4">Number of People: <span className='fw-bold'>{reservation.numberofplaces}</span></p>
                        <Button variant="primary" className='mx-1'
                            onClick={() => {
                                navigate("/Chat/" + user.id);
                            }}
                        >
                        Chat with {user.firstname}</Button>
                        
                        <Button variant="success" className='mx-1'
                            onClick={() => {
                                axios
                                    .delete(baseUrl + "reservations/" + reservation.id)
                                    .then((res) => {
                                        console.log(res);
                                        window.location.reload();
                                    })
                                    .catch((err) => console.log(err));
                                
                            }}
                        >Free</Button>
                    
                    </div>
                    </div>
                </div>
            </div>
        </div>
        :
        null
    );

}

export default ManagerReservationCard;