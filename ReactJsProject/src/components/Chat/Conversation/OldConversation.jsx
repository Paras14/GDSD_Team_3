//import Input from '@material-ui/core/Input';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Global } from '../../../helpers/Global.js';
//import { infoGroup } from '../infoGroups/infoGroups';
import { photoProfile } from '../format/photoProfile';
//import { mostrarPosibilidadesEnviar } from '../attach/attach';
import { submit } from '../send';
import { Messages } from './showMessages';
//import { infoUser } from '../infoUser/infoUser';

export const Conversation = ({ users, messages, user, receptor, conexion, message, setMessage, //group, myGroups, setGroup, 
    setReceptor, setConexion, responder, setResponder, setRecienEnviado }) => {

  const baseUrl = Global.baseUrl;
  const messageEndRef = useRef( null );
  const [idMessageRespuesta, setIdMessageRespuesta] = useState( '' );
  const [messageRespuesta, setMessageRespuesta] = useState( '' );
  const [imagenRespuesta, setImagenRespuesta] = useState( '' );
  const [nombreMessageRespuesta, setNombreMessageRespuesta] = useState( '' );

  useEffect( () => {

    messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

  }, [messages, user, receptor, conexion, message, setMessage, //group
]);

  useEffect( () => {

    //document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
    //document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

    messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

  });

  /*const setMiembrosGrupo = ( id ) => {

    if ( group !== {} && receptor === '' ) {

      axios.get( `${baseUrl}participantsGroups/users/${id}` )
        .then( res => {

          infoGroup( myGroups, id, res.data, user, setGroup, setReceptor, setConexion );

        });

    } else if ( group.id === undefined && receptor !== '' ) {

      infoUser( users, receptor, user, setGroup, setReceptor );

    }

  };*/

  const cancelarRespuesta = () => {

    setResponder( false );
    setIdMessageRespuesta( '' );
    setMessageRespuesta( '' );
    setImagenRespuesta( '' );
    setNombreMessageRespuesta( '' );
    document.querySelector( '#botonResponder' ).classList.add( 'ocultar' );

  };

  return (
    <div className="col-md-6 col-lg-7 col-xl-8 row-10"
      id="panelChat">
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
        <div className="ocultar"
          id="botonResponder">
          <button className="ms-3 botonTransparente divObjectsSend align-items-center"
            onClick={() => cancelarRespuesta()}>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-x responseIcon"
              viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            Responder
          </button>
        </div>
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