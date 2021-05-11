import { GET_PRODUCTS } from '../../../client/src/components/Products';

import { merchantData } from './merchantTile';

export const productsListData = {
    merchants: [
        { ...merchantData, guid: 0 },
        { ...merchantData, guid: 1 },
        { ...merchantData, guid: 2 },
        { ...merchantData, guid: 3 },
    ],
};

export const mocks = [
    {
        request: { query: GET_PRODUCTS },
        result: { data: productsListData },
    },
];
