import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { formatDate } from '../Chat/format/formatDate';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';

// this component displays the information of a reservation in the list of reservations of the user
const ReservationCard = ({ reservation }) => {
    
    const baseUrl = Global.baseUrl;
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        async function getRestaurant() {
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
        <div className="rounded shadow bg-white mb-2">
            <Container>
                <Row>
                    <Col>
                        <h2>Reservation with code: #{reservation.id}</h2>
                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        <img
                            src={restaurant.image}
                            alt="restaurant"
                            style={{ maxHeight:"120px" }}
                        ></img>
                    </Col>
                    <Col className='align-self-left'>
                        <p>Restaurant: <Link to={"/RestaurantDetails/" + restaurant.id}>{restaurant.name}</Link>
                        </p>
                        <p>Date: { formatDate(reservation.date) }</p>
                        <p>Number of People: {reservation.numberofplaces}</p>
                    </Col>
                    <Col className="d-flex flex-row justify-content-center align-items-center">
                        <Button variant="primary" className='mx-1'
                            onClick={() => {
                                navigate("/Chat/" + restaurant.userId);
                            }}
                        >
                        Chat with manager</Button>
                        <Button variant="danger" className='mx-1'
                            onClick={() => {
                                axios
                                    .delete(baseUrl + "reservations/" + reservation.id)
                                    .then((res) => {
                                        console.log(res);
                                        window.location.reload();
                                    })
                                    .catch((err) => console.log(err));
                            }}
                        >Cancel</Button>
                    </Col>
                </Row>
                
            </Container>
        </div>
        :
        null
    );

}

export default ReservationCard;