import React, { useEffect, useRef, useState } from 'react';
import { photoProfile } from '../format/photoProfile';
import { submit } from '../send';
import { Messages } from './showMessages';

//We xport all this info to the Chat.jsx file
export const Conversation = ({ users, messages, user, receptor, conexion, message, setMessage, setReceptor, setConexion, response, setResponse, setRecentlySent }) => {

  const messageEndRef = useRef( null );
  const [idMessageRespuesta, setIdMessageRespuesta] = useState( '' );
  const [messageRespuesta, setMessageRespuesta] = useState( '' );
  const [imagenRespuesta, setImagenRespuesta] = useState( '' );
  const [nombreMessageRespuesta, setNombreMessageRespuesta] = useState( '' );

  //This useEffect is to scroll down the chat when a new message is sent
  useEffect( () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, [messages, user, receptor, conexion, message, setMessage]);



  //This useEffect is to scroll down the chat when a new message is sent
  useEffect( () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, []);

  return (
    ( receptor !== null && receptor.id !== undefined ) 
    ?
    <div className="col-md-6 col-lg-7 col-xl-8 row-10" id="panelChat">
      <div className="divNameUser">
        <h3 className="h3NameUser">
          <button className="botonTransparente divObjectsSend align-items-center">
            <div id="imagenUser">
              {photoProfile( receptor, users, 80 )}
            </div>
            <b><div id="labelNameUser">{ receptor.username }</div></b>
          </button>
          {conexion}
        </h3>
      </div>
      <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatMessages">
        <div className="pt-3 pe-3 mh-100"
          id="divRef"
          data-mdb-perfect-scrollbar="true"
          position= "relative"
          overflow-y="scroll">
          <Messages
            messages={messages}
            user={user}
            receptor={receptor}
            //group={group}
            users={users}
            //myGroups={myGroups}
            setResponse={setResponse}
            setIdMessageRespuesta={setIdMessageRespuesta}
            setMessageRespuesta={setMessageRespuesta}
            setImagenRespuesta={setImagenRespuesta}
            setNombreMessageRespuesta={setNombreMessageRespuesta}
          />
          <div ref={messageEndRef}/>
        </div>
      </div>
      <div className="text-muted d-flex justify-content-start pe-3 pt-3 mt-2 divObjectsSend">
        <input className="input2"
          id="inputMessage-enviar-chat"
          type="text"
          value={message}
          placeholder="Type a message here..."
          onChange={( e ) => setMessage( e.target.value )}
        />
        
        <button className="ms-3 botonTransparente divObjectsSend align-items-center"
          type="submit"
          id="botonEnviar"
          onClick={() => submit( message, receptor, response, messageRespuesta, user, idMessageRespuesta, nombreMessageRespuesta, imagenRespuesta, setResponse, setIdMessageRespuesta, setMessageRespuesta, setImagenRespuesta, setNombreMessageRespuesta, setMessage, setRecentlySent )}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
            </svg>
        </button>
      </div>
    </div>
    :
    <div className="col-md-6 col-lg-7 col-xl-8 row-10" id="panelChat">
      <div className="divNameUser">
        <h3 className="h3NameUser">
          <button className="botonTransparente divObjectsSend align-items-center">
          </button>
          {conexion}
        </h3>
      </div>
      <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatMessages">
        <div className="pt-3 pe-3 mh-100"
          id="divRef"
          data-mdb-perfect-scrollbar="true"
          position= "relative"
          overflow-y="scroll">
          <div ref={messageEndRef}/>
        </div>
      </div>
      <div className="text-muted d-flex justify-content-start pe-3 pt-3 mt-2 divObjectsSend">
        <input className="input2"
          id="inputMessage-enviar-chat"
          type="text"
          value={message}
          placeholder="Type a message here..."
          onChange={( e ) => setMessage( e.target.value )}
        />
        
        <button className="ms-3 botonTransparente divObjectsSend align-items-center"
          type="submit"
          id="botonEnviar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
            </svg>
        </button>
      </div>
    </div>
  );

};

