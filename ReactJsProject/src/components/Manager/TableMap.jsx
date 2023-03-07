import React, {useEffect, useState, useRef} from 'react';


import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import Draggable, {DraggableCore} from "react-draggable";

const TableMap = () => {
    const baseUrl = Global.baseUrl;
    const navigate = useNavigate();
    //const [divElement, setDivElement] = useState({});
    const [tableElement, setTableElement] = useState(null);
    const [manager, setManager] = useState(null);
    
    const containerRef = useRef(null);
    const left = useRef(0);
    const right = useRef(0);
    const top = useRef(0);
    const bottom = useRef(0);
    const tableCount = useRef(0);
    const elementToRemove = useRef(null);
    function updateDimensions(row = 10, col = 10){
        const h = containerRef.current.offsetHeight/col;
        const w = containerRef.current.offsetWidth/row;
        //setDivElement({height: h*0.8, width: w*0.8});
        setTableElement({height: h, width: w});

    }

    function addTable(){
        tableCount.current +=1;
        let newTable = (
            <Draggable
            onStart={(event, data) =>{
                elementToRemove.current = event.target;
            }}
            onStop={(event, data) =>{
                if(!event.target.innerHTML.split(' ')[0]=='Table'){
                    console.log(event.target);
                    return;
                }
                console.log(elementToRemove);
                elementToRemove.current.setAttribute("x", data.x);
                elementToRemove.current.setAttribute("y", data.y);
                if(event.target.offsetLeft<left.current){
                    var tableNumber = parseInt(elementToRemove.current.innerHTML.split(' ')[1]);
                    console.log(tableNumber);
                    elementToRemove.current.remove();
                    elementToRemove.current = null;
                    let foundSkipped = false;
                    while(tableNumber<=tableCount.current){
                        const element = document.getElementById('' + tableNumber);
                        if(!element){
                            tableNumber++;
                            foundSkipped = true;
                            continue;
                        }
                        console.log(element);
                        if(foundSkipped)
                            element.id = '' + (tableNumber-1);
                        element.innerHTML = "Table " + (tableNumber-1);
                    }
                    tableCount.current--;
                }
            }}>
                <div id={tableCount.current} className='border border-secondary rounded' 
                style={{height:tableElement.height, width:tableElement.width, textAlign:"center", justifyContent:"center", zIndex:0-tableCount.current}}>
                    Table {tableCount.current}
                
                </div>
            </Draggable>
            
        );
        
        const newRoot = document.createElement("div");
        newRoot.style.width = "fit-content";
        newRoot.style.display = "inline-block";
        containerRef.current.appendChild(newRoot);
        const root = ReactDOM.createRoot(newRoot);
        root.render(newTable);
        // newTable.offsetLeft = (left.current+right.current)/2;
        // newTable.offsetTop = (top.current+bottom.current)/2;
        
    }
    
    function saveTables(){
        let tableList = [];

        for(let i=1; i<=tableCount.current; i++){
            const element = document.getElementById(""+i);
            tableList.push({id:element.id, x:(element.getAttribute('x')-left.current), y:(element.getAttribute('y')-top.current), h:element.offsetHeight, w:element.offsetWidth});
        }

        console.log(tableList);
    }
    useEffect(() => {
        setManager(JSON.parse(localStorage.getItem("user")));
        left.current = containerRef.current.offsetLeft;
        right.current = left.current + containerRef.current.clientWidth;
        top.current = containerRef.current.offsetTop;
        bottom.current = top.current + containerRef.current.clientHeight;
        console.log(`${left.current} ${right.current} ${top.current} ${bottom.current}`);
        updateDimensions();
    }, []);
    console.log('called TableMap')

    return (
        <div style={{height:"500px"}}>
            <div className='row' style={{height:"100%", position:"relative"}}>
            <div className='col-md-3'>
                <div className='row m-3' style={{height:"10%"}}>
                    <input id="rowField" type="text" placeholder="Tables per row"></input>
                </div>
                <div className='row m-3' style={{height:"10%"}}>
                    <input id="columnField" type="text" placeholder="Tables per column"></input>
                </div>
                <div className='row m-3' style={{height:"10%"}}>
                    <Button variant="primary"
                        onClick={()=>{
                            updateDimensions(document.getElementById('rowField').value, document.getElementById('columnField').value)
                        }}
                    >
                        Update
                    </Button>
                    
                </div>
                <div className='row m-3' style={{height:"30%"}}>
                    <p className='border rounded'>Drag here to delete</p>
                </div>
                <div className='row m-3' style={{height:"10%"}}>
                <Button variant="primary"
                        onClick={addTable}
                    >
                        Add Table
                    </Button>
                </div>
                <div className='row m-3' style={{height:"10%"}}>
                    <Button variant="primary"
                        onClick={saveTables}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div className='col-md-9' style={{height:"-webkit-fill-available"}}>
                <div ref={containerRef} className='border border-secondary rounded h-100 m-3' style={{overflow:"scroll"}}></div>
            </div>
            </div>
        </div>
        
    );
    

};

export default TableMap;