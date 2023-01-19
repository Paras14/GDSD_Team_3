export const getOrientation = ( user, mensaje ) => user.id === mensaje.user_emitter ? 'justify-content-end' : 'justify-content-start';

export const getOrigenMensaje = ( user, mensaje ) => user.id === mensaje.user_emitter ? 'mensajeActualizadoMio' : 'mensajeActualizadoOtro';

export const getOrigenMensajeRespuesta = ( user, mensaje ) => mensaje.user_emitter === user.id ? 'mensajeRespuestaMio' : 'mensajeRespuestaOtro';

export const getMargen = ( mensaje, nombreAnterior ) => {

  console.log(mensaje);

  let margin = '';
  ( nombreAnterior === mensaje.user_emitter ) ? margin = 'mt-0' : margin = 'mt-4';
  return margin;

};

export const getEnlace = ( mensaje ) => {

  let enlace = '#';

  //enlace += mensaje.respuesta;

  return enlace;

};