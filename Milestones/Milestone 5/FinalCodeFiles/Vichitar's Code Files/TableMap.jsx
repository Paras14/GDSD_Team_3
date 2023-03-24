import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {  Button } from 'react-bootstrap';
import { Global } from '../../helpers/Global';
import {  useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import Draggable, {DraggableCore} from "react-draggable";
import '../../styles/Scrollbar.css';
import {isAuthorized} from '../../helpers/isAuthorized';

//Create component for table map
const TableMap = () => {
    const baseUrl = Global.baseUrl;
    const navigate = useNavigate();
    const elementInfo = useRef({h: 0, w: 0}); //height and width of the element being dragged
    const [manager, setManager] = useState(null); //manager object
    
    const containerRef = useRef(null); //reference to the container div
    const left = useRef(0); //left offset of the container div
    const right = useRef(0); //right offset of the container div
    const top = useRef(0);  //top offset of the container div
    const bottom = useRef(0); //bottom offset of the container div
    const tableCount = useRef(0); //number of tables in the map
    const windowCount = useRef(0); //number of windows in the map
    const doorCount = useRef(0); //number of doors in the map
    const elementBeingDragged = useRef(null); //reference to the element being dragged
    const dragZone = useRef(null); //reference to the drag zone for deleting an element
    const isauthorized = isAuthorized(); //method to check if the user is authorized
    const restaurantId = useRef(0); //id of the restaurant
    const initialRender = useRef(false); //boolean to check if the component is being rendered for the first time
    const oldContainerDimensions = useRef({h: 0, w: 0}); //height and width of the container div before resizing
    
    //method to render the entire screen
    useEffect(() => {
        if(!isauthorized)   //if the user is not authorized, redirect to the sign in page
            navigate('/signIn');
        setManager(JSON.parse(localStorage.getItem("user"))); //set the manager object
        

        if(window.innerWidth < 768){   //if the screen is smaller than 768px, set the margin top of the footer to 550px(fixes CSS positioning issue)
            document.getElementsByClassName('fw-bold')[0].parentElement.parentElement.parentElement.parentElement.parentElement.style.marginTop = "550px";
        }

        containerRef.current.innerHTML = "Checking for map..."; //until map loads, display loading text
        left.current = containerRef.current.offsetLeft;
        right.current = left.current + containerRef.current.clientWidth; 
        top.current = containerRef.current.offsetTop;  
        bottom.current = top.current + containerRef.current.clientHeight;
        //get the restaurant id of the manager
        axios.get(baseUrl + 'restaurants/manager/' + JSON.parse(localStorage.getItem("user")).id)
            .then(response => {
                containerRef.current.innerHTML = "";
                restaurantId.current = response.data.id;
                axios.get(baseUrl + 'restaurantMap/' + response.data.id) //get the restaurant map
                    .then(response => {
                        oldContainerDimensions.current = {h: containerRef.current.offsetHeight, w: containerRef.current.offsetWidth};
                        if(!(initialRender.current && response.data.length !== 0)){
                            updateElements(response.data); //update the elements on the map
                            initialRender.current = true; //set the initial render to true so that the map is not updated again redundantly
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

        updateDimensions(); //update the dimensions of the new element to be added to the map
        window.addEventListener('resize', handleResize); //add event listener for resizing the window
        
    }, []);

    //method to resize the map when the window is resized
    function handleResize(){
        if(window.innerWidth < 768){ //if the screen is smaller than 768px, set the margin top of the footer to 550px(fixes CSS positioning issue)
            document.getElementsByClassName('fw-bold')[0].parentElement.parentElement.parentElement.parentElement.parentElement.style.marginTop = "550px";
        } else{ //if the screen is larger than 768px, set the margin top of the footer to 0px(fixes CSS positioning issue)
            document.getElementsByClassName('fw-bold')[0].parentElement.parentElement.parentElement.parentElement.parentElement.style.marginTop = "0px";
        }

        let elementList = []; //list of elements on the map

        const heightRatio = parseFloat(containerRef.current.offsetHeight)/parseFloat(oldContainerDimensions.current.h); //ratio of the new height to the old height of container div
        const widthRatio = parseFloat(containerRef.current.offsetWidth)/parseFloat(oldContainerDimensions.current.w); //ratio of the new width to the old width of container div

        //setting all the new tables on the map
        for(let i=1; i<=tableCount.current; i++){
            const element = document.getElementById('T' + i);
            elementList.push({ //push the table to the list with updated dimensions
                elementType: 'Table',
                x: element.getAttribute('x'),
                y: element.getAttribute('y'),
                height: heightRatio * parseFloat(element.offsetHeight), 
                width: widthRatio * parseFloat(element.offsetWidth),
                viewHeight: oldContainerDimensions.current.h,
                viewWidth: oldContainerDimensions.current.w
            });
            element.remove();  //remove the table from the map
            
        }
        tableCount.current = 0; //reset the table count

        //setting all the new windows on the map
        for(let i=1; i<=windowCount.current; i++){
            const element = document.getElementById('W' + i);
            elementList.push({ //push the window to the list with updated dimensions
                elementType: 'Window',
                x: element.getAttribute('x'),
                y: element.getAttribute('y'),
                height: heightRatio * parseFloat(element.offsetHeight),
                width: widthRatio * parseFloat(element.offsetWidth),
                viewHeight: oldContainerDimensions.current.h,
                viewWidth: oldContainerDimensions.current.w
            });
            element.remove(); //remove the window from the map
            
        }
        windowCount.current = 0; //reset the window count

        //setting all the new doors on the map
        for(let i=1; i<=doorCount.current; i++){
            const element = document.getElementById('D' + i);
            elementList.push({ //push the door to the list with updated dimensions
                elementType: 'Door',
                x: element.getAttribute('x'),
                y: element.getAttribute('y'),
                height: heightRatio * parseFloat(element.offsetHeight),
                width: widthRatio * parseFloat(element.offsetWidth),
                viewHeight: oldContainerDimensions.current.h,
                viewWidth: oldContainerDimensions.current.w
            });
            element.remove(); //remove the door from the map
            
        }
        oldContainerDimensions.current = {h: containerRef.current.offsetHeight, w: containerRef.current.offsetWidth}; //set the old container dimensions to the new dimensions
        doorCount.current = 0; //reset the door count
        
        updateElements(elementList); //update the elements on the map with the list created
    }
    
    //method to update the elements on the map
    function updateElements(elements){
        for(let i=0; i<elements.length; i++){ //loop through the list of elements
            //update dimensions for the current element to be added to the map
            updateDimensions(parseFloat(containerRef.current.offsetHeight)/parseFloat(elements[i].height), parseFloat(containerRef.current.offsetWidth)/parseFloat(elements[i].width));
            //get height and width ratios for resizing the element positions
            const widthRatio = parseFloat(containerRef.current.offsetWidth)/parseFloat(elements[i].viewWidth);
            const heightRatio = parseFloat(containerRef.current.offsetHeight)/parseFloat(elements[i].viewHeight);
            //add the element to the map
            addElement(elements[i].elementType[0].toLocaleLowerCase(), widthRatio * parseFloat(elements[i].x), heightRatio * parseFloat(elements[i].y));
        }
    }

    //method to update the dimensions of the new element to be added to the map
    function updateDimensions(row = 10, col = 10){
        const h = containerRef.current.offsetHeight/row;
        const w = containerRef.current.offsetWidth/col;
        //set the height and width of the new element to be added to the map
        elementInfo.current = {height: h, width: w};

    }
    
    //method to add an element to the map
    function removeElement(element){
        element.id = "";
        element.style.visibility = "hidden";
    }

    //method to add an element to the map
    function addElement(elementName, tx=0, ty=0){
        let elementId = '';
        let elementType = '';
        let elementColor = '';
        let elementText = '';
        let changedTranslateOnce = false;

        //switch statement to set the element id, type, color, and text based on the element name
        switch(elementName){
            case 't':
                tableCount.current +=1;
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
        //function to handle the drag end event
        function handleStop(event, data) {
            
            event.preventDefault();
            event.stopPropagation();
            //set the x and y attributes of the element to the new position
            setTimeout(() => { //use timeout to do the operation in next frame so x and y attributes are not set to 0
                elementBeingDragged.current.setAttribute("x", elementBeingDragged.current.style.transform.split('(')[1].split('px')[0]);
                elementBeingDragged.current.setAttribute("y", elementBeingDragged.current.style.transform.split(',')[1].split('px')[0]);
            }, 10);
            const element = elementBeingDragged.current.getBoundingClientRect();
            const dragArea = dragZone.current.getBoundingClientRect();
            //check if the element is overlapping with the drag area
            const overlapping = !(
                element.right < dragArea.left || element.left > dragArea.right ||
                element.top > dragArea.bottom || element.bottom < dragArea.top
            );
            //if the element is overlapping with the drag area, remove the element
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
                removeElement(elementBeingDragged.current);
                elementBeingDragged.current = null;
                let foundSkipped = false; //flag to check if an element was skipped
                //loop through the elements to update the ids and text
                while(elementNumber<=elementCount){
                    console.log("element Count is: ", elementCount);
                    const element = document.getElementById(elementType[0] + elementNumber);
                    if(!element){   //if the element is not found, skip it for the first time(because one element was overwritten by react in place of the deleted one)
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
        //function to handle the drag start event
        function handleStart(event, data){
            event.preventDefault();
            event.stopPropagation();
            elementBeingDragged.current = event.target;
            
        }
        //function to handle the drag event
        function handleDrag(event, data){
            event.preventDefault();
            event.stopPropagation();
        }
        //create the new element
        const newElement = React.createElement(Draggable, {onStart:handleStart, onDrag:handleDrag, onStop:handleStop},
             React.createElement('div', {id:elementId, className:'border border-secondary rounded',
             style:{height:elementInfo.current.height, width:elementInfo.current.width, textAlign:"center",
             position:"absolute", display:"-webkit-inline-flex", top: top.current, justifyContent:"center",
             backgroundColor:elementColor, color:"white", transform:`translate(${tx}px, ${ty}px)`}},
             elementText));
        const newRoot = document.createElement("div");
        newRoot.style.width = "fit-content";
        newRoot.style.display = "inline-block";
        //render the new element
        ReactDOM.render(newElement, newRoot);
        containerRef.current.appendChild(newRoot);
        document.getElementById(elementId).setAttribute("x",""+tx);
        document.getElementById(elementId).setAttribute("y",""+ty);
        
        console.log(tx, ty);
        setTimeout(() => {  //wait for the element to be rendered before setting the transform
            document.getElementById(elementId).style.transform = "translate("+tx+"px,"+ty+"px)";
        }, 50);
        
    }

    //method to save elements to the database
    function saveElements(){
        let tableList = [];
        let doorList = [];
        let windowList = [];
        let rows = parseFloat(containerRef.current.offsetWidth);
        let cols = parseFloat(containerRef.current.offsetHeight);
        let positionArray = new Array(rows).fill(null).map(() => Array(cols).fill(0));
        //loop through the elements to check if they are inside the drag area and store if they are
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
        //send the list of elements to the database
        axios.put(baseUrl+'restaurantMap/' + restaurantId.current, {Table: tableList, Window: windowList, Door: doorList})
            .then(res => {
                console.log("Map saved successfully"); 
            })
            .catch(err => {
                console.log(err);
            });
    }
    //return the component
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