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
import ModalPublication from '../../Modals/ModalPublication/ModalPublication';

export default function Feed() {
   const [showModal, setShowModal] = useState(false);
   const [publicationSelected, setPublicationSelected] = useState(null);

   const { data, loading, startPolling, stopPolling } = useQuery(
      GET_PUBLICATIONS_FOLLOWEDS
   );

   useEffect(() => {
      startPolling(1000);
      return () => {
         stopPolling();
      };
   }, [startPolling, stopPolling]);

   if (loading) return <p>Cargando publicaciones...</p>;

   const { getPublicationFolloweds } = data;

   const openPublication = (publication) => {
      setPublicationSelected(publication);
      setShowModal(true);
   };

   return (
      <>
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
                     onClick={() => openPublication(publication)}
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
         {showModal && (
            <ModalPublication
               show={showModal}
               setShow={setShowModal}
               publication={publicationSelected}
            />
         )}
      </>
   );
}
