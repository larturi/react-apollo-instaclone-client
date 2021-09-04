import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Grid } from 'semantic-ui-react';
import Feed from '../../components/Home/Feed';

import './Home.scss';
import UsersNotFolloweds from '../../components/Home/UsersNotFolloweds';

export default function Home() {
   const auth = useAuth();
   return (
      <Grid className='home'>
         <Grid.Column
            className='home__left'
            mobile={16}
            tablet={12}
            computer={11}
         >
            <Feed />
         </Grid.Column>

         <Grid.Column
            className='home__right'
            mobile={16}
            tablet={4}
            computer={5}
         >
            <UsersNotFolloweds />
         </Grid.Column>
      </Grid>
   );
}
