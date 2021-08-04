/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import Auth from './pages/Auth';
import { getToken } from './utils/token';

export default function App() {
   const [auth, setAuth] = useState();

   useEffect(() => {
      const token = getToken();
      if (!token) {
         setAuth(null);
      } else {
         setAuth(token);
      }
   }, []);

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
