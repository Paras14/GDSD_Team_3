import React from 'react';
import PropTypes from 'prop-types';
import { photoProfile } from '../format/photoProfile';
import { formatDate } from '../format/formatDate';
import { formatMessage } from '../format/formatMessage';
import { setConection } from '../format/setConection';
import { useNavigate } from 'react-router-dom';
//import { setMiembrosGrupo } from '../format/setMiembrosGrupo';
//import { getGrupo } from '../format/getGroup';

export const Chats = ({ users, messagesSearch, receptor, //group, 
    setResponse, setReceptor, //setGroup, 
    user, setMessage, setConexion, //myGroups, setConfigurationGroups, 
    messages }) => {

  const users2 = [];

  const navigate = useNavigate();

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

  const putUsers2 = ( user ) => {

    //if ( messagesSearch.length === messages.length || recienEnviado ) {

      users2.push( user.id );

    //}

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

  const changeChat = ( user ) => {

    setResponse( false );

    if ( document.getElementById( `${receptor.id}` ) !== null ) {

      document.getElementById( `${receptor.id}` ).classList.remove( 'chatSeleccionado' );

    }
    document.getElementById( `${user.id}` ).classList.add( 'chatSeleccionado' );
    if ( user !== null ) {

      setReceptor( user );
      setConection( user.id , users, setConexion );
      document.title = `Chating with ${user.username}`;

    } 

    setMessage( '' );
    navigate('/chat/' + user.id);
    window.location.reload();


  };

  return (
    users.length !== 0 
    ?
    <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatUsers">
      <div data-mdb-perfect-scrollbar="true"
        position= "relative"
        height= "400px">
        <ul className="list-unstyled mb-0">
          {
            ( users.length !== 0  ) && users.map( (user, index) => ( //&& messagesSearch.reverse().map( ( men, index ) => (

              //( ( users2.indexOf( men.user_receiver ) === -1 ) && ( users2.indexOf( men.user_emitter ) === -1 ) //&& ( users2.indexOf( men.id_grupo_receptor ) === -1 ) 
              //)
                <li className="p-2 border-bottom"
                  key={index}>
                  <button className={'d-flex justify-content-between botonNaranja btn-chat-seleccionado-hover'}
                    id = {`${user.id}`}
                    onClick={() => changeChat( user )}>
                    <div className="d-flex flex-row">
                      {console.log("users2: " +users2)}
                      
                      <div className="align-items-center divObjectsSend margen-foto-chat-perfil">
                        {photoProfile( user.id, users, 60 )}
                      </div>
                      <div className="pt-1">
                        {putUsers2( user )}
                        <p className="fw-bold mb-0">{user.username}</p>
                        <p className="small text-muted">Chat with {user.username}</p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-muted mb-1 textoTransparente textoDerecha tamnyoHora">&nbsp;</p>
                      <p className="small text-muted mb-1 textoTransparente textoDerecha tamnyoHora">&nbsp;</p>
                      <p className="small text-muted mb-1 textoDerecha tamnyoHora"></p>
                    </div>
                  </button>
                </li>
                //: <div key={index}></div> )
            ))
          }

        </ul>
      </div>
    </div>
    :
    <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatUsers">
      <div data-mdb-perfect-scrollbar="true"
        position= "relative"
        height= "400px">
        <ul className="list-unstyled mb-0">

        </ul>
      </div>
    </div>
  );

};

