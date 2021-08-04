import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
   uri: 'http://localhost:4001/',
});

const client = new ApolloClient({
   connectToDevTools: true,
   cache: new InMemoryCache(),
   link: httpLink,
});

export default client;
