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

export const ActiveChats = ({ users, messages, user, setReceptor, setConexion, setMessage, receptor, //group, setGroup, myGroups, configurationGroups, setConfigurationGroups, setIniciandoChat, 
 messagesDESC, setResponse, messagesSearch, setMessagesSearch, recentlySent, setRecentlySent }) => {

  const baseUrl = Global.baseUrl;
  const [buscar, setBuscar] = useState( '' );

  useEffect( () => {

    socket.emit( 'connected', user.username );

  }, [user.username]);

  useEffect( () => {

    if ( receptor === null 
    ) {

      const messages = [];
      messagesSearch.reverse().forEach( ( mensaje ) => {

        //if ( mensaje.id_grupo_receptor !== 1 ) {

          messages.push( mensaje );

        //}

      });

      const firstMessage = messages[0];

      if ( firstMessage.user_receiver !== null ) {

        setConection( firstMessage.user_receiver !== user.id ? firstMessage.user_receiver : firstMessage.user_emitter, users, setConexion );
        setReceptor( firstMessage.user_receiver !== user.id ? firstMessage.user_receiver : firstMessage.user_emitter );
        //setGroup({});
        document.title = `Chating with ${receptor.username}`;

      }

      if ( document.getElementById( `${( firstMessage.user_receiver !== null && firstMessage.user_receiver === user.id ) ? firstMessage.user_emitter : firstMessage.user_receiver}` ) !== null ) {

        document.getElementById( `${( firstMessage.user_receiver !== null && firstMessage.user_receiver === user.id ) ? firstMessage.user_emitter : firstMessage.user_receiver}` ).classList.add( 'chatSeleccionado' );

      }

    } else {

      if ( receptor !== null //&& group.nombre === undefined 
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

      if ( document.getElementById( `${receptor.id}` ) !== null ) {

        document.getElementById( `${receptor.id}` ).classList.add( 'chatSeleccionado' );

      }

    }

  }, [messagesSearch]);

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

    /*
    if ( buscar !== '' ) {

      axios.post( `${baseUrl}chats/chat_by_entry/`, { buscar, nombre_user: user.nombre })
        .then( res => {

          if ( res.data[0] === undefined ) {

            setMessagesSearch([]);

          } else {

            setMessagesSearch( res.data );

          }

        });

    } else {

      */
      setMessagesSearch( messages );

    //}


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
              setRecentlySent( false );

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
          messagesSearch={messagesSearch}
          receptor={receptor}
          setResponse={setResponse}
          setReceptor={setReceptor}
          user={user}
          setMessage={setMessage}
          setConexion={setConexion}
          messages={messages}
        />

      </div>

    </div>
  );

};

