import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1ZGFjNGMwLTQxYWEtNDBkYy05ZDdkLTEwYjRlNjE3MWUzNyIsInVzZXJuYW1lIjoidGhvcmlxIiwiZnVsbE5hbWUiOiJOdXIgTXVoYW1tYWQgVGhvcmlxIiwiaXNBc2Vzb3IiOmZhbHNlLCJpYXQiOjE3MzExNDQxNzUsImV4cCI6MTc2MjY4MDE3NSwiYXVkIjoidXJuOmF1ZGllbmNlOm1vbmV2cGFrIiwiaXNzIjoidXJuOmlzc3Vlcjptb25ldnBhayJ9.W6mijEmOquJWUIRiVTcYfWZ_gWEGLOFgbW8tnc5uoFs'

    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        },
    };
});

const httpLink = new HttpLink({
    uri: `${process.env.EXPO_PUBLIC_SERVER_URL}:4848/graphql`
});

const link = ApolloLink.from([authLink, httpLink]);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})

export default client;