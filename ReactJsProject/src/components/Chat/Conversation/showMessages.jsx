import React from 'react';
//import { mostrarOpcionesMensaje } from '../optionsMessage/optionsMessage';
import { formatDate } from '../format/formatDate';
import { getOrientation, getEnlace, getMargen, getOrigenMensaje, getOrigenMensajeRespuesta } from '../format/formatDesignMessage';
import PropTypes from 'prop-types';

export const Messages = ({ messages, user, receptor, //group, 
    users, //myGroups, 
    setResponse, setIdMensajeRespuesta, setMensajeRespuesta, setImagenRespuesta, setNombreMensajeRespuesta }) => {

  let nombreAnterior = '';

  const setNombreAnterior = ( nombre ) => {

    nombreAnterior = nombre;

  };

  return (
    <div>
      {
        messages.length !== 0 && messages.sort(( a, b ) => {

          return new Date( a.createdAt ) - new Date( b.createdAt );
    
        }).map( ( mensaje, index ) => (
          ( ( mensaje.user_receiver === receptor.id ) || ( mensaje.user_emitter === receptor.id ) ) //&& mensaje.id_grupo_receptor !== 1
            ? <div className={`d-flex flex-row ${getOrientation( user, mensaje )}`}
              id={mensaje.id}
              key = {index}>
              <div className={`d-flex flex-row shadow ${getOrigenMensaje( user, mensaje )} ${getMargen( mensaje, nombreAnterior )}`}>
                <div className="pt-1 tamañoMaximoMensaje">
                  {/*( group !== {} && receptor === '' && mensaje.nombre_usuario_emisor !== user.nombre && mensaje.nombre_usuario_emisor !== nombreAnterior && !mensaje.administracion )
                    ? <p className="fw-bold mb-0">{mensaje.nombre_usuario_emisor}</p>
        : <div></div>*/}
                  {mensaje.text !== null
                    ? <p className="small cols-12">{mensaje.text}</p>
                    : <p className="small cols-12">
                      <img alt="imagenEnviada"
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        className="tamañoMaximoImagen"></img>
                    </p>}
                </div>
                <div className="pt-1">
                  <p className="small text-muted mb-1 cols-4 tamnyoHora">{formatDate( mensaje.createdAt )}</p>
                  {setNombreAnterior( mensaje.user_emitter )}
                </div>
                 
    
              </div>
            </div>
            : <div key = {index}></div>
        ) )
      }
    </div>
  );

};

