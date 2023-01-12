import axios from 'axios';
import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const setUpCategory = ( setRestaurantCategory ) => {
  
    axios.get( `${baseUrl}restaurantCategories/` )
      .then( res => {
  
        setRestaurantCategory( res.data );
  
      });
  
  };