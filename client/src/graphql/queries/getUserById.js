import { gql } from 'apollo-boost';
const GET_USER_BY_ID = gql`
    query user($userId: String!) {
        user(userId: $userId) {
            userId
            firstName
            lastName
            email
            likes
        }
    }    
`;

export default GET_USER_BY_ID;
