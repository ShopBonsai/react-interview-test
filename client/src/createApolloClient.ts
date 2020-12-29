import {
    ApolloClient,
    NormalizedCacheObject,
    InMemoryCache,
    makeVar,
} from '@apollo/client';

const client = new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar();
                        },
                    },
                },
            },
        },
    }),
    uri: 'http://localhost:3000/graphql',
    headers: {
        authorization: localStorage.getItem('token') || '',
    },
});

export default client;

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));
