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
    if ( document.getElementById( `${receptor}` ) !== null ) {

      document.getElementById( `${receptor}` ).classList.remove( 'chatSeleccionado' );

    }

      /*if ( responder ) {

        if ( messageRespuesta !== '' ) {

          axios.post( URI, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: receptor, message: message, respuesta: idMessageRespuesta, messageRespuesta, nombreEmisorRespuesta: nombreMessageRespuesta });

        } else {

          axios.post( URI, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: receptor, message: message, respuesta: idMessageRespuesta, imagenRespuesta: imagenRespuesta, nombreEmisorRespuesta: nombreMessageRespuesta });

        }

        setResponder( false );
        setIdMessageRespuesta( '' );
        setMessageRespuesta( '' );
        setImagenRespuesta( '' );
        setNombreMessageRespuesta( '' );
        document.querySelector( '#botonResponder' ).classList.add( 'ocultar' );

      } else {*/

        const token = localStorage.getItem( 'token' );

        axios.post( URI, { user_emitter: user.id, user_receiver: receptor, text: message },
          { headers: { Authorization: `${token}` } });

      //}

    
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