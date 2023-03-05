import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { isAuthorized } from '../../helpers/isAuthorized';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../helpers/Global.js';
import ReservationCard from './ReservationCard';

// this component displays a list of reservations of the user
const Reservations = () => {
    const isauthorized = isAuthorized();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const baseUrl = Global.baseUrl;

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Reservations`;

        // check if the user is authorized
        if (isauthorized) {
            console.log("isauthorized");
            setUser(JSON.parse(localStorage.getItem("user")));

        } else {
            navigate("/signIn");
        }

    }, []);

    useEffect(() => {
        
        if (user) {

            // get reservations from the server
            axios
            .get(`${baseUrl}reservations/user/${user.id}`)
            .then((res) => {
                console.log(res);
                setReservations(res.data);
            })
            .catch((err) => console.log(err));
        }

    }, [user]);



    return (
        reservations.length !== 0 ?
            <div className="container mt-4 mb-5 pb-3">

                <div className=" rounded shadow" style={{backgroundColor : "#AED0FF"}}>
                    <p className="py-2 fs-1 fw-bold text-center" >Reservations</p>
                </div>

                <div className="">

                    {reservations.map((reservation) => (
                        
                        
                        <ReservationCard
                        reservation={reservation}
                        />
                        
                        ))
                    } 
                </div>
            </div>
            :
            <div className="container mt-4 mb-5">
                <div className=" rounded shadow" style={{backgroundColor : "#AED0FF"}}>
                    <p className="py-2 fs-1 fw-bold text-center" >Reservations</p>
                </div>
                <h2>You don't have any reservations</h2>
            </div>
    );

}

export default Reservations;