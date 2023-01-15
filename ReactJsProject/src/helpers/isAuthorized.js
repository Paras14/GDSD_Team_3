export const isAuthorized = () => {

    const token = localStorage.getItem( 'user' );
    if ( token ) {
  
      return true;
  
    }
    return false;
  
  };