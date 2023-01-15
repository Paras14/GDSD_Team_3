export const eliminarEspaciosMensajes = ( mensaje ) => {

    let mensajeNuevo = '';
  
    while ( mensajeNuevo.length < mensaje.length ) {
  
      mensajeNuevo += ' ';
  
    }
  
    return mensajeNuevo !== mensaje;
  
  };