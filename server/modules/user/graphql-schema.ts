import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';

const typeDefs = gql`
    type Query {
        user: User!
    }
    type User {
        _id: String
        name: String
        email: String
    }
    type AuthResponse {
        token: String
        name: String
    }
    type Mutation {
        authGoogle(accessToken: String!): AuthResponse!
    }
`;

export default makeExecutableSchema({
    typeDefs,
    resolvers,
});
