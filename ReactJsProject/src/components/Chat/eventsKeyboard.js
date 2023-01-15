export function eventKeyboard( event ) {

    event.preventDefault();
    if ( event.key === 'Enter' ) {
  
      document.querySelector( '#botonEnviar' ).click();
  
    }
  
  }