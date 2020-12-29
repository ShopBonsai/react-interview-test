import React from 'react';
import 'babel-polyfill';
import { InMemoryCache } from '@apollo/client';

import { renderApollo, cleanup, waitFor, act } from '../../../test-utils';
import Products, { GET_PRODUCTS } from '../products';

const mockProducts = {
    data: {
        merchants: [
            {
                products: [
                    {
                        id: '37b4d1b7-ed3c-4d28-91e0-ef0fb89b2b12',
                        name: 'VENIAM Swimming Shorts',
                        price: 706.2,
                        description:
                            'Excepteur non Lorem aliqua esse irure veniam elit labore culpa velit nostrud ad nostrud.',
                        color: 'deserunt',
                        size: 'L',
                        quantity: 1,
                        image: 'https://picsum.photos/300/?random',
                    },
                    {
                        id: '6e73c7a1-d59f-48d3-b547-ca7504ed581d',
                        name: 'ANIM Underwear',
                        price: 516.2,
                        description:
                            'Nostrud fugiat duis ea duis laborum mollit eiusmod sunt nisi sunt pariatur nostrud et.',
                        color: 'tempor',
                        size: 'L',
                        quantity: 4,
                        image: 'https://picsum.photos/300/?random',
                    },
                    {
                        id: '3e0aa76a-8236-49e6-80ec-0bfa62dce56b',
                        name: 'SIT Polo Shirt',
                        price: 523.4,
                        description:
                            'Laborum non sint nostrud quis minim consequat labore sit dolor est sit.',
                        color: 'velit',
                        size: 'M',
                        quantity: 2,
                        image: 'https://picsum.photos/300/?random',
                    },
                    {
                        id: 'f569166f-2827-4f10-8c91-47ade5b11a57',
                        name: 'CUPIDATAT Sandals',
                        price: 992.4,
                        description:
                            'Elit dolor aliqua culpa ea labore ullamco ea aliquip cupidatat eu dolore.',
                        color: 'pariatur',
                        size: 'S',
                        quantity: 9,
                        image: 'https://picsum.photos/300/?random',
                    },
                    {
                        id: '682d3464-4ae0-4f4b-b26a-e1e42fdc7ff2',
                        name: 'ET Poncho',
                        price: 336.8,
                        description:
                            'Duis dolor eu in ea quis et exercitation dolor officia.',
                        color: 'aute',
                        size: 'M',
                        quantity: 4,
                        image: 'https://picsum.photos/300/?random',
                    },
                ],
            },
        ],
    },
};
// TODO: Figure out why data is always undefined
describe('Products Page', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders products', async () => {
        const cache = new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        isLoggedIn: {
                            read() {
                                return true;
                            },
                        },
                    },
                },
            },
            addTypename: false,
        });
        const mocks = [
            {
                request: { query: GET_PRODUCTS },
                result: mockProducts,
            },
        ];
        const { getByText } = await renderApollo(<Products />, {
            mocks,
            cache,
        });
        await waitFor(() => getByText(/VENIAM Swimming Shorts/i));
    });
});
