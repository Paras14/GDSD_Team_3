import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { formatDate } from '../Chat/format/formatDate';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';
import socket from '../Chat/Socket.js'

// this component displays the information of a reservation in the list of reservations of the user
const ReservationCard = ({ reservation }) => {
    
    const baseUrl = Global.baseUrl;
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        async function getRestaurant() {
            // get restaurant info of the reservation
            const restaurantres = await axios
                .get(baseUrl + "restaurants/" + reservation.restaurantId);

            console.log(restaurantres);
            setRestaurant(restaurantres.data);
                
        }

        getRestaurant();

    }, []);

    return (
        restaurant !== null
        ?
        <div>
            <div class="card mb-3 shadow">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src={restaurant.image}
                     class="img-fluid rounded-start" alt={`Restaurant ${restaurant.name}`}></img>
                    </div>
                    <div class="col-md-8">
                        <h5 class="card-header ms-">Reservation: #{reservation.id}</h5>
                        <div class="card-body">
                            <h5 class="card-title ms-2 mb-4">Restaurant: <Link to={"/RestaurantDetails/" + restaurant.id}>{restaurant.name}</Link></h5>
                            <p class="card-text">Date: <span className='fw-bold'>{ formatDate(reservation.date) }</span></p>
                            <p class="card-text mb-4">Number of People: <span className='fw-bold'>{reservation.numberofplaces}</span></p>
                            <Button variant="primary" className='mx-1'
                                onClick={() => {
                                    navigate("/Chat/" + restaurant.userId);
                                }}
                            >
                            Chat with manager</Button>
                            <Button variant="success" className='mx-1'
                                style={{backgroundColor: "#50c266", borderColor: "#50c266"}}
                                onClick={() => {
                                    navigate("/EditReservation/" + reservation.id);
                                }}
                            >
                            Edit
                            </Button>
                            <Button variant="danger" className='mx-1'
                                onClick={() => {
                                    axios
                                        .delete(baseUrl + "reservations/" + reservation.id)
                                        .then((res) => {
                                            console.log(res);
                                            socket.emit("tablesUpdated", {});
                                            window.location.reload();
                                        })
                                        .catch((err) => console.log(err));
                                }}
                            >
                            Cancel</Button>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :
        null
    );

}

export default ReservationCard;