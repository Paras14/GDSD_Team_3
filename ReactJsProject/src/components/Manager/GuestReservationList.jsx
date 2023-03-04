// list of reservations for today
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { isAuthorized } from '../../helpers/isAuthorized';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../helpers/Global.js';
import ManagerReservationCard from './ManagerReservationCard';
import moment from "moment";

// this component displays a list of reservations of the user
const GuestReservationList = () => {
    const isauthorized = isAuthorized();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const baseUrl = Global.baseUrl;

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Guest Reservations`;

        if (isauthorized) {
            console.log("isauthorized");
            setUser(JSON.parse(localStorage.getItem("user")));

        } else {
            navigate("/signIn");
        }

    }, []);

    useEffect(() => {

        async function getGuestReservationList() {
            if (user) {
                console.log("user", user);
                let userId = user.id;
    
                // if the user is a waiter, get the restaurant id
                if (user.rolId === 10) { 
                    // get restaurant info
                    const restaurantResponse = await axios
                        .get(`${baseUrl}restaurants/waiter/${user.id}`)
                        .catch((err) => console.log(err));

                    if (restaurantResponse) {
                        console.log(restaurantResponse);
                        userId = restaurantResponse.data.userId;
                    }
    
                }
    
                // get reservations from the server
                axios
                .get(`${baseUrl}reservations/manager/${userId}`)
                .then((res) => {
                    console.log(res);
                    let resultSet = [];
                    let today = moment().toDate();
                    console.log(today);
                    for(let i in res.data){
                        console.log(res.data[i]);
                        let reservationDate = Date.parse(res.data[i]);
                        //if(reservationDate>=today){
                            resultSet.push(res.data[i]);
                        //}
                    }
                    console.log(resultSet);
                    setReservations(resultSet);
                })
                .catch((err) => console.log(err));
            }
        }
        
        getGuestReservationList();

    }, [user]);



    return (
        reservations.length !== 0 ?
            <div className="container mt-4 mb-5 pb-3">

                <div className=" rounded shadow" style={{backgroundColor : "#AED0FF"}}>
                    <p className="py-2 fs-1 fw-bold text-center" >Reservations</p>
                </div>

                <div className="">

                    {reservations.map((reservation) => (
                        
                        
                        <ManagerReservationCard
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

export default GuestReservationList;