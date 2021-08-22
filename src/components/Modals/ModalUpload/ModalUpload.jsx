import React, { useCallback } from 'react';
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';

import './ModalUpload.scss';

export default function ModalUpload(props) {
   const { show, setShow } = props;

   const onDrop = useCallback((acceptedFile) => {
      const file = acceptedFile[0];
      console.log(file);
   });

   const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/jpg, image/png',
      noKeyboard: true,
      multiple: false,
      onDrop,
   });

   const onClose = () => {
      setShow(false);
   };

   return (
      <Modal
         size='small'
         open={show}
         onClose={onClose}
         className='modal-upload'
      >
         <div {...getRootProps()} className='dropzone'>
            <Icon name='cloud upload' />
            <p>Arrastra la foto que quieras publicar</p>
            <input {...getInputProps()} />
         </div>
      </Modal>
   );
}
