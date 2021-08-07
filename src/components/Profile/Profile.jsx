import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import imgNotFound from '../../assets/png/avatar.png';
import UserNotFound from '../UserNotFound';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/user';

import './Profile.scss';

export default function Profile(props) {
   const { username, name } = props;

   const { data, loading, error } = useQuery(GET_USER, {
      variables: { username },
   });

   if (loading) return null;
   if (error) return <UserNotFound />;

   const { getUser } = data;

   return (
      <>
         <Grid className='profile'>
            <Grid.Column width={5} className='profile__left'>
               <Image src={imgNotFound} avatar />
            </Grid.Column>
            <Grid.Column width={11} className='profile__right'>
               <div>HeaderProfile</div>
               <div>Followers</div>
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
      </>
   );
}
