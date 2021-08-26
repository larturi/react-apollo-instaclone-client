import React, { useState } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import imgNotFound from '../../../assets/png/avatar.png';
import UserNotFound from '../../UserNotFound';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import ModalBasic from '../../Modals/ModalBasic/ModalBasic';
import AvatarForm from '../../User/AvatarForm';
import useAuth from '../../../hooks/useAuth';

import './Profile.scss';
import HeaderProfile from './HeaderProfile';
import SettingsForm from '../SettingsForm';
import Followers from './Followers';

export default function Profile(props) {
   const { username, totalPublications } = props;

   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState('');
   const [childrenModal, setChildrenModal] = useState(null);

   const { auth } = useAuth();

   const { data, loading, error, refetch } = useQuery(GET_USER, {
      variables: { username },
   });

   if (loading) return null;
   if (error) return <UserNotFound />;

   const { getUser } = data;

   const handleModal = (type) => {
      switch (type) {
         case 'avatar':
            setTitleModal('Cambiar foto de perfil');
            setChildrenModal(
               <AvatarForm setShowModal={setShowModal} auth={auth} />
            );
            setShowModal(true);
            break;

         case 'settings':
            setTitleModal('');
            setChildrenModal(
               <SettingsForm
                  setShowModal={setShowModal}
                  setTitleModal={setTitleModal}
                  setChildrenModal={setChildrenModal}
                  getUser={getUser}
                  refetch={refetch}
               />
            );
            setShowModal(true);
            break;

         default:
            break;
      }
   };

   return (
      <>
         <Grid className='profile'>
            <Grid.Column width={5} className='profile__left'>
               <Image
                  src={getUser.avatar ? getUser.avatar : imgNotFound}
                  avatar
                  onClick={() =>
                     username === auth.username && handleModal('avatar')
                  }
               />
            </Grid.Column>
            <Grid.Column width={11} className='profile__right'>
               <HeaderProfile
                  getUser={getUser}
                  auth={auth}
                  handleModal={handleModal}
               />
               <Followers
                  username={username}
                  totalPublications={totalPublications}
               />
               <div className='other'>
                  <p className='name'>{getUser.name}</p>
                  {getUser.siteWeb && (
                     <a
                        href={getUser.siteWeb}
                        className='siteWeb'
                        target='_blank'
                        rel='noopener noreferrer'
                     >
                        {getUser.siteWeb}
                     </a>
                  )}

                  {getUser.bio && <p className='bio'>{getUser.bio}</p>}
               </div>
            </Grid.Column>
         </Grid>

         <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
            {childrenModal}
         </ModalBasic>
      </>
   );
}
