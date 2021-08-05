/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import Auth from './pages/Auth';
import { getToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routes/Navigation';

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

   const logout = () => {
      console.log('Cerrando sesion');
   };

   const setUser = (user) => {
      setAuth(user);
   };

   const authData = useMemo(
      () => ({
         auth,
         logout,
         setUser,
      }),
      [auth]
   );

   return (
      <ApolloProvider client={client}>
         <AuthContext.Provider value={authData}>
            {!auth ? <Auth /> : <Navigation />}
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
         </AuthContext.Provider>
      </ApolloProvider>
   );
}
