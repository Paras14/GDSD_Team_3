import React, { useEffect, useState } from 'react';
import { setUpChat } from '../../helpers/SetUpChat';
import { ActiveChats } from './ActiveChats/ActiveChats.jsx';
import { Conversation } from './Conversation/Conversation';
import '../../styles/Chat.css';
import { isAuthorized } from '../../helpers/isAuthorized.js';
import { useNavigate, useParams } from '../../../node_modules/react-router/dist/index.js';
import socket from './Socket';
import axios from 'axios';
import { Global } from '../../helpers/Global.js';

export const Chat = () => {

  const baseUrl = Global.baseUrl;

  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const { receptorActual } = useParams();
  const [receptor, setReceptor] = useState( null );
  const [conexion, setConexion] = useState( '' );
  const [message, setMessage] = useState( '' );
  const [user, setUser] = useState( null );
  const [startingChat, setStartingChat] = useState( false );
  const [response, setResponse] = useState( false );
  const [recentlySent, setRecentlySent] = useState( false );
  const [messagesDESC, setMessagesDESC] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [messagesSearch, setMessagesSearch] = useState([]);
  const [firstChat, setFirstChat] = useState( false );


  // With this function we revise if the user is loged or not, and then, it saves the receptor user in the state.
  useEffect( () => {

    async function getReceptor() {
      // Check if logged in
      if ( !isauthorized ) {
        navigate( '/signIn' );
      } else {
        // Name of document
        document.title = 'Chat';        
        // Get user from local storage
        setUser( JSON.parse( localStorage.getItem( 'user' ) ) );

        // Get receptor from url:
        // If receptor is not null, we call the API to get the receptor user and we put as true the state startingChat
        if ( receptorActual !== undefined ) {
          const receptor = await axios.get( `${baseUrl}users/${receptorActual}` );
          setReceptor( receptor.data );
          setStartingChat( true );
          document.title = `Chating with ${receptorActual}`;
        }
      }
    }

    getReceptor();
    
  }, []);

  const isNotReceptorInUsers = ( receptor, users ) => {
    let isNotReceptorInUsers = true;
    users.forEach( user => {
      if ( user.id === receptor.id ) {
        isNotReceptorInUsers = false;
      }
    });
    return isNotReceptorInUsers;
  };

  // With this function we call the API to get the messages between the user loged and the receptor
  useEffect( () => {

    async function getConversationsAndMessages() {
      // If the user is logged we get the info about all the conversations and the messages with the current receptor
      if (user) {

        // With this function we get the info about all the conversations that the user logged has
        setUpChat( user, setUsers, setMessages, setMessagesDESC, setMessagesSearch);

        const conversations = await axios.get( `${baseUrl}chats/user/${user.id}` );
          
        setUsers( conversations.data );
  
        // Here we get all the messages between the user logged and the receptor
          const messaggesFromTheCoversationBetweenUserLoggedAndreceptor = await axios.get( `${baseUrl}chats/conversation/`, {
            params: {
              userid1: user.id,
              userid2: receptorActual
            }
          });
          
          setMessages(messaggesFromTheCoversationBetweenUserLoggedAndreceptor.data);
          setMessagesSearch( messaggesFromTheCoversationBetweenUserLoggedAndreceptor.data );

        if ( receptor !== null && isNotReceptorInUsers( receptor, users ) ) {
          setUsers( users => [...users, receptor] );

          // If the receptor is not in the users state we put as true the state firstChat
          setFirstChat( true );

        }
          
        
      }
    }

    getConversationsAndMessages();

  }, [user, receptor]);


  // With this function we get the messages between the user logged and the receptor and all the conversations of the user logged
  // but when the messages and the users change it updates the socket client
  useEffect( () => {

    async function getConversationsAndMessagesUpdatingTheSocketClient() {

      // We open a live channel with the server
      socket.on( 'messages', async () => {
        // If the user is logged we get the info about all the conversations and the messages with the current receptor
        if (user) {
          // With this function we get the info about all the conversations that the user logged has
          setUpChat( user, setUsers, setMessages, setMessagesDESC, setMessagesSearch, false);
          const messaggesFromTheCoversationBetweenUserLoggedAndreceptor = await axios.get( `${baseUrl}chats/conversation/`, {
                params: {
                  userid1: user.id,
                  userid2: receptorActual
                }
              });
              
          setMessages( messaggesFromTheCoversationBetweenUserLoggedAndreceptor.data );
          setMessagesSearch( messaggesFromTheCoversationBetweenUserLoggedAndreceptor.data );
        }
  
      });
  
  
      return () => {
  
        socket.off();
  
      };
  

    }

    getConversationsAndMessagesUpdatingTheSocketClient();
    
  }, [messages, users]);



  return (
    user === null 
      ? <div></div>
      : firstChat || startingChat
        ? <div className="row justify-content-center pb-5">
          <section className="botonTransparente">
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
                          messagesDESC={ messagesDESC }
                          setResponse={ setResponse }
                          messagesSearch={ messagesSearch }
                          setMessagesSearch={ setMessagesSearch }
                          recentlySent={ recentlySent }
                          setRecentlySent={ setRecentlySent }
                        />
                        <Conversation
                          users={ users }
                          messages={ messages }
                          user={ user }
                          receptor={ receptor }
                          conexion={ conexion }
                          message={ message }
                          setMessage={ setMessage }
                          setReceptor={ setReceptor }
                          setConexion={ setConexion }
                          response={ response }
                          setResponse={ setResponse }
                          setRecentlySent={ setRecentlySent }
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
                <h1 className="mt-5">Risto is loading your chats...</h1>
                <div className="dropdown centrar mt-5">
                    <button className="botonTransparente3"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={ () => {
                      navigate( '/' );
                    }}
                    >
                    
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="150" 
                        height="150" 
                        fill="currentColor" 
                        className="bi bi-house" 
                        viewBox="0 0 16 16">
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                    </svg>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
  );

};