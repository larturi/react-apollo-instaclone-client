import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { getToken } from '../utils/token';

const httpLink = createUploadLink({
   uri: 'https://apollo-instaclone-server.onrender.com/',
});

const authLink = setContext((_, { headers }) => {
   const token = getToken();
   return {
      headers: {
         ...headers,
         Authorization: token ? `Bearer ${token}` : '',
      },
   };
});

const client = new ApolloClient({
   connectToDevTools: true,
   cache: new InMemoryCache(),
   link: authLink.concat(httpLink),
});

export default client;
