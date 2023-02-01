import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Global } from '../../helpers/Global.js';
import {useState, useEffect } from "react";
const { isAuthorized } = require("../../helpers/isAuthorized")
const TableCard = require("./TableCard");



const TableReservation = () => {
    const isauthorized = isAuthorized();
    const [user, setUser] = useState([]);
    const baseUrl = Global.baseUrl;
    const [tables, setTables] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Table Reservations`;

        if (isauthorized) {
            console.log("isauthorized");
            setUser(JSON.parse(localStorage.getItem("user")));

        } else {
            navigate("/signIn");
        }

    }, []);
 
    useEffect(() => {
        if(user){
            console.log("Reached this effect " + user.id);
            axios.get(`${baseUrl}restaurants/tables/${user.id}`)
            .then((res) => {
                console.log("data is \n");
                console.log(res.data);
                setTables(res.data);
                
                console.log(tables);
                
                
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    }, [user]);


    return (
        tables.length !== 0 ?
            <div className="container mt-4 mb-5 pb-3">

                <div className=" rounded shadow" style={{backgroundColor : "#AED0FF"}}>
                    <p className="py-2 fs-1 fw-bold text-center" >Tables</p>
                </div>

                <div className="">

                    {tables.map((table) => (
                        
                        
                        <TableCard  
                            table={table}
                        />
                        
                        ))
                    } 
                </div>
            </div>
            :
            <div className="container mt-4 mb-5">
                <div className=" rounded shadow" style={{backgroundColor : "#AED0FF"}}>
                    <p className="py-2 fs-1 fw-bold text-center" >Tables</p>
                </div>
                <h2>You don't have any tables</h2>
            </div>
    );


}

export default TableReservation;