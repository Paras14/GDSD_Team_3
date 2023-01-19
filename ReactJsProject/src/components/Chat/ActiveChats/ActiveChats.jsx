import React, { useEffect, useState } from 'react';
//import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import socket from '../Socket';
import { Global } from '../../../helpers/Global.js';
//import { chatUsers } from '../createNewChats/newChat';
//import { chatGroups } from '../createNewChats/newGroup';
import axios from 'axios';
import { eventKeyboard } from '../eventsKeyboard';
//import { getGrupo } from '../format/getGroup';
//import { setMiembrosGrupo } from '../format/setMiembrosGrupo';
import { setConection } from '../format/setConection';
import { Chats } from './showChats';

export const ActiveChats = ({ users, messages, user, setReceptor, setConexion, setMessage, receptor, //group, setGroup, myGroups, configurationGroups, setConfigurationGroups, 
setIniciandoChat, messagesDESC, setResponder, messagesBuscar, setMessagesBuscar, recienEnviado, setRecienEnviado }) => {

  const baseUrl = Global.baseUrl;
  const [buscar, setBuscar] = useState( '' );

  useEffect( () => {

    socket.emit( 'connected', user.nombre );

  }, [user.nombre]);

  useEffect( () => {

    if ( receptor === -1 //&& group.nombre === undefined 
    ) {

      const messages = [];
      messagesBuscar.reverse().forEach( ( mensaje ) => {

        //if ( mensaje.id_grupo_receptor !== 1 ) {

          messages.push( mensaje );

        //}

      });

      const firstMessage = messages[0];

      /*if ( firstMessage.id_grupo_receptor !== null ) {

        setReceptor( '' );
        setMiembrosGrupo( firstMessage.id_grupo_receptor, setConfigurationGroups, myGroups, users, user, setGroup, setReceptor, setConection );
        setGroup( getGrupo( firstMessage.id_grupo_receptor, myGroups ) );
        document.title = `Chateando en ${getGrupo( firstMessage.id_grupo_receptor, myGroups ).nombre}`;

      } else */ if ( firstMessage.user_receiver !== null ) {

        setConection( firstMessage.user_receiver !== user.id ? firstMessage.user_receiver : firstMessage.user_emitter, users, setConexion );
        setReceptor( firstMessage.user_receiver !== user.id ? firstMessage.user_receiver : firstMessage.user_emitter );
        //setGroup({});
        document.title = `Chateando con ${firstMessage.user_receiver !== user.id ? firstMessage.user_receiver : firstMessage.user_emitter}`;

      }

      if ( document.getElementById( `${( firstMessage.user_receiver !== null && firstMessage.user_receiver === user.id ) ? firstMessage.user_emitter : firstMessage.user_receiver}` ) !== null ) {

        document.getElementById( `${( firstMessage.user_receiver !== null && firstMessage.user_receiver === user.id ) ? firstMessage.user_emitter : firstMessage.user_receiver}` ).classList.add( 'chatSeleccionado' );

      }

    } else {

      if ( receptor !== -1 //&& group.nombre === undefined 
      ) {

        //setGroup({});
        setConection( receptor, users, setConexion );

      } /*else if ( receptor === '' && group.nombre !== undefined ) {

        setReceptor( '' );
        setMiembrosGrupo( group.id, setConfigurationGroups, myGroups, users, user, setGroup, setReceptor, setConexion );

      } */

      document.querySelectorAll( '.chatSeleccionado' ).forEach( document => {

        document.classList.remove( 'chatSeleccionado' );

      });

      if ( document.getElementById( `${receptor}` ) !== null ) {

        document.getElementById( `${receptor}` ).classList.add( 'chatSeleccionado' );

      }

    }

  }, [messagesBuscar]);

  /*
  useEffect( () => {

    if ( configurationGroups !== '' ) {

      setReceptor( '' );
      setConexion( configurationGroups );

    }

  }, [configurationGroups]);
  */

  useEffect( () => {

    document.querySelector( '#inputMessage-enviar-chat' ).addEventListener( 'keyup', function ( event ) {

      event.preventDefault();
      eventKeyboard( event );

    });

  }, []);

  useEffect( () => {

    if ( buscar !== '' ) {

      axios.post( `${baseUrl}chats/chat_by_entry/`, { buscar, nombre_user: user.nombre })
        .then( res => {

          if ( res.data[0] === undefined ) {

            setMessagesBuscar([]);

          } else {

            setMessagesBuscar( res.data );

          }

        });

    } else {

      setMessagesBuscar( messages );

    }

  }, [buscar]);

  return (
    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 botonTransparente marginChatActivos">

      <div className="p-3 botonTransparente">

        <div className="input-group rounded mb-3 botonTransparente divObjectsSend">
          <input className="input3"
            type="search"
            size="15"
            placeholder="Search a message"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={( e ) => {

              setBuscar( e.target.value );
              setRecienEnviado( false );

            }} />
          <div className="dropdown">
            <button className="botonTransparente2 btnAñadirChats"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16">
                <path fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg>
            </button>
          </div>
        </div>
        <Chats
          users={users}
          messagesBuscar={messagesBuscar}
          receptor={receptor}
          //group={group}
          setResponder={setResponder}
          setReceptor={setReceptor}
          //setGroup={setGroup}
          user={user}
          setMessage={setMessage}
          setConexion={setConexion}
          //myGroups={myGroups}
          //setConfigurationGroups={setConfigurationGroups}
          messages={messages}
          recienEnviado={recienEnviado}
        />

      </div>

    </div>
  );

};

/*
ActiveChats.propTypes = {
  users: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setReceptor: PropTypes.func.isRequired,
  setConexion: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  receptor: PropTypes.string.isRequired,
  //group: PropTypes.object.isRequired,
  //setGroup: PropTypes.func.isRequired,
  //myGroups: PropTypes.array.isRequired,
  //setConfigurationGroups: PropTypes.func.isRequired,
  //configurationGroups: PropTypes.node.isRequired,
  setIniciandoChat: PropTypes.func.isRequired,
  messagesDESC: PropTypes.array.isRequired,
  setResponder: PropTypes.func.isRequired,
  messagesBuscar: PropTypes.array.isRequired,
  setMessagesBuscar: PropTypes.func.isRequired,
  recienEnviado: PropTypes.bool.isRequired,
  setRecienEnviado: PropTypes.func.isRequired
};
*/