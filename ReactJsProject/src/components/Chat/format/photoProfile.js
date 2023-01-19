import React from 'react';

export const photoProfile = ( receptor, users, tam ) => {

  let imagen = '';

  if ( receptor !== -1 ) {

    //users.forEach( ( user ) => {

      if ( users.id === receptor ) {

        imagen =
          <img src={users.image}
            alt="avatar"
            className="d-flex align-self-center me-3 imagen-perfil-chat"
            width={tam}
            height={tam} />;

      }

    //});

  }

  return imagen;

};