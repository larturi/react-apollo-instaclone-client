import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../../components/User/Profile/Profile';

export default function User() {
   const { username } = useParams();
   return (
      <div>
         <Profile username={username} />
      </div>
   );
}
