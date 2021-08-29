import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_LIKE, IS_LIKE } from '../../../../gql/like';

import './Actions.scss';

export default function Actions(props) {
   const { publication } = props;

   const [addLike] = useMutation(ADD_LIKE);

   const { data, loading, refetch } = useQuery(IS_LIKE, {
      variables: {
         idPublication: publication.id,
      },
   });

   if (loading) return null;

   const { isLike } = data;

   const onAddLike = async () => {
      try {
         await addLike({
            variables: {
               idPublication: publication.id,
            },
         });
         refetch();
      } catch (error) {
         console.error(error);
      }
   };

   const onDeleteLike = async () => {};

   return (
      <div className='actions'>
         <Icon
            className={isLike ? 'like active' : 'like'}
            name={isLike ? 'heart' : 'heart outline'}
            onClick={isLike ? onDeleteLike : onAddLike}
         />
         33 Likes
      </div>
   );
}
