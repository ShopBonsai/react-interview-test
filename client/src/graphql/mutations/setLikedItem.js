import { gql } from 'apollo-boost';

const SET_LIKED_ITEM = gql`
    mutation setLikedItem($userId: String!, $productId: String!) {
        setLikedItem(userId: $userId, productId: $productId) {
            isLiked
        }
    }
`

export default SET_LIKED_ITEM;
