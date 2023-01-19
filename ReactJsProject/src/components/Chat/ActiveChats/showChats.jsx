import React from 'react';
import PropTypes from 'prop-types';
import { photoProfile } from '../format/photoProfile';
import { formatDate } from '../format/formatDate';
import { formatMessage } from '../format/formatMessage';
import { setConection } from '../format/setConection';
//import { setMiembrosGrupo } from '../format/setMiembrosGrupo';
//import { getGrupo } from '../format/getGroup';

export const Chats = ({ users, messagesBuscar, receptor, //group, 
    setResponder, setReceptor, //setGroup, 
    user, setMessage, setConexion, //myGroups, setConfigurationGroups, 
    messages, recienEnviado }) => {

  const users2 = [];

  const nombreEmisorOrId = ( men ) => {

    let nombre = -1;

    if ( men.user_receiver !== null //&& men.id_grupo_receptor === null 
        ) {

      men.user_emitter !== user.id ? nombre = men.user_emitter : nombre = men.user_receiver;

    } /*else if ( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) {

      nombre = men.id_grupo_receptor;

    } */

    return nombre;

  };

  const putUsers2 = ( men ) => {

    if ( messagesBuscar.length === messages.length || recienEnviado ) {

      users2.push( ( men.user_receiver !== null && men.user_emitter !== user.id ? men.user_emitter : men.user_receiver ) );

    }

    return <div></div>;

  };

  const nombreEmisor = ( men ) => {

    let nombre = -1;

    if ( men.user_receiver !== null //&& men.id_grupo_receptor === null 
        ) {

      men.user_emitter !== user.id ? nombre = men.user_emitter : nombre = men.user_receiver;

    } /*else if ( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) {

      nombre = getGrupo( men.id_grupo_receptor, myGroups ).nombre;

    } */

    return nombre;

  };

  const changeChat = ( men ) => {

    setResponder( false );
    document.querySelector( '#botonResponder' ).classList.add( 'ocultar' );

    if ( document.getElementById( `${receptor}` ) !== null ) {

      document.getElementById( `${receptor}` ).classList.remove( 'chatSeleccionado' );

    }
    document.getElementById( `${nombreEmisorOrId( men )}` ).classList.add( 'chatSeleccionado' );
    if ( men.user_receiver !== null //&& men.id_grupo_receptor === null 
        ) {

      setReceptor( men.user_emitter !== user.id ? men.user_emitter : men.user_receiver );
      setConection( men.user_emitter !== user.id ? men.user_emitter : men.user_receiver, users, setConexion );
      //setGroup({});
      document.title = `Chateando con ${men.user_emitter !== user.id ? men.user_emitter : men.user_receiver}`;

    } /* else if ( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) {

      setReceptor( '' );
      setGroup( getGrupo( men.id_grupo_receptor, myGroups ) );
      setMiembrosGrupo( men.id_grupo_receptor, setConfigurationGroups, myGroups, users, user, setGroup, setReceptor, setConexion );
      document.title = `Chateando en ${getGrupo( men.id_grupo_receptor, myGroups ).nombre}`;

    } */
    setMessage( '' );

  };

  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatUsers">
      <div data-mdb-perfect-scrollbar="true"
        position= "relative"
        height= "400px">
        <ul className="list-unstyled mb-0">
          {
            ( users.length !== 0 && messagesBuscar.length !== 0 ) && messagesBuscar.reverse().map( ( men, index ) => (

              ( ( users2.indexOf( men.user_receiver ) === -1 ) && ( users2.indexOf( men.user_emitter ) === -1 ) //&& ( users2.indexOf( men.id_grupo_receptor ) === -1 ) 
              )
                ? <li className="p-2 border-bottom"
                  key={index}>
                  <button className={'d-flex justify-content-between botonNaranja btn-chat-seleccionado-hover'}
                    id = {`${nombreEmisorOrId( men )}`}
                    onClick={() => changeChat( men )}>
                    <div className="d-flex flex-row">
                      <div className="align-items-center divObjectsSend margen-foto-chat-perfil">
                        {photoProfile( men.user_receiver === null ? '' : ( men.user_emitter !== user.id ? men.user_emitter : men.user_receiver ), users, 60 )}
                      </div>
                      <div className="pt-1">
                        {putUsers2( men )}
                        <p className="fw-bold mb-0">{nombreEmisor( men )}</p>
                        <p className="small text-muted">{formatMessage( men.text === null ? 'imagen' : men.text )}</p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-muted mb-1 textoTransparente textoDerecha tamnyoHora">&nbsp;</p>
                      <p className="small text-muted mb-1 textoTransparente textoDerecha tamnyoHora">&nbsp;</p>
                      <p className="small text-muted mb-1 textoDerecha tamnyoHora">{formatDate( men.createdAt )}</p>
                    </div>
                  </button>
                </li>
                : <div key={index}></div> )
            )
          }

        </ul>
      </div>
    </div>
  );

};

/*
Chats.propTypes = {
  users: PropTypes.array.isRequired,
  messagesBuscar: PropTypes.array.isRequired,
  receptor: PropTypes.string.isRequired,
  //group: PropTypes.object.isRequired,
  setResponder: PropTypes.func.isRequired,
  setReceptor: PropTypes.func.isRequired,
  //setGroup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  setConexion: PropTypes.func.isRequired,
  //myGroups: PropTypes.array.isRequired,
  //setConfigurationGroups: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  recienEnviado: PropTypes.bool.isRequired
};
*/