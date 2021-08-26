import React from 'react';
import { Image } from 'semantic-ui-react';

import './PreviewPublication.scss';

export default function PreviewPublication(props) {
   const { publication } = props;
   return (
      <>
         <div className='preview-publication'>
            <Image
               className='preview-publication__image'
               src={publication.file}
            />
         </div>
      </>
   );
}
