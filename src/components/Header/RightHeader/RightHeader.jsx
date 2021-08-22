import React, { useState } from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import imgAvatarDefault from '../../../assets/png/avatar.png';
import ModalUpload from '../../Modals/ModalUpload';
import useAuth from '../../../hooks/useAuth';

import './RightHeader.scss';

export default function RightHeader() {
   const { auth } = useAuth();

   const [showModal, setShowModal] = useState(false);

   const { data, loading, error } = useQuery(GET_USER, {
      variables: { username: auth.username },
   });

   if (loading || error) return null;

   const { getUser } = data;

   return (
      <>
         <div className='right-header'>
            <Link to='/'>
               <Icon name='home' />
            </Link>
            <Icon name='plus' onClick={() => setShowModal(true)} />
            <Link to={`/${auth.username}`}>
               <Image
                  src={getUser.avatar ? getUser.avatar : imgAvatarDefault}
                  avatar
               />
            </Link>
         </div>
         <ModalUpload show={showModal} setShow={setShowModal} />
      </>
   );
}
