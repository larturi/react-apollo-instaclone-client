import React from 'react';
import { Button } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/client';
import { IS_FOLLOW, FOLLOW, UNFOLLOW } from '../../../../gql/follow';

import './HeaderProfile.scss';

export default function HeaderProfile(props) {
   const { getUser, auth, handleModal } = props;

   const [follow] = useMutation(FOLLOW);
   const [unfollow] = useMutation(UNFOLLOW);

   const { loading, data, refetch } = useQuery(IS_FOLLOW, {
      variables: {
         username: getUser.username,
      },
   });

   const buttonFollow = () => {
      if (data?.isFollow) {
         return (
            <Button className='btn-danger' onClick={onUnFollow}>
               Dejar de seguir
            </Button>
         );
      } else {
         return (
            <Button className='btn-action' onClick={onFollow}>
               Seguir
            </Button>
         );
      }
   };

   const onFollow = async () => {
      try {
         await follow({
            variables: {
               username: getUser.username,
            },
         });
         refetch();
      } catch (error) {
         console.error(error);
      }
   };

   const onUnFollow = async () => {
      try {
         await unfollow({
            variables: {
               username: getUser.username,
            },
         });
         refetch();
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className='header-profile'>
         <h2>{getUser.username}</h2>
         {getUser.username === auth.username ? (
            <Button onClick={() => handleModal('settings')}>Ajustes</Button>
         ) : (
            !loading && buttonFollow()
         )}
      </div>
   );
}
