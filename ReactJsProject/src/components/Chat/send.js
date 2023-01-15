//import Swal from 'sweetalert2';
import axios from 'axios';
import { Global } from '../../helpers/Global';
import socket from './Socket';
import { eliminarEspaciosMensajes } from './format/removeSpacesMessages';

const baseUrl = Global.baseUrl;
const URI = `${baseUrl}chats/`;

export const submit = async ( mensaje, receptor, //group, 
    responder, mensajeRespuesta, user, idMensajeRespuesta, nombreMensajeRespuesta, imagenRespuesta, setResponder, setIdMensajeRespuesta, setMensajeRespuesta, setImagenRespuesta, setNombreMensajeRespuesta, setMensaje, setRecienEnviado ) => {

  if ( eliminarEspaciosMensajes( mensaje ) ) {

    //Swal.showLoading();
    if ( document.getElementById( `${receptor}` ) !== null ) {

      document.getElementById( `${receptor}` ).classList.remove( 'chatSeleccionado' );

    }

      if ( responder ) {

        if ( mensajeRespuesta !== '' ) {

          axios.post( URI, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: receptor, mensaje: mensaje, respuesta: idMensajeRespuesta, mensajeRespuesta, nombreEmisorRespuesta: nombreMensajeRespuesta });

        } else {

          axios.post( URI, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: receptor, mensaje: mensaje, respuesta: idMensajeRespuesta, imagenRespuesta: imagenRespuesta, nombreEmisorRespuesta: nombreMensajeRespuesta });

        }

        setResponder( false );
        setIdMensajeRespuesta( '' );
        setMensajeRespuesta( '' );
        setImagenRespuesta( '' );
        setNombreMensajeRespuesta( '' );
        document.querySelector( '#botonResponder' ).classList.add( 'ocultar' );

      } else {

        axios.post( URI, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: receptor, mensaje });

      }

    
    setMensaje( '' );
    setRecienEnviado( true );

    await axios.get( `${baseUrl}chats/${user.nombre}` )
      .then( ( res ) => {

        socket.emit( 'mensaje' );

      }
      );

    //Swal.close();

  } else {

    //Swal.fire( 'Mensaje vacío', 'No se puede enviar un mensaje vacío', 'error' );

  }

};