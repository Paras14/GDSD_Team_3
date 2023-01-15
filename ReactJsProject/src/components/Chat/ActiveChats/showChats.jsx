import React from 'react';
import PropTypes from 'prop-types';
import { fotoPerfil } from '../format/photoProfile';
import { formatDate } from '../format/formatDate';
import { formatMessage } from '../format/formatMessage';
import { setConection } from '../format/setConection';
//import { setMiembrosGrupo } from '../format/setMiembrosGrupo';
//import { getGrupo } from '../format/getGroup';

export const Chats = ({ users, mensajesBuscar, receptor, //group, 
    setResponder, setReceptor, //setGroup, 
    user, setMensaje, setConexion, //myGroups, setConfigurationGroups, 
    mensajes, recienEnviado }) => {

  const users2 = [];

  const nombreEmisorOrId = ( men ) => {

    let nombre = '';

    if ( men.nombre_usuario_receptor !== null //&& men.id_grupo_receptor === null 
        ) {

      men.nombre_usuario_emisor !== user.nombre ? nombre = men.nombre_usuario_emisor : nombre = men.nombre_usuario_receptor;

    } /*else if ( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) {

      nombre = men.id_grupo_receptor;

    } */

    return nombre;

  };

  const putUsers2 = ( men ) => {

    if ( mensajesBuscar.length === mensajes.length || recienEnviado ) {

      users2.push( ( men.nombre_usuario_receptor !== null && men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor ) );

    }

    return <div></div>;

  };

  const nombreEmisor = ( men ) => {

    let nombre = '';

    if ( men.nombre_usuario_receptor !== null //&& men.id_grupo_receptor === null 
        ) {

      men.nombre_usuario_emisor !== user.nombre ? nombre = men.nombre_usuario_emisor : nombre = men.nombre_usuario_receptor;

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
    if ( men.nombre_usuario_receptor !== null //&& men.id_grupo_receptor === null 
        ) {

      setReceptor( men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor );
      setConection( men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor, users, setConexion );
      //setGroup({});
      document.title = `Chateando con ${men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor}`;

    } /* else if ( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) {

      setReceptor( '' );
      setGroup( getGrupo( men.id_grupo_receptor, myGroups ) );
      setMiembrosGrupo( men.id_grupo_receptor, setConfigurationGroups, myGroups, users, user, setGroup, setReceptor, setConexion );
      document.title = `Chateando en ${getGrupo( men.id_grupo_receptor, myGroups ).nombre}`;

    } */
    setMensaje( '' );

  };

  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatUsers">
      <div data-mdb-perfect-scrollbar="true"
        position= "relative"
        height= "400px">
        <ul className="list-unstyled mb-0">
          {
            ( users.length !== 0 && mensajesBuscar.length !== 0 ) && mensajesBuscar.filter( men => men.id_grupo_receptor !== 1 ).reverse().map( ( men, index ) => (

              ( ( users2.indexOf( men.nombre_usuario_receptor ) === -1 ) && ( users2.indexOf( men.nombre_usuario_emisor ) === -1 ) && ( users2.indexOf( men.id_grupo_receptor ) === -1 ) )
                ? <li className="p-2 border-bottom"
                  key={index}>
                  <button className={'d-flex justify-content-between botonNaranja btn-chat-seleccionado-hover'}
                    id = {`${nombreEmisorOrId( men )}`}
                    onClick={() => changeChat( men )}>
                    <div className="d-flex flex-row">
                      <div className="align-items-center divObjectsSend margen-foto-chat-perfil">
                        {fotoPerfil( getGrupo( men.id_grupo_receptor, myGroups ), men.nombre_usuario_receptor === null ? '' : ( men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor ), users, 60 )}
                      </div>
                      <div className="pt-1">
                        {putUsers2( men )}
                        <p className="fw-bold mb-0">{nombreEmisor( men )}</p>
                        <p className="small text-muted">{formatMessage( men.mensaje === null ? 'imagen' : men.mensaje )}</p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-muted mb-1 textoTransparente textoDerecha tamnyoHora">&nbsp;</p>
                      <p className="small text-muted mb-1 textoTransparente textoDerecha tamnyoHora">&nbsp;</p>
                      <p className="small text-muted mb-1 textoDerecha tamnyoHora">{formatDate( men.fecha_envio )}</p>
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

Chats.propTypes = {
  users: PropTypes.array.isRequired,
  mensajesBuscar: PropTypes.array.isRequired,
  receptor: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired,
  setResponder: PropTypes.func.isRequired,
  setReceptor: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setMensaje: PropTypes.func.isRequired,
  setConexion: PropTypes.func.isRequired,
  myGroups: PropTypes.array.isRequired,
  setConfigurationGroups: PropTypes.func.isRequired,
  mensajes: PropTypes.array.isRequired,
  recienEnviado: PropTypes.bool.isRequired
};