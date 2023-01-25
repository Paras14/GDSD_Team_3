import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { formatDate } from '../Chat/format/formatDate';

// this component displays the information of a reservation in the list of reservations of the user
const ReservationCard = ({ reservation }) => {

    return (
        <div className="rounded shadow bg-white mb-2">
            <Container>
                <Row>
                    <Col>
                        <h2>Reservation #{reservation.id}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Restaurant: {reservation.restaurantId}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Date: { formatDate(reservation.date) }</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Number of People: {reservation.numberofplaces}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default ReservationCard;