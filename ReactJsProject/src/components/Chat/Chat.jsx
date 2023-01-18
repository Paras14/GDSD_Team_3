import React, { useEffect, useState } from 'react';
import { setUpChat } from '../../helpers/SetUpChat';
import { ActiveChats } from './ActiveChats/ActiveChats.jsx';
import { Conversation } from './Conversation/Conversation';
import '../../styles/Chat.css';
import { isAuthorized } from '../../helpers/isAuthorized.js';
import { useNavigate, useParams } from '../../../node_modules/react-router/dist/index.js';
import socket from './Socket';
import axios from 'axios';
//import { Header } from '../components/header';
//import { Footer } from '../components/footer';
//import { IniciarChat } from '../components/chat/IniciarChat';

export const Chat = () => {

  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const { receptorActual } = useParams();
  const [receptor, setReceptor] = useState( '' );
  const [conexion, setConexion] = useState( '' );
  const [message, setMessage] = useState( '' );
  //const [configurationGroups, setConfigurationGroups] = useState( '' );
  const [user, setUser] = useState( null );
  const [conMessages, setConMessages] = useState( false );
  const [iniciandoChat, setIniciandoChat] = useState( false );
  const [responder, setResponder] = useState( false );
  const [recienEnviado, setRecienEnviado] = useState( false );
  //const [group, setGroup] = useState({});
  const [messagesDESC, setMessagesDESC] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  //const [myGroups, setMyGroups] = useState([]);
  const [messagesBuscar, setMessagesBuscar] = useState([]);

  useEffect( () => {

    if ( !isauthorized ) {

      navigate( '/signIn' );

    } else {

      document.title = 'Chat';

      const useremail = localStorage.getItem( 'useremail' );
      axios.get( `http://localhost:8080/users/email/${useremail}` ).then( ( response ) => {

        setUser( response.data );

        }).catch( ( error ) => {

            console.log( error );

        });

      //setUser( JSON.parse( localStorage.getItem( 'user' ) ) );
      if ( receptorActual !== undefined ) {

        setReceptor( receptorActual );
        setIniciandoChat( true );
        document.title = `Chateando con ${receptorActual}`;

      }

    }

  }, []);

  useEffect( () => {

    if ( user !== null ) {

      setUpChat( user, setUsers, setMessages, setMessagesDESC, //setMyGroups, 
        setMessagesBuscar );

    }

  }, [user]);

  useEffect( () => {

    socket.on( 'messages', () => {

      setUpChat( user, setUsers, setMessages, setMessagesDESC, //setMyGroups, 
        setMessagesBuscar, false );

    });


    return () => {

      socket.off();

    };

  }, [messages, users]);

  useEffect( () => {

    if ( messages.length !== 0 //&& myGroups.length !== 0 
        && user !== null ) {

      //const idGroups = [];
      setMessagesBuscar( messages );

      /*myGroups.forEach( ( group ) => {

        idGroups.push( group.id );

      });*/

      messages.forEach( ( message ) => {

        //if ( message.id_grupo_receptor !== 1 ) {

          setConMessages( true );

        //}

      });

    }

  }, [messages, //myGroups, 
    user]);


  return (
    user === null || users.length === 0 || messages.length === 0 || messagesDESC.length === 0 // || myGroups.length === 0
      ? <div></div>
      : conMessages || iniciandoChat
        ? <div className="row justify-content-center">
          <section className="botonTransparente mt-5">
            <div className="container py-5 botonTransparente" >
              <div className="row botonTransparente">
                <div className="col-md-12 botonTransparente">
                  <div className="card botonTransparente"
                    id="chat3"
                    border-radius= "15px">
                    <div className="card-body botonTransparente">
                      <div className="row botonTransparente">
                        <ActiveChats
                          users={ users }
                          messages={ messages }
                          user={ user }
                          setReceptor={ setReceptor }
                          setConexion={ setConexion }
                          setMessage={ setMessage }
                          receptor={ receptor }
                          //group={ group }
                          //setGroup={ setGroup }
                          //myGroups={ myGroups }
                          //configurationGroups={ configurationGroups }
                          //setConfigurationGroups={ setConfigurationGroups }
                          setIniciandoChat={ setIniciandoChat }
                          messagesDESC={ messagesDESC }
                          setResponder={ setResponder }
                          messagesBuscar={ messagesBuscar }
                          setMessagesBuscar={ setMessagesBuscar }
                          recienEnviado={ recienEnviado }
                          setRecienEnviado={ setRecienEnviado }
                        />
                        <Conversation
                          users={ users }
                          messages={ messages }
                          user={ user }
                          receptor={ receptor }
                          conexion={ conexion }
                          message={ message }
                          setMessage={ setMessage }
                          //group={ group }
                          //myGroups={ myGroups }
                          //setGroup={ setGroup }
                          setReceptor={ setReceptor }
                          setConexion={ setConexion }
                          responder={ responder }
                          setResponder={ setResponder }
                          setRecienEnviado={ setRecienEnviado }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        : <div className="row justify-content-center">
          <div className="mt-5 centrar">
            <div className="mt-5 centrar">
                <div className="mt-5">
                <h1 className="mt-5">Inicia un nuevo chat para comenzar a chatear</h1>
                <div className="dropdown centrar mt-5">
                    <button className="botonTransparente3"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="150"
                        height="150"
                        fill="currentColor"
                        className="bi bi-plus-lg"
                        viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
  );

};