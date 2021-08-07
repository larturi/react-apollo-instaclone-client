import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../components/Header';

const LayoutBasic = (props) => {
   const { children } = props;
   return (
      <Container className='layout-basic'>
         <Header />
         {children}
      </Container>
   );
};

export default LayoutBasic;
