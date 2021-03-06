/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import Auth from './pages/Auth';
import { getToken, decodeToken, removeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routes/Navigation';

export default function App() {
   const [auth, setAuth] = useState(undefined);

   useEffect(() => {
      const token = getToken();
      try {
         if (!token) {
            logout();
         } else {
            const decodeTkn = decodeToken(token);
            if (Date.now() / 1000 >= decodeTkn.exp) {
               logout();
            } else {
               setAuth(decodeToken(token));
            }
         }
      } catch (error) {
         console.log(error);
      }
   }, []);

   const logout = () => {
      removeToken();
      setAuth(null);
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

   if (auth === undefined) return null;

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
