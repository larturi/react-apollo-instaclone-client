import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import useAuth from '../../../hooks/useAuth';

import './SettingsForm.scss';

export default function SettingsForm(props) {
   const { setShowModal } = props;
   const { logout } = useAuth();
   const history = useHistory();
   const client = useApolloClient();

   const onLogout = () => {
      client.clearStore();
      logout();
      history.push('/');
   };

   return (
      <div className='settings-form'>
         <Button>Cambiar contraseña</Button>
         <Button>Cambiar email</Button>
         <Button>Cambiar descripción</Button>
         <Button>Sitio Web</Button>
         <Button onClick={onLogout}>Cerrar sesión</Button>
         <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      </div>
   );
}
