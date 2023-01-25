import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// this component displays the information of a reservation in the list of reservations of the user
const ReservationCard = ({ reservation }) => {

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h2>Reservation</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Restaurant: {reservation.restaurantId}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Date: {reservation.date}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Hour: {reservation.hour}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Number of People: {reservation.count}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default ReservationCard;