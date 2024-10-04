import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhZjU5NWMzLTYyNTMtNDJjYy1iYjZlLTFiZjEyZjllNzU5MyIsInVzZXJuYW1lIjoidGhvcmlxIiwiZnVsbE5hbWUiOiJOdXIgTXVoYW1tYWQgVGhhcmlxIiwiaXNBc2Vzb3IiOmZhbHNlLCJpYXQiOjE3MjYyMTU0MjksImV4cCI6MTc1Nzc1MTQyOSwiYXVkIjoidXJuOmF1ZGllbmNlOm1vbmV2cGFrIiwiaXNzIjoidXJuOmlzc3Vlcjptb25ldnBhayJ9.dW3XULgLEs79DpfGJFxSow31TXk_hZ4J2u24fQoJM8g'
    
    return {
        headers: {
            ...headers,
            authorization:  `Bearer ${token}`,
        },
    };
});

const httpLink = new HttpLink({ 
    uri: 'https://aksesku.kpk.go.id/graphql' 
});

const link = ApolloLink.from([authLink, httpLink]);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})

export default client;