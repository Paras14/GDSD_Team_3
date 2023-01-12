import axios from 'axios';
import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpHome = ( setCards ) => {
  
    axios.get( `${baseUrl}restaurants/` )
      .then( res => {
  
        setCards( res.data );
  
      });
  
  };