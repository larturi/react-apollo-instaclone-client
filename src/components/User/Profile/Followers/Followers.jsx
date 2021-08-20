import React from 'react';

import './Followers.scss';

export default function Followers(props) {
   const { username } = props;
   return (
      <div className='followers'>
         <p>
            <span>50</span> publicaciones
         </p>
         <p className='link'>
            <span>504</span> seguidores
         </p>
         <p className='link'>
            <span>454</span> seguidos
         </p>
      </div>
   );
}
