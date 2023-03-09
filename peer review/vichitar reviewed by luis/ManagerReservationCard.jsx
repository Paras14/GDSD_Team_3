import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; // LUIS: Container, Row and Col are not used, so they can be removed
// Remark: corrected
import { formatDate } from '../Chat/format/formatDate';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';

 

// this component displays the information of a reservation in the list of reservations of the user
const ManagerReservationCard = ({ reservation }) => {
    
    const baseUrl = Global.baseUrl;
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [manager, setManager] = useState(null);

    useEffect(() => {
        setManager(JSON.parse(localStorage.getItem("user"))); 
        // LUIS: Good practice to use localStorage.getItem() only once, and store the result in a variable. 
        // But this call is not guarded by error handling, so it can throw an error if the user is not logged in. It is better to use the isAuthorized() helper function to check if the user is logged in, and if not, redirect to the login page.
        // Remark: corrected
    }, []);


    useEffect(() => {
        // LUIS: There are almost no comments in this file. Some comments would be helpful to understand the functionality of the functions overall. Also, improving error handling would be good.
        // Remark: corrected
        async function getRestaurant() {

            if (manager) { // LUIS: It is a good practice to check if the variable is null before using it. But in this case, the manager variable is not used in this function, so I think it is not necessary.
                   // Remark: corrected
                const restaurantres = await axios
                .get(baseUrl + "restaurants/" + reservation.restaurantId);

                console.log(restaurantres); // LUIS: console.log can be removed, it is only for debugging
             // Remark: corrected
                setRestaurant(restaurantres.data);
                const userValue = await axios.get(baseUrl + "users/" + reservation.userId);
                console.log(userValue.data); // LUIS: console.log can be removed, it is only for debugging
             // Remark: corrected
                setUser(userValue.data);
            }
            
        }

        getRestaurant(); // LUIS: Good practice to make a function async and call it inside the useEffect, instead of making the useEffect async!

    }, [manager]);

    return (
        restaurant !== null && user !== null && manager !== null && manager.rolId === 9 
        ?
        <div>
            <div class="card mb-3 shadow"> { /* LUIS: class is a reserved word in JS, so it is better to use className in React */}
     {/* // Remark: corrected */}
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
                                        console.log(res); // LUIS: console.log can be removed, it is only for debugging
                                 // Remark: corrected
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
        : restaurant !== null && user !== null && manager !== null && manager.rolId === 10
        ?
        <div>
            <div class="card mb-3 shadow"> { /* LUIS: class is a reserved word in JS, so it is better to use className in React */}
        {/* // Remark: corrected */}
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
                                navigate("/WaiterOrder/"+reservation.id); // LUIS: Good practice to use the navigate() function instead of window.location.href
                            }}
                        >
                        See order</Button>
                    
                    </div>
                    </div>
                </div>
            </div>
        </div>
        : 
        null // LUIS: Good practice to return null if the component is not ready to be rendered
    );

}

export default ManagerReservationCard;
