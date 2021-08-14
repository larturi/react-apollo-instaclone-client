import React, { useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_USER, UPDATE_AVATAR, DELETE_AVATAR } from '../../../gql/user';

import './AvatarForm.scss';

export default function AvatarForm(props) {
   const { setShowModal, auth } = props;
   const [loading, setLoading] = useState(false);

   const [updateAvatar] = useMutation(UPDATE_AVATAR, {
      update(cache, { data: { updateAvatar } }) {
         const { getUser } = cache.readQuery({
            query: GET_USER,
            variables: { username: auth.username },
         });

         cache.writeQuery({
            query: GET_USER,
            variables: { username: auth.username },
            data: {
               getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
            },
         });
      },
   });

   const [deleteAvatar] = useMutation(DELETE_AVATAR, {
      update(cache) {
         const { getUser } = cache.readQuery({
            query: GET_USER,
            variables: { username: auth.username },
         });

         cache.writeQuery({
            query: GET_USER,
            variables: { username: auth.username },
            data: {
               getUser: { ...getUser, avatar: '' },
            },
         });
      },
   });

   const onDrop = useCallback(async (acceptedFile) => {
      const file = acceptedFile[0];

      try {
         setLoading(true);
         const result = await updateAvatar({
            variables: { file },
         });
         const { data } = result;
         if (!data.updateAvatar.status) {
            toast.warning('Error al actualizar el avatar');
            setLoading(false);
         } else {
            setLoading(false);
            setShowModal(false);
         }
      } catch (error) {
         console.error(error);
      }
   }, []);

   const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/jpeg,image/png',
      noKeyboard: true,
      multiple: false,
      onDrop,
   });

   const onDeleteAvatar = async () => {
      try {
         const result = await deleteAvatar();
         const { data } = result;
         if (!data.deleteAvatar) {
            toast.warning('Error al eliminar el avatar');
         } else {
            setShowModal(false);
         }
      } catch (error) {
         console.error(error);
         toast.warning('Error al eliminar el avatar');
      }
   };

   return (
      <div className='avatar-form'>
         <Button loading={loading} {...getRootProps()}>
            Cargar una foto
         </Button>
         <Button onClick={onDeleteAvatar}>Eliminar foto actual</Button>
         <Button onClick={() => setShowModal(false)}>Cancelar</Button>
         <input {...getInputProps()} />
      </div>
   );
}
