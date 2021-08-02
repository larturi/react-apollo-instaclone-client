/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import Auth from './pages/Auth';

export default function App() {
   const [auth, setAuth] = useState();

   return (
      <ApolloProvider client={client}>
         {!auth ? <Auth /> : <h1>Estas logueado</h1>}
      </ApolloProvider>
   );
}
