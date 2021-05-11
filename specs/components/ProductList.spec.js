import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import { Loader } from '../../client/src/components/Loader';
import { MerchantTile } from '../../client/src/components/MerchantTile';
import ProductsList from '../../client/src/components/Products';
import {
    productsListData as mockproductsListData,
    mocks,
} from './fixtures/productList';

describe('Product List component unit tests', () => {
    it('should render a Loader component when loading', () => {
        const component = renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ProductsList />
            </MockedProvider>,
        ).root;

        expect(component.findByType(Loader)).toBeDefined();
        expect(() => component.findByType(MerchantTile)).toThrow();
    });

    it('should render a loader component if no merchant data is returned', async () => {
        const tempMocks = [
            { ...mocks[0], result: { data: { merchants: [] } } },
        ];
        const component = renderer.create(
            <MockedProvider mocks={tempMocks} addTypename={false}>
                <ProductsList />
            </MockedProvider>,
        ).root;

        expect(component.findByType(Loader)).toBeDefined();
        expect(() => component.findByType(MerchantTile)).toThrow();
    });

    it('should render a merchant tile component for each merchant', async () => {
        const component = renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ProductsList />
            </MockedProvider>,
        );

        // this allows the render to happen on the next tick, giving a chance for data to have loaded
        await new Promise((resolve) => setTimeout(resolve, 0));

        const updatedComponent = component.root;

        expect(updatedComponent.findAllByType(MerchantTile)).toHaveLength(
            mockproductsListData.merchants.length,
        );
        expect(() => updatedComponent.findByType(Loader)).toThrow();
    });
});
