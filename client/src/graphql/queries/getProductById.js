import { gql } from 'apollo-boost';

const GET_PRODUCT_BY_ID = gql`
    query productById($productId: String!) {
        productById(productId: $productId) {
            name
            brand   
            price
            color
            size
        }
    }
`;
export default GET_PRODUCT_BY_ID;
