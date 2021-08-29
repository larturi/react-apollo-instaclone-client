import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import {
   ADD_LIKE,
   IS_LIKE,
   DELETE_LIKE,
   COUNT_LIKES,
} from '../../../../gql/like';

import './Actions.scss';

export default function Actions(props) {
   const { publication } = props;

   const [loadingAction, setLoadingAction] = useState(false);

   const [addLike] = useMutation(ADD_LIKE);
   const [deleteLike] = useMutation(DELETE_LIKE);

   const { data, loading, refetch } = useQuery(IS_LIKE, {
      variables: {
         idPublication: publication.id,
      },
   });

   const {
      data: dataCountLikes,
      loading: loadingCountLikes,
      refetch: refetchCountLikes,
   } = useQuery(COUNT_LIKES, {
      variables: {
         idPublication: publication.id,
      },
   });

   if (loading || loadingCountLikes) return null;

   const { isLike } = data;
   const { countLikes } = dataCountLikes;

   const onAction = () => {
      if (!loadingAction) {
         setLoadingAction(true);
         if (isLike) {
            onDeleteLike();
         } else {
            onAddLike();
         }
         setLoadingAction(false);
      }
   };

   const onAddLike = async () => {
      try {
         await addLike({
            variables: {
               idPublication: publication.id,
            },
         });
         refetch();
         refetchCountLikes();
      } catch (error) {
         console.error(error);
      }
   };

   const onDeleteLike = async () => {
      try {
         await deleteLike({
            variables: {
               idPublication: publication.id,
            },
         });
         refetch();
         refetchCountLikes();
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className='actions'>
         <Icon
            className={isLike ? 'like active' : 'like'}
            name={isLike ? 'heart' : 'heart outline'}
            onClick={onAction}
            disabled={loadingAction}
         />
         {countLikes} {countLikes === 1 ? 'Like' : 'Likes'}
      </div>
   );
}
