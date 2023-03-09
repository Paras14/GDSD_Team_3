import React, {useEffect, useState, useRef} from 'react';


import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import { hydrate } from "react-dom";
import * as ReactDOMServer from 'react-dom/server';
import { renderToStaticMarkup } from "react-dom/server"
import Draggable, {DraggableCore} from "react-draggable";
import '../../styles/Scrollbar.css';
const TableMap = () => {
    const baseUrl = Global.baseUrl;
    const navigate = useNavigate();
    //const [divElement, setDivElement] = useState({});
    const [tableElement, setTableElement] = useState({});
    const [manager, setManager] = useState(null);
    
    const containerRef = useRef(null);
    const left = useRef(0);
    const right = useRef(0);
    const top = useRef(0);
    const bottom = useRef(0);
    const tableCount = useRef(0);
    const windowCount = useRef(0);
    const doorCount = useRef(0);
    const elementBeingDragged = useRef(null);
    const dragZone = useRef(null);


    

    useEffect(() => {
        setManager(JSON.parse(localStorage.getItem("user")));
        left.current = containerRef.current.offsetLeft;
        right.current = left.current + containerRef.current.clientWidth;
        top.current = containerRef.current.offsetTop;
        bottom.current = top.current + containerRef.current.clientHeight;
        console.log(`${left.current} ${right.current} ${top.current} ${bottom.current}`);
        updateDimensions();
    }, []);

    function updateDimensions(row = 10, col = 10){
        const h = containerRef.current.offsetHeight/col;
        const w = containerRef.current.offsetWidth/row;
        //setDivElement({height: h*0.8, width: w*0.8});
        console.log('reached here');
        setTableElement({height: h, width: w});

    }

    function removeElement(element){
        element.id = "";
        element.style.visibility = "hidden";
        //element.style.display = "none";
        // element.style.height = 0;
        // element.style.width = 0;
    }

    function addElement(elementName){
        let elementId = '';
        let elementType = '';
        let elementColor = '';
        let elementText = '';
        switch(elementName){
            case 't':
                tableCount.current +=1;
                console.log(tableCount.current);
                elementId = 'T' + tableCount.current;
                elementType = 'Table';
                elementColor = 'burlywood';
                elementText = 'Table ' + tableCount.current;
                
                break;
            case 'd':
                doorCount.current += 1;
                elementId = 'D' + doorCount.current;
                elementType = 'Door';
                elementColor = 'lightslategray';
                elementText = 'Door ' + doorCount.current;
                
                break;
            case 'w':
                windowCount.current += 1;
                elementId = 'W' + windowCount.current;
                elementType = 'Window';
                elementColor = 'cornflowerblue';
                elementText = 'Window ' + windowCount.current;
                
                break;
            default:
                console.log("Invalid Element!");
                return;
        }
        
        let newElement = (
            <Draggable
            onStart={(event, data) =>{
                elementBeingDragged.current = event.target;
            }}
            onStop={(event, data) =>{
                if(!(event.target.innerHTML.split(' ')[0]=='Table' || 
                        event.target.innerHTML.split(' ')[0]=='Window' || 
                        event.target.innerHTML.split(' ')[0]=='Door')){
                    console.log(event.target);
                    return;
                }
                console.log(elementBeingDragged);
                elementBeingDragged.current.setAttribute("x", data.x);
                elementBeingDragged.current.setAttribute("y", data.y);
                const element = elementBeingDragged.current.getBoundingClientRect();
                const dragArea = dragZone.current.getBoundingClientRect();
                const overlapping = !(
                    element.right < dragArea.left || element.left > dragArea.right ||
                    element.top > dragArea.bottom || element.bottom < dragArea.top
                );
                if(overlapping){
                    let elementCount = 0;
                    switch(elementType[0]){
                        case 'T':   elementCount = tableCount.current;
                                    tableCount.current--;
                                    break;
                        case 'W':   elementCount = windowCount.current;
                                    windowCount.current--;
                                    break;
                        case 'D':   elementCount = doorCount.current;
                                    doorCount.current--;
                    }
                    var elementNumber = parseInt(elementBeingDragged.current.innerHTML.split(' ')[1]);
                    console.log(elementNumber);
                    // elementToRemove.current.remove();
                    removeElement(elementBeingDragged.current);
                    elementBeingDragged.current = null;
                    let foundSkipped = false;
                    while(elementNumber<=elementCount){
                        console.log("element Count is: ", elementCount);
                        const element = document.getElementById(elementType[0] + elementNumber);
                        if(!element){
                            elementNumber++;
                            foundSkipped = true;
                            continue;
                        }
                        console.log(element);
                        if(foundSkipped)
                            element.id = elementType[0] + (elementNumber-1);
                        element.innerHTML = elementType + " " + (elementNumber-1);
                    }
                    
                }
            }}>
                <div id={elementId} className='border border-secondary rounded' 
                style={{height:tableElement.height, width:tableElement.width, textAlign:"center",
                 position:"absolute", justifyContent:"center", backgroundColor:elementColor, color:"white"}}>
                    {elementText}
                
                </div>
            </Draggable>
            
        );
        
        const newRoot = document.createElement("div");
        newRoot.style.width = "fit-content";
        newRoot.style.display = "inline-block";
        hydrate(newElement, newRoot);
        containerRef.current.appendChild(newRoot);
        
    }
    
    function saveTables(){
        let tableList = [];

        for(let i=1; i<=tableCount.current; i++){
            const element = document.getElementById(""+i);
            tableList.push({id:element.id, x:(element.getAttribute('x')-left.current), y:(element.getAttribute('y')-top.current), h:element.offsetHeight, w:element.offsetWidth});
        }

        console.log(tableList);
    }

    
    console.log('called TableMap');

    return (
        <div style={{height:"500px", zIndex:"0"}}>
            <div className='row' style={{height:"100%", position:"relative", zIndex:"0"}}>
            <div className='col-md-3 col-sm-2'>
                <div className='row m-3' style={{height:"10%", zIndex:"0"}}>
                    <input id="rowField" type="text" placeholder="Tables per row"></input>
                </div>
                <div className='row m-3' style={{height:"10%", zIndex:"0"}}>
                    <input id="columnField" type="text" placeholder="Tables per column"></input>
                </div>
                <div className='row m-3' style={{height:"10%", zIndex:"0"}}>
                    <Button variant="primary"
                        onClick={()=>{
                            updateDimensions(document.getElementById('rowField').value, document.getElementById('columnField').value)
                        }}
                    >
                        Update
                    </Button>
                    
                </div>
                <div ref={dragZone} className='row m-3' style={{height:"30%", zIndex:"0"}}>
                    <p className='border rounded'>Drag here to delete</p>
                </div>
                <div className='row m-3' style={{height:"10%", zIndex:"0"}}>
                <Button variant="primary"
                        onClick={() => addElement('t')}
                    >
                        Add Table
                    </Button>
                </div>
                <div className='row m-3' style={{height:"10%", zIndex:"0"}}>
                <Button variant="primary"
                        onClick={() => addElement('d')}
                    >
                        Add Door
                    </Button>
                </div>
                <div className='row m-3' style={{height:"10%", zIndex:"0"}}>
                <Button variant="primary"
                        onClick={() => addElement('w')}
                    >
                        Add Window
                    </Button>
                </div>
                <div className='row m-3' style={{height:"10%", zIndex:"0"}}>
                    <Button variant="primary"
                        onClick={saveTables}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div id='tableMapContainer' className='col-md-9' style={{height:"-webkit-fill-available", zIndex:"0"}}>
                <div ref={containerRef} className='border border-secondary rounded h-100 m-3' style={{overflow:"scroll"}}></div>
            </div>
            </div>
        </div>
        
    );
    

};

export default TableMap;