import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import imgAvatarDefault from '../../../assets/png/avatar.png';
import useAuth from '../../../hooks/useAuth';

import './RightHeader.scss';

export default function RightHeader() {
   const { auth } = useAuth();
   return (
      <div className='right-header'>
         <Link to='/'>
            <Icon name='home' />
         </Link>
         <Icon name='plus' />
         <Link to={`/${auth.username}`}>
            <Image src={imgAvatarDefault} avatar />
         </Link>
      </div>
   );
}
