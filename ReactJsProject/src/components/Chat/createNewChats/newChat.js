import Swal from 'sweetalert2';
import { setConection } from '../format/setConection';
import { formatMessage } from '../format/formatMessage';

export const chatUsers = ( user, users, receptor, setReceptor, group, setGroup, setIniciandoChat, setConexion ) => {

  Swal.fire({
    html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showFriends( user, users )}</div>`,
    background: '#f0eeee',
    showCloseButton: true,
    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    width: '25%',
    heightAuto: false,
    didOpen: () => {

      addClickButton( receptor, setReceptor, group, setGroup, setIniciandoChat, users, setConexion );

    }

  });


};

function showFriends( user, users ) {

  let friends = '';

  users.forEach( ( us ) => {

    if ( us.nombre !== user.nombre ) {

      const descripcion = formatMessage( us.descripcion );

      // const imagen = fotoPerfil( user );
      friends += `
      <div class="d-flex flex-row mb-3">
      <button style="background-color: white; border-radius: 20px" name="newChat" value="${us.nombre}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
        <div class="align-items-center divObjectsSend">
          <img src=${us.imagen}
            alt="avatar"
            class="d-flex align-self-center m-3 imagen-perfil-chat"
            width="50"
            height="50" />
        </div>
        <div class="pt-1">
          <p class="fw-bold mb-0">${us.nombre}</p>
          <p class="small text-muted">${descripcion}</p>
        </div>
      </button>
    </div>`;

    }

  });

  return ( friends );

}

const addClickButton = ( receptor, setReceptor, group, setGroup, setIniciandoChat, users, setConexion ) => {

  document.querySelectorAll( 'button[name="newChat"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      if ( document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ) !== null ) {

        document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ).classList.remove( 'chatSeleccionado' );

      }

      setReceptor( boton.value );
      setConection( boton.value, users, setConexion );
      setGroup({});

      if ( document.getElementById( `${boton.value}` ) !== null ) {

        document.getElementById( `${boton.value}` ).classList.add( 'chatSeleccionado' );

      }

      setIniciandoChat( true );

      Swal.close();

    });

  });

};