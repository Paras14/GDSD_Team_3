import React from 'react';

export const photoProfile = ( receptor, users, tam ) => {

  let imagen = '';

  if ( receptor !== '' ) {

    users.forEach( ( user ) => {

      if ( user.nombre === receptor ) {

        imagen =
          <img src={user.imagen}
            alt="avatar"
            className="d-flex align-self-center me-3 imagen-perfil-chat"
            width={tam}
            height={tam} />;

      }

    });

  }

  return imagen;

};