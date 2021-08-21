import React from 'react';
import { useHistory } from 'react-router-dom';
import { size, map } from 'lodash';
import { Image } from 'semantic-ui-react';
import imgNotFound from '../../../assets/png/avatar.png';

import './ListUsers.scss';

export default function ListUsers(props) {
   const { setShowModal, users } = props;
   const histoy = useHistory();

   const goToUser = (username) => {
      setShowModal(false);
      histoy.push(`/${username}`);
   };

   return (
      <div className='list-users'>
         {size(users) === 0 ? (
            <p className='list-users__not-users'>
               No se han encontrado usuarios
            </p>
         ) : (
            map(users, (user, index) => (
               <div key={index} className='list-users__user'>
                  <Image src={user.avatar || imgNotFound} avatar />
                  <div onClick={() => goToUser(user.username)}>
                     <p>{user.name}</p>
                     <p>{user.username}</p>
                  </div>
               </div>
            ))
         )}
      </div>
   );
}
