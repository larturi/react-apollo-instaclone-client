/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import Auth from './pages/Auth';

export default function App() {
   const [auth, setAuth] = useState();

   return (
      <ApolloProvider client={client}>
         {!auth ? <Auth /> : <h1>Estas logueado</h1>}
         <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={true}
            pauseOnHover={true}
         />
      </ApolloProvider>
   );
}
