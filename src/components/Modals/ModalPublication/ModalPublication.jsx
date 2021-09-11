import React from 'react';
import { Modal, Grid } from 'semantic-ui-react';
import Actions from './Actions';
import CommentForm from './CommentForm';
import Comments from './Comments';

import './ModalPublication.scss';

export default function ModalPublication(props) {
   const { show, setShow, publication, setPublicationSelected } = props;

   const onClose = () => {
      setShow(false);
      setPublicationSelected(null);
   };

   return (
      <Modal open={show} onClose={onClose} className='modal-publication'>
         <Grid>
            <Grid.Column
               className='modal-publication__left'
               mobile={16}
               tablet={8}
               computer={10}
               style={{ backgroundImage: `url("${publication.file}")` }}
            />

            <Grid.Column
               className='modal-publication__right'
               mobile={16}
               tablet={8}
               computer={6}
            >
               <Comments publication={publication} />
               <Actions publication={publication} />
               <CommentForm publication={publication} />
            </Grid.Column>
         </Grid>
      </Modal>
   );
}
