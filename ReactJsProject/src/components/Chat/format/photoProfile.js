import React from 'react';

export const photoProfile = ( receptor, users, tam ) => {

  let imagen = '';

  if ( receptor !== null ) {

    users.forEach( ( user ) => {

      if ( user.id === receptor.id ) {

        imagen =
          <img src="https://i.imgur.com/hepj9ZS.png"
            alt="avatar"
            className="d-flex align-self-center me-3 imagen-perfil-chat"
            width={tam}
            height={tam} />;

      }

    });

  }

  return imagen;

};