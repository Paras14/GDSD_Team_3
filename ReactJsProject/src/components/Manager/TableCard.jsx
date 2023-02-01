import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { formatDate } from '../Chat/format/formatDate';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';


const TableCard = ({ table }) => {
    
    const baseUrl = Global.baseUrl;
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();

    console.log(table);

    return (
        table !== null
        ?
        <div>
            <div class="card mb-3 shadow">
                <div class="row g-0">
                    
                    <div class="col-md-12">
                        <h5 class="card-header ms-">Table: #{table.number}</h5>
                    <div class="card-body">
                        <h5 class="card-title ms-4 mb-6">Status: {table.status===1?"Reserved": "Free"}</h5>
                        
                        <Button variant="primary" className='mx-2'
                            onClick={() => {
                                let status = (table.status+1)%2;
                                axios.put(baseUrl+ "restaurants/table/" + table.id, {status: status})
                                    .then((res) => {
                                        console.log(res.data);
                                        window.location.reload();
                                    })
                                    .catch((err) => console.log(err));
                            }}
                        >
                        Change Status</Button>
                    
                    </div>
                    </div>
                </div>
            </div>
        </div>
        :
        null
    );

}

export default TableCard;