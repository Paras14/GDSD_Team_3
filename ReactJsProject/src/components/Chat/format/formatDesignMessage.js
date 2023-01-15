export const getOrientation = ( user, mensaje ) => !mensaje.administracion ? user.nombre === mensaje.nombre_usuario_emisor ? 'justify-content-end' : 'justify-content-start' : 'justify-content-center';

export const getOrigenMensaje = ( user, mensaje ) => !mensaje.administracion ? user.nombre === mensaje.nombre_usuario_emisor ? 'mensajeActualizadoMio' : 'mensajeActualizadoOtro' : 'mensajeAdministracion';

export const getOrigenMensajeRespuesta = ( user, mensaje ) => mensaje.nombre_usuario_emisor === user.nombre ? 'mensajeRespuestaMio' : 'mensajeRespuestaOtro';

export const getMargen = ( mensaje, nombreAnterior ) => {

  let margin = '';
  ( nombreAnterior === mensaje.nombre_usuario_emisor && !mensaje.administracion ) ? margin = 'mt-0' : margin = 'mt-4';
  return margin;

};

export const getEnlace = ( mensaje ) => {

  let enlace = '#';

  enlace += mensaje.respuesta;

  return enlace;

};