import React from 'react';
import { Button } from 'semantic-ui-react';

import './HeaderProfile.scss';

export default function HeaderProfile(props) {
   const { getUser, auth, handleModal } = props;
   return (
      <div className='header-profile'>
         <h2>{getUser.username}</h2>
         {getUser.username === auth.username ? (
            <Button onClick={() => handleModal('settings')}>Ajustes</Button>
         ) : (
            <Button>Seguir</Button>
         )}
      </div>
   );
}
