import React from 'react';
//import { mostrarOpcionesMensaje } from '../optionsMessage/optionsMessage';
import { formatDate } from '../format/formatDate';
import { getOrientation, getEnlace, getMargen, getOrigenMensaje, getOrigenMensajeRespuesta } from '../format/formatDesignMessage';
import PropTypes from 'prop-types';

export const Messages = ({ mensajes, user, receptor, //group, 
    users, //myGroups, 
    setResponder, setIdMensajeRespuesta, setMensajeRespuesta, setImagenRespuesta, setNombreMensajeRespuesta }) => {

  let nombreAnterior = '';

  const setNombreAnterior = ( nombre ) => {

    nombreAnterior = nombre;

  };

  return (
    <div>
      {
        mensajes.length !== 0 && mensajes.map( ( mensaje, index ) => (
          ( ( mensaje.nombre_usuario_receptor === receptor ) || ( mensaje.nombre_usuario_emisor === receptor ) ) //&& mensaje.id_grupo_receptor !== 1
            ? <div className={`d-flex flex-row ${getOrientation( user, mensaje )}`}
              id={mensaje.id}
              key = {index}>
              <div className={`d-flex flex-row ${getOrigenMensaje( user, mensaje )} ${getMargen( mensaje, nombreAnterior )}`}>
                <div className="pt-1 tamañoMaximoMensaje">
                  {/*( group !== {} && receptor === '' && mensaje.nombre_usuario_emisor !== user.nombre && mensaje.nombre_usuario_emisor !== nombreAnterior && !mensaje.administracion )
                    ? <p className="fw-bold mb-0">{mensaje.nombre_usuario_emisor}</p>
        : <div></div>*/}
                  {mensaje.respuesta !== null
                    ? mensaje.mensajeRespuesta !== null
                      ? <a href={getEnlace( mensaje )}>
                        <div className={getOrigenMensajeRespuesta( user, mensaje )}>
                          <p className="fw-bold mb-0">{mensaje.nombreEmisorRespuesta}</p>
                          <p className="small cols-12 mb-2">{mensaje.mensajeRespuesta}</p>
                        </div>
                      </a>
                      : <a href={getEnlace( mensaje )}>
                        <div className={getOrigenMensajeRespuesta( user, mensaje )}>
                          <p className="fw-bold mb-0">{mensaje.nombreEmisorRespuesta}</p>
                          <p className="small cols-12">
                            <img alt="imagenEnviada"
                              src={mensaje.imagenRespuesta}
                              className="tamañoMaximoImagen mb-2"></img>
                          </p>
                        </div>
                      </a>
                    : <div></div>}
                  {mensaje.mensaje !== null
                    ? <p className="small cols-12">{mensaje.mensaje}</p>
                    : <p className="small cols-12">
                      <img alt="imagenEnviada"
                        src={mensaje.imagen}
                        className="tamañoMaximoImagen"></img>
                    </p>}
                </div>
                <div className="pt-1">
                  {mensaje.editado ? <p className="small text-muted mb-1 cols-4 tamnyoHora">Editado</p> : <div></div>}
                  {mensaje.reenviado ? <p className="small text-muted mb-1 cols-4 tamnyoHora">Reenviado</p> : <div></div>}
                  <p className="small text-muted mb-1 cols-4 tamnyoHora">{formatDate( mensaje.fecha_envio )}</p>
                  {setNombreAnterior( mensaje.nombre_usuario_emisor )}
                </div>
                {!mensaje.administracion
                  ? <li className=" d-none nav-item">
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
                  : <div></div>}
              </div>
            </div>
            : <div key = {index}></div>
        ) )
      }
    </div>
  );

};

Messages.propTypes = {
  mensajes: PropTypes.array.isRequired,
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