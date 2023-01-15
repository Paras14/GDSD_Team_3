export const formatMessage = ( mensaje ) => {

    let ultimoMensaje = mensaje;
    if ( ultimoMensaje.length > 15 ) {
  
      ultimoMensaje = ultimoMensaje.substring( 0, 12 );
      ultimoMensaje += '...';
  
    }
    return ultimoMensaje;
  
  };