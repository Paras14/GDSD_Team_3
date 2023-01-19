import React from 'react';
//import { mostrarOpcionesMensaje } from '../optionsMessage/optionsMessage';
import { formatDate } from '../format/formatDate';
import { getOrientation, getEnlace, getMargen, getOrigenMensaje, getOrigenMensajeRespuesta } from '../format/formatDesignMessage';
import PropTypes from 'prop-types';

export const Messages = ({ messages, user, receptor, //group, 
    users, //myGroups, 
    setResponder, setIdMensajeRespuesta, setMensajeRespuesta, setImagenRespuesta, setNombreMensajeRespuesta }) => {

  let nombreAnterior = '';

  const setNombreAnterior = ( nombre ) => {

    nombreAnterior = nombre;

  };

  return (
    <div>
      {
        messages.length !== 0 && messages.map( ( mensaje, index ) => (
          ( ( mensaje.user_receiver === receptor ) || ( mensaje.emitter === receptor ) ) //&& mensaje.id_grupo_receptor !== 1
            ? <div className={`d-flex flex-row ${getOrientation( user, mensaje )}`}
              id={mensaje.id}
              key = {index}>
              <div className={`d-flex flex-row ${getOrigenMensaje( user, mensaje )} ${getMargen( mensaje, nombreAnterior )}`}>
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
                 <li className=" d-none nav-item">
                    <button className="btn nav-link"
                      id="navbarDropdownBtnChat"
                      aria-expanded="false"
                      //onClick={() => mostrarOpcionesMensaje( mensaje, user, users, myGroups, setResponder, setIdMensajeRespuesta, setMensajeRespuesta, setImagenRespuesta, setNombreMensajeRespuesta )}
                      >
                      <svg xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="15"
                        fill="currentColor"
                        className="bi bi-three-dots-vertical">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                      </svg>
                    </button>
                  </li>
    
              </div>
            </div>
            : <div key = {index}></div>
        ) )
      }
    </div>
  );

};

/*
Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  receptor: PropTypes.string.isRequired,
  //group: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  //myGroups: PropTypes.array.isRequired,
  setResponder: PropTypes.func.isRequired,
  setIdMensajeRespuesta: PropTypes.func.isRequired,
  setMensajeRespuesta: PropTypes.func.isRequired,
  setImagenRespuesta: PropTypes.func.isRequired,
  setNombreMensajeRespuesta: PropTypes.func.isRequired
};
*/