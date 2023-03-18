import React, {useEffect, useState, useRef} from 'react';


import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Global } from '../../helpers/Global';
import { Link, useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import { hydrate } from "react-dom";
import {hydrateRoot} from 'react-dom/client';
import * as ReactDOMServer from 'react-dom/server';
import { renderToStaticMarkup } from "react-dom/server"
import Draggable, {DraggableCore} from "react-draggable";
import '../../styles/Scrollbar.css';
import {isAuthorized} from '../../helpers/isAuthorized';
const TableMap = () => {
    const baseUrl = Global.baseUrl;
    const navigate = useNavigate();
    //const [divElement, setDivElement] = useState({});
    const elementInfo = useRef({h: 0, w: 0});
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
    const isauthorized = isAuthorized();
    const restaurantId = useRef(0);
    const initialRender = useRef(false);
    const oldContainerDimensions = useRef({h: 0, w: 0});
    

    useEffect(() => {
        if(!isauthorized)
            navigate('/signIn');
        setManager(JSON.parse(localStorage.getItem("user")));
        

        if(window.innerWidth < 768){
            document.getElementsByClassName('fw-bold')[0].parentElement.parentElement.parentElement.parentElement.parentElement.style.marginTop = "550px";
        }
        containerRef.current.innerHTML = "Checking for map...";
        left.current = containerRef.current.offsetLeft;
        right.current = left.current + containerRef.current.clientWidth;
        top.current = containerRef.current.offsetTop;
        bottom.current = top.current + containerRef.current.clientHeight;
        console.log(`${left.current} ${right.current} ${top.current} ${bottom.current}`);
        axios.get(baseUrl + 'restaurants/manager/' + JSON.parse(localStorage.getItem("user")).id)
            .then(response => {
                containerRef.current.innerHTML = "";
                restaurantId.current = response.data.id;
                axios.get(baseUrl + 'restaurantMap/' + response.data.id)
                    .then(response => {
                        console.log(response.data);
                        console.log(initialRender);
                        oldContainerDimensions.current = {h: containerRef.current.offsetHeight, w: containerRef.current.offsetWidth};
                        if(!(initialRender.current && response.data.length !== 0)){
                            updateElements(response.data);
                            initialRender.current = true;
                        }
                        
                    })
                    .catch(error => {
                        console.log(error);
                    }
                );
            })
            .catch(error => {
                console.log(error);
            });
        updateDimensions();
        window.addEventListener('resize', handleResize);
        
    }, []);

    function handleResize(){
        if(window.innerWidth < 768){
            document.getElementsByClassName('fw-bold')[0].parentElement.parentElement.parentElement.parentElement.parentElement.style.marginTop = "550px";
        } else{
            document.getElementsByClassName('fw-bold')[0].parentElement.parentElement.parentElement.parentElement.parentElement.style.marginTop = "0px";
        }
        let elementList = [];
        console.log(tableCount.current + " " + windowCount.current + " " + doorCount.current);
        const heightRatio = parseFloat(containerRef.current.offsetHeight)/parseFloat(oldContainerDimensions.current.h);
        const widthRatio = parseFloat(containerRef.current.offsetWidth)/parseFloat(oldContainerDimensions.current.w);
        for(let i=1; i<=tableCount.current; i++){
            const element = document.getElementById('T' + i);
            elementList.push({
                elementType: 'Table',
                x: element.getAttribute('x'),
                y: element.getAttribute('y'),
                height: heightRatio * parseFloat(element.offsetHeight),
                width: widthRatio * parseFloat(element.offsetWidth),
                viewHeight: oldContainerDimensions.current.h,
                viewWidth: oldContainerDimensions.current.w
            });
            element.remove();
            
        }
        tableCount.current = 0;
        for(let i=1; i<=windowCount.current; i++){
            const element = document.getElementById('W' + i);
            elementList.push({
                elementType: 'Window',
                x: element.getAttribute('x'),
                y: element.getAttribute('y'),
                height: heightRatio * parseFloat(element.offsetHeight),
                width: widthRatio * parseFloat(element.offsetWidth),
                viewHeight: oldContainerDimensions.current.h,
                viewWidth: oldContainerDimensions.current.w
            });
            element.remove();
            
        }
        windowCount.current = 0;
        for(let i=1; i<=doorCount.current; i++){
            const element = document.getElementById('D' + i);
            elementList.push({
                elementType: 'Door',
                x: element.getAttribute('x'),
                y: element.getAttribute('y'),
                height: heightRatio * parseFloat(element.offsetHeight),
                width: widthRatio * parseFloat(element.offsetWidth),
                viewHeight: oldContainerDimensions.current.h,
                viewWidth: oldContainerDimensions.current.w
            });
            element.remove();
            
        }
        oldContainerDimensions.current = {h: containerRef.current.offsetHeight, w: containerRef.current.offsetWidth};
        doorCount.current = 0;
        console.log(elementList);
        console.log(containerRef.current.offsetHeight + " " + containerRef.current.offsetWidth);
        console.log(tableCount.current + " " + windowCount.current + " " + doorCount.current);
        updateElements(elementList);
    }
    
    
    
    
    function updateElements(elements){
        for(let i=0; i<elements.length; i++){
            updateDimensions(parseFloat(containerRef.current.offsetHeight)/parseFloat(elements[i].height), parseFloat(containerRef.current.offsetWidth)/parseFloat(elements[i].width));
            const widthRatio = parseFloat(containerRef.current.offsetWidth)/parseFloat(elements[i].viewWidth);
            const heightRatio = parseFloat(containerRef.current.offsetHeight)/parseFloat(elements[i].viewHeight);
            console.log(elements[i].elementType[0].toLocaleLowerCase());
            addElement(elements[i].elementType[0].toLocaleLowerCase(), widthRatio * parseFloat(elements[i].x), heightRatio * parseFloat(elements[i].y));
        }
    }

    function updateDimensions(row = 10, col = 10){
        const h = containerRef.current.offsetHeight/row;
        const w = containerRef.current.offsetWidth/col;
        console.log("dimensions: " + row + " " + col + " " + h + " " + w );
        //setDivElement({height: h*0.8, width: w*0.8});
        console.log('reached here');
        elementInfo.current = {height: h, width: w};

    }
    

    function removeElement(element){
        element.id = "";
        element.style.visibility = "hidden";
        
    }

    function addElement(elementName, tx=0, ty=0){
        let elementId = '';
        let elementType = '';
        let elementColor = '';
        let elementText = '';
        let changedTranslateOnce = false;
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
        function handleStop(event, data) {
            console.log("Drag Ended");
            event.preventDefault();
            event.stopPropagation();
            console.log("Event Target was:" + event.target.innerHTML);
            
            console.log(elementBeingDragged);
            console.log(elementBeingDragged.current.style.transform);
            setTimeout(() => {
                elementBeingDragged.current.setAttribute("x", elementBeingDragged.current.style.transform.split('(')[1].split('px')[0]);
                elementBeingDragged.current.setAttribute("y", elementBeingDragged.current.style.transform.split(',')[1].split('px')[0]);
            }, 10);
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
                var elementNumber = parseFloat(elementBeingDragged.current.innerHTML.split(' ')[1]);
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
           
        }
        function handleStart(event, data){
            console.log("Drag Started");
            event.preventDefault();
            event.stopPropagation();
            console.log("Event Target was:" + event.target.id);
            elementBeingDragged.current = event.target;
            
        }

        function handleDrag(event, data){
            console.log("Dragging", changedTranslateOnce);
           
            event.preventDefault();
            event.stopPropagation();
            
            console.log("Event Target was:" + elementBeingDragged.current.id);
        }
        const newElement = React.createElement(Draggable, {onStart:handleStart, onDrag:handleDrag, onStop:handleStop},
             React.createElement('div', {id:elementId, className:'border border-secondary rounded',
             style:{height:elementInfo.current.height, width:elementInfo.current.width, textAlign:"center",
             position:"absolute", display:"-webkit-inline-flex", top: top.current, justifyContent:"center",
             backgroundColor:elementColor, color:"white", transform:`translate(${tx}px, ${ty}px)`}},
             elementText));
        const newRoot = document.createElement("div");
        newRoot.style.width = "fit-content";
        newRoot.style.display = "inline-block";
        // hydrate(newElement, newRoot);
        ReactDOM.render(newElement, newRoot);
        containerRef.current.appendChild(newRoot);
        document.getElementById(elementId).setAttribute("x",""+tx);
        document.getElementById(elementId).setAttribute("y",""+ty);
        switch(elementId[0]){
            // case 'W': document.getElementById(elementId).style.backgroundImage = 'url(https://i.ibb.co/CtqRqGb/window.png)';
            // document.getElementById(elementId).style.backgroundSize = 'cover';
            // document.getElementById(elementId).style.backgroundRepeat = 'no-repeat';
            // document.getElementById(elementId).style.backgroundColor = 'transparent';
        }
        console.log(tx, ty);
        setTimeout(() => {
            console.log("Id is " + elementId);
            // newElement.style.transform = "translate("+tx+"px,"+ty+"px)";
            document.getElementById(elementId).style.transform = "translate("+tx+"px,"+ty+"px)";
        }, 50);
        
    }

    function saveElements(){
        let tableList = [];
        let doorList = [];
        let windowList = [];
        let rows = parseFloat(containerRef.current.offsetWidth);
        let cols = parseFloat(containerRef.current.offsetHeight);
        let positionArray = new Array(rows).fill(null).map(() => Array(cols).fill(0));
        
        for(let i=1; i<=tableCount.current; i++){
            const element = document.getElementById("T"+i);
            let x = parseInt(element.getAttribute("x"));
            let y = parseInt(element.getAttribute("y"));
            let h = parseFloat(element.offsetHeight);
            let w = parseFloat(element.offsetWidth);
            if(x<0 || y<0 || (x+w)>rows || (y+h)>cols){
                console.log("Table " + element.id + " outside boundary");
                return;
            }
            console.log(x);
            console.log(y);
            console.log(positionArray[x][y]);
            for(let j = x; j<=(x+w); j++){
                for(let k = y; k<=(y+h); k++){
                    if(positionArray[j][k]===0)
                        positionArray[j][k] = 1;
                    else{
                        console.log("Table " + element.id + " overlapping");
                        return;
                    }
                }
            }
            tableList.push({id:element.id, x:x, y:y, h:h, w:w, vw:rows, vh:cols});
        }
        for(let i=1; i<=doorCount.current; i++){
            const element = document.getElementById("D"+i);
            let x = parseInt(element.getAttribute("x"));
            let y = parseInt(element.getAttribute("y"));
            let h = parseFloat(element.offsetHeight);
            let w = parseFloat(element.offsetWidth);
            if(x<0 || y<0 || (x+w)>rows || (y+h)>cols){
                console.log("Door " + element.id + " outside boundary");
                return;
            }
            for(let j = x; j<=(x+w); j++){
                for(let k = y; k<=(y+h); k++){
                    if(positionArray[j][k]===0)
                        positionArray[j][k] = 1;
                    else{
                        console.log("Door " + element.id + " overlapping");
                        return;
                    }
                }
            }
            doorList.push({id:element.id, x:x, y:y, h:h, w:w, vw:rows, vh:cols});
        }
        for(let i=1; i<=windowCount.current; i++){
            const element = document.getElementById("W"+i);
            let x = parseInt(element.getAttribute("x"));
            let y = parseInt(element.getAttribute("y"));
            let h = parseFloat(element.offsetHeight);
            let w = parseFloat(element.offsetWidth);
            if(x<0 || y<0 || (x+w)>rows || (y+h)>cols){
                console.log("Window " + element.id + " outside boundary");
                return;
            }
            for(let j = x; j<=(x+w); j++){
                for(let k = y; k<=(y+h); k++){
                    if(positionArray[j][k]===0)
                        positionArray[j][k] = 1;
                    else{
                        console.log("Window " + element.id + " overlapping");
                        return;
                    }
                }
            }
            windowList.push({id:element.id, x:x, y:y, h:h, w:w, vw:rows, vh:cols});
        }

        console.log(tableList);
        console.log(windowList);
        console.log(doorList);
        axios.put(baseUrl+'restaurantMap/' + restaurantId.current, {Table: tableList, Window: windowList, Door: doorList})
            .then(res => {
                console.log(res.data); 
            })
            .catch(err => {
                console.log(err);
            });
    }

    
    console.log('called TableMap');

    return (
        <div style={{height:"500px", zIndex:"0"}}>
            <div className='row' style={{height:"100%", position:"relative", zIndex:"0"}}>
            <div className='col-md-3'>
                <div className='row m-3' style={{height:"2.5rem", zIndex:"0"}}>
                    <input id="rowField" type="text" placeholder="Tables per row"></input>
                </div>
                <div className='row m-3' style={{height:"2.5rem", zIndex:"0"}}>
                    <input id="columnField" type="text" placeholder="Tables per column"></input>
                </div>
                <div className='row m-3' style={{height:"2.5rem", zIndex:"0"}}>
                    <Button variant="primary"
                        onClick={()=>{
                            updateDimensions(document.getElementById('rowField').value, document.getElementById('columnField').value)
                        }}
                    >
                        Update
                    </Button>
                    
                </div>
                <div ref={dragZone} className='row m-1' style={{height:"7rem", zIndex:"0"}}>
                    <p className='border rounded'>Drag here to delete</p>
                </div>
                <div className='row m-3' style={{height:"2.5rem", zIndex:"0"}}>
                <Button variant="primary"
                        onClick={() => addElement('t')}
                    >
                        Add Table
                    </Button>
                </div>
                <div className='row m-3' style={{height:"2.5rem", zIndex:"0"}}>
                <Button variant="primary"
                        onClick={() => addElement('d')}
                    >
                        Add Door
                    </Button>
                </div>
                <div className='row m-3' style={{height:"2.5rem", zIndex:"0"}}>
                <Button variant="primary"
                        onClick={() => addElement('w')}
                    >
                        Add Window
                    </Button>
                </div>
                <div className='row m-3' style={{height:"2.5rem", zIndex:"0"}}>
                    <Button variant="primary"
                        onClick={saveElements}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div id='tableMapContainer' className='col-md-9' style={{height:"-webkit-fill-available", position:"sticky", zIndex:"0"}}>
                <div ref={containerRef} className='border border-secondary rounded h-100 m-3' style={{overflow:"scroll"}}></div>
            </div>
            </div>
        </div>
        
    );
    

};

export default TableMap;