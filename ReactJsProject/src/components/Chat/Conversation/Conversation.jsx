import React, { useEffect, useRef, useState } from 'react';
import { photoProfile } from '../format/photoProfile';
import { submit } from '../send';
import { Messages } from './showMessages';

//We xport all this info to the Chat.jsx file
export const Conversation = ({ users, messages, user, receptor, conexion, message, setMessage, setReceptor, setConexion, responder, setResponder, setRecienEnviado }) => {

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
    <div className="col-md-6 col-lg-7 col-xl-8 row-10" id="panelChat">
        <div name="this is the conversation page"></div>
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
            setResponder={setResponder}
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
        
        <button className="btn ms-1 text-muted divObjectsSend align-items-center"
         ><i className="fas fa-paperclip clipIcon"></i></button>
        <button className="ms-3 botonTransparente divObjectsSend align-items-center"
          type="submit"
          id="botonEnviar"
          onClick={() => submit( message, receptor, responder, messageRespuesta, user, idMessageRespuesta, nombreMessageRespuesta, imagenRespuesta, setResponder, setIdMessageRespuesta, setMessageRespuesta, setImagenRespuesta, setNombreMessageRespuesta, setMessage, setRecienEnviado )}><i className="fas fa-paper-plane sendIcon"></i></button>
      </div>
    </div>
  );

};

/*
Conversation.propTypes = {
  users: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  receptor: PropTypes.string.isRequired,
  conexion: PropTypes.node.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  //group: PropTypes.object.isRequired,
  //myGroups: PropTypes.array.isRequired,
  //setGroup: PropTypes.func.isRequired,
  setReceptor: PropTypes.func.isRequired,
  setConexion: PropTypes.func.isRequired,
  responder: PropTypes.bool.isRequired,
  setResponder: PropTypes.func.isRequired,
  setRecienEnviado: PropTypes.func.isRequired
};
*/