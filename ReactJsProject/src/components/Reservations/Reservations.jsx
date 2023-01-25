import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { isAuthorized } from '../../helpers/isAuthorized';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../helpers/Global.js';
import ReservationCard from './ReservationCard';

// this component displays a list of reservations of the user
const Reservations = () => {
    const isauthorized = isAuthorized();
    const [user, setUser] = useState(null);
    const navigate = Navigate();
    const [reservations, setReservations] = useState([]);
    const baseUrl = Global.baseUrl;

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Reservations`;

        if (isauthorized) {
            console.log("isauthorized");
            setUser(JSON.parse(localStorage.getItem("user")));

            // get reservations from the server
            axios
                .get(`${baseUrl}reservations/user/${user.id}`)
                .then((res) => {
                    console.log(res);
                    setReservations(res.data);
                })
                .catch((err) => console.log(err));

        } else {
            navigate("/signIn");
        }

    }, []);



    return (
        reservations.length > 0 ?
            reservations.map((reservation) => {
                return (
                    <div>
                        <ReservationCard
                            reservation={reservation}
                        />
                    </div>
                );
            })
            :
            <div>
                <h2>You don't have any reservations</h2>
            </div>
    );

}

export default Reservations;