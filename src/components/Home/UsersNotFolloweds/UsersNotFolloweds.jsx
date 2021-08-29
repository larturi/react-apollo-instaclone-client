import React from 'react';

import './UsersNotFolloweds.scss';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_NOT_FOLLOWEDS } from '../../../gql/follow';
import imgNotFound from '../../../assets/png/avatar.png';
import { data } from 'autoprefixer';

export default function UsersNotFolloweds() {
   const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

   if (loading) return <div>Cargando...</div>;

   const { getNotFolloweds } = data;

   console.log(data);

   return (
      <div className='users-not-followeds'>
         <h4>Usuarios que quizas quieras seguir</h4>
         {map(getNotFolloweds, (user, index) => (
            <Link
               to={`/${user.username}`}
               key={index}
               className='users-not-followeds__user'
            >
               <Image src={user.avatar || imgNotFound} avatar />
               <span>{user.name}</span>
            </Link>
         ))}
      </div>
   );
}
