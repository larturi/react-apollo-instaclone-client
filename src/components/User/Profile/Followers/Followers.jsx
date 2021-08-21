import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWERS, GET_FOLLOWEDS } from '../../../../gql/follow';
import ModalBasic from '../../../../components/Modals/ModalBasic';
import ListUsers from '../../ListUsers';

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

   const {
      data: dataFolloweds,
      loading: loadingFolloweds,
      startPolling: startPollingFolloweds,
      stopPolling: stopPollingFolloweds,
   } = useQuery(GET_FOLLOWEDS, {
      variables: { username },
   });

   useEffect(() => {
      startPollingFollowers(1000);
      return () => {
         stopPollingFollowers();
      };
   }, [startPollingFollowers, stopPollingFollowers]);

   useEffect(() => {
      startPollingFolloweds(1000);
      return () => {
         stopPollingFolloweds();
      };
   }, [startPollingFolloweds, stopPollingFolloweds]);

   if (loadingFollowers || loadingFolloweds) return null;
   const { getFollowers } = dataFollowers;
   const { getFolloweds } = dataFolloweds;

   const openFollowers = () => {
      setTitleModal('Seguidores');
      setChildrenModal(
         <ListUsers users={getFollowers} setShowModal={setShowModal} />
      );
      setShowModal(true);
   };

   const openFolloweds = () => {
      setTitleModal('Siguiendo');
      setChildrenModal(
         <ListUsers users={getFolloweds} setShowModal={setShowModal} />
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
            <p className='link' onClick={openFolloweds}>
               <span>{size(getFolloweds)}</span> seguidos
            </p>
         </div>

         <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
            {childrenModal}
         </ModalBasic>
      </>
   );
}
