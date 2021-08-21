import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWERS } from '../../../../gql/follow';
import ModalBasic from '../../../../components/Modals/ModalBasic';

import './Followers.scss';

export default function Followers(props) {
   const { username } = props;
   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState('');
   const [childrenModal, setChildrenModal] = useState(null);

   const {
      data: dataFollowers,
      loading: loadingFollowers,
      startPolling: startPollingFollowers,
      stopPolling: stopPollingFollowers,
   } = useQuery(GET_FOLLOWERS, {
      variables: { username },
   });

   useEffect(() => {
      startPollingFollowers(1000);
      return () => {
         stopPollingFollowers();
      };
   }, [startPollingFollowers, stopPollingFollowers]);

   if (loadingFollowers) return null;
   const { getFollowers } = dataFollowers;

   const openFollowers = () => {
      setTitleModal('Seguidores');
      setChildrenModal(
         <div>
            <h3>Lista de seguidores</h3>
         </div>
      );
      setShowModal(true);
   };

   return (
      <>
         <div className='followers'>
            <p>
               <span>50</span> publicaciones
            </p>
            <p className='link' onClick={openFollowers}>
               <span>{size(getFollowers)}</span> seguidores
            </p>
            <p className='link'>
               <span>**</span> seguidos
            </p>
         </div>

         <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
            {childrenModal}
         </ModalBasic>
      </>
   );
}
