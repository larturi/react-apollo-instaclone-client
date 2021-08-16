import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import useAuth from '../../../hooks/useAuth';
import PasswordForm from '../../../components/User/PasswordForm';

import EmailForm from '../EmailForm';
import DescriptionForm from '../DescriptionForm/DescriptionForm';
import SiteWebForm from '../SiteWebForm';

import './SettingsForm.scss';

export default function SettingsForm(props) {
   const { setShowModal, setTitleModal, setChildrenModal, getUser, refetch } =
      props;
   const { logout } = useAuth();
   const history = useHistory();
   const client = useApolloClient();

   const onChangePassword = () => {
      setTitleModal('Cambiar contraseña');
      setChildrenModal(<PasswordForm logout={onLogout} />);
   };

   const onChangeEmail = () => {
      setTitleModal('Cambiar email');
      setChildrenModal(
         <EmailForm
            setShowModal={setShowModal}
            currentEmail={getUser.email}
            refetch={refetch}
         />
      );
   };

   const onChangeDescription = () => {
      setTitleModal('Cambiar Biografía');
      setChildrenModal(
         <DescriptionForm
            setShowModal={setShowModal}
            currentDescription={getUser.bio || ''}
            refetch={refetch}
         />
      );
   };

   const onChangeSitioWeb = () => {
      setTitleModal('Cambiar SitioWeb');
      setChildrenModal(
         <SiteWebForm
            setShowModal={setShowModal}
            currentSiteWeb={getUser.siteWeb || ''}
            refetch={refetch}
         />
      );
   };

   const onLogout = () => {
      client.clearStore();
      logout();
      history.push('/');
   };

   return (
      <div className='settings-form'>
         <Button onClick={onChangePassword}>Cambiar contraseña</Button>
         <Button onClick={onChangeEmail}>Cambiar email</Button>
         <Button onClick={onChangeDescription}>Cambiar descripción</Button>
         <Button onClick={onChangeSitioWeb}>Sitio Web</Button>
         <Button onClick={onLogout}>Cerrar sesión</Button>
         <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      </div>
   );
}
