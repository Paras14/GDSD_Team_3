//import Swal from 'sweetalert2';
import axios from 'axios';
import { Global } from '../../helpers/Global';
import socket from './Socket';
import { removeSpacesMessages } from './format/removeSpacesMessages';

const baseUrl = Global.baseUrl;
const URI = `${baseUrl}chats/`;

export const submit = async ( message, receptor, //group, 
    responder, messageRespuesta, user, idMessageRespuesta, nombreMessageRespuesta, imagenRespuesta, setResponder, setIdMessageRespuesta, setMessageRespuesta, setImagenRespuesta, setNombreMessageRespuesta, setMessage, setRecienEnviado ) => {

  if ( removeSpacesMessages( message ) ) {

    //Swal.showLoading();
    if ( document.getElementById( `${receptor.id}` ) !== null ) {

      document.getElementById( `${receptor.id}` ).classList.remove( 'chatSeleccionado' );

    }

      
    console.log("Enviando: " + message + " a " + receptor.username + " con id " + receptor.id);
    const token = localStorage.getItem( 'token' );

    axios.post( URI, { user_emitter: user.id, user_receiver: receptor.id, text: message }, { headers: { 'Authorization': `Bearer ${token}` } } )   

    
    setMessage( '' );
    setRecienEnviado( true );

    await axios.get( `${baseUrl}chats/user/${user.id}` )
      .then( ( res ) => {

        socket.emit( 'message' );

      }
      );

    //Swal.close();

  } else {

    //Swal.fire( 'Mensaje vacío', 'No se puede enviar un message vacío', 'error' );

  }

};