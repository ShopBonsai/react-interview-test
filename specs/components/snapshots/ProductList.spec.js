import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import ProductsList from '../../../client/src/components/Products';
import { mocks } from '../fixtures/productList';

describe('Product List component snapshot tests', () => {
    it('should render the loading state', () => {
        const tree = renderer
            .create(
                <MockedProvider mocks={mocks}>
                    <ProductsList />
                </MockedProvider>,
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render the product list of returned merchants', async () => {
        const component = renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ProductsList />
            </MockedProvider>,
        );

        // this allows the render to happen on the next tick, giving a chance for data to load
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(component.toJSON()).toMatchSnapshot();
    });
});
