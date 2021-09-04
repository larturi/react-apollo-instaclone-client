import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/png/instaclone.png';
import RightHeader from './RightHeader';
import Search from './Search';

import './Header.scss';

export default function Header() {
   return (
      <div className='header'>
         <Container>
            <Grid>
               <Grid.Column
                  mobile={4}
                  tablet={4}
                  computer={3}
                  className='header__logo'
               >
                  <Link to='/'>
                     <Image src={Logo} alt='Instaclone' />
                  </Link>
               </Grid.Column>

               <Grid.Column mobile={9} tablet={9} computer={10}>
                  <Search />
               </Grid.Column>

               <Grid.Column mobile={3} tablet={3} computer={3}>
                  <RightHeader />
               </Grid.Column>
            </Grid>
         </Container>
      </div>
   );
}
