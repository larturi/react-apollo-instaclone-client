import React, { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS_FOLLOWEDS } from '../../../gql/publication';
import imgNotFound from '../../../assets/png/avatar.png';

import './Feed.scss';
import Actions from '../../Modals/ModalPublication/Actions/Actions';
import CommentForm from '../../Modals/ModalPublication/CommentForm/CommentForm';

export default function Feed() {
   const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOWEDS);

   if (loading) return <p>Cargando publicaciones...</p>;

   const { getPublicationFolloweds } = data;

   return (
      <div className='feed'>
         {map(getPublicationFolloweds, (publication, index) => (
            <div className='feed__box' key={index}>
               <Link to={`/${publication.idUser.username}`}>
                  <div className='feed__box-user'>
                     <Image
                        src={publication.idUser.avatar || imgNotFound}
                        avatar
                     />
                     <span>{publication.idUser.name}</span>
                  </div>
               </Link>
               <div
                  className='feed__box-photo'
                  style={{ backgroundImage: `url("${publication.file}")` }}
               />
               <div className='feed__box-actions'>
                  <Actions publication={publication} />
               </div>
               <div className='feed__box-form'>
                  <CommentForm publication={publication} />
               </div>
            </div>
         ))}
      </div>
   );
}
