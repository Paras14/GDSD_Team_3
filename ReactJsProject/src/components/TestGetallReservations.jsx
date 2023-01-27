import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Global } from "../helpers/Global.js";

function TestGetAllReservations () {
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;
    const { reservationId } = useParams();
    const [reservationDetails, setReservationDetails] = useState(null);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Reservation Details`;

        axios
            .get(baseUrl + "reservations/" + reservationId)
            .then((response) => {
                setReservationDetails(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <div>Open console to check
        {console.log(reservationDetails)}
        </div>
    );

}

export default TestGetAllReservations;