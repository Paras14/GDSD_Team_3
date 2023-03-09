import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { formatDate } from '../Chat/format/formatDate';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthorized } from '../../helpers/isAuthorized';

// this component displays the information of a reservation in the list of reservations of the user
const ManagerReservationCard = ({ reservation }) => {
    
    const baseUrl = Global.baseUrl;
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [manager, setManager] = useState(null);
    const isauthorized = isAuthorized();

    useEffect(() => {
        //Check if user is logged in
        if(isauthorized)
            setManager(JSON.parse(localStorage.getItem("user")));
        else
            navigate('/signIn');
    }, []);


    useEffect(() => {
        //Function to retrieve Restaurant details
        async function getRestaurant() {
            const restaurants = await axios
                .get(baseUrl + "restaurants/" + reservation.restaurantId);
            setRestaurant(restaurants.data);
            const userValue = await axios.get(baseUrl + "users/" + reservation.userId);
            setUser(userValue.data);
        }

        getRestaurant();

    }, [manager]);

    return (
        restaurant !== null && user !== null && manager !== null && manager.rolId === 9
        ?
        <div>
            <div className="card mb-3 shadow">
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={restaurant.image}
                     className="img-fluid rounded-start" alt="Restaurant image"></img>
                    </div>
                    <div className="col-md-8">
                        <h5 className="card-header ms-">Reservation: #{reservation.id}</h5>
                    <div className="card-body">
                        <h5 className="card-title ms-2 mb-4">Customer: <Link to={"/otherProfile/" + user.id}>{user.firstname} {user.lastname}</Link></h5>
                        <p className="card-text">Date: <span className='fw-bold'>{ formatDate(reservation.date) }</span></p>
                        <p className="card-text mb-4">Number of People: <span className='fw-bold'>{reservation.numberofplaces}</span></p>
                        <Button variant="primary" className='mx-1'
                            onClick={() => {
                                navigate("/Chat/" + user.id);
                            }}
                        >
                        Chat with {user.firstname}</Button>
                        
                        <Button variant="success" className='mx-1'
                            onClick={() => {
                                //Call API to delete the reservation when Free is clicked
                                axios
                                    .delete(baseUrl + "reservations/" + reservation.id)
                                    .then((res) => {
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
            <div className="card mb-3 shadow">
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={restaurant.image}
                     className="img-fluid rounded-start" alt="Restaurant image"></img>
                    </div>
                    <div className="col-md-8">
                        <h5 className="card-header ms-">Reservation: #{reservation.id}</h5>
                    <div className="card-body">
                        <h5 className="card-title ms-2 mb-4">Customer: <Link to={"/otherProfile/" + user.id}>{user.firstname} {user.lastname}</Link></h5>
                        <p className="card-text">Date: <span className='fw-bold'>{ formatDate(reservation.date) }</span></p>
                        <p className="card-text mb-4">Number of People: <span className='fw-bold'>{reservation.numberofplaces}</span></p>
                        <Button variant="primary" className='mx-1'
                            onClick={() => {
                                navigate("/WaiterOrder/"+reservation.id);
                            }}
                        >
                        See order</Button>
                    
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