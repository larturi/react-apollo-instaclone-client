import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../../components/User/Profile/Profile';
import { useQuery } from '@apollo/client';
import { size } from 'lodash';
import { GET_PUBLICATIONS } from '../../gql/publication';

export default function User() {
   const { username } = useParams();

   const { data, loading } = useQuery(GET_PUBLICATIONS, {
      variables: {
         username,
      },
   });

   if (loading) return null;
   const { getPublications } = data;

   return (
      <div>
         <Profile
            username={username}
            totalPublications={size(getPublications)}
         />
      </div>
   );
}
