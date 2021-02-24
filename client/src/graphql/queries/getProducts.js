import { gql } from 'apollo-boost';

const GET_PRODUCTS = gql`
    {
        merchants {
            guid
            merchant
            products {
                id
                name
                price
                description
                color
                size
                image
            }
        }
    }
`;

export default GET_PRODUCTS;
