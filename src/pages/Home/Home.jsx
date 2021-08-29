import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Grid } from 'semantic-ui-react';
import Feed from '../../components/Home/Feed';

import './Home.scss';

export default function Home() {
   const auth = useAuth();
   return (
      <Grid className='home'>
         <Grid.Column className='home__left' width={11}>
            <Feed />
         </Grid.Column>

         <Grid.Column className='home__right' width={5}>
            <h2>Usuarios que no sigues</h2>
         </Grid.Column>
      </Grid>
   );
}
