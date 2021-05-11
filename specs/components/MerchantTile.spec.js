import React from 'react';
import renderer from 'react-test-renderer';

import { MerchantTile } from '../../client/src/components/MerchantTile';
import { ProductCard } from '../../client/src/components/ProductCard';
import { merchantData } from './fixtures/merchantTile';

describe('Product Card component unit tests', () => {
    it('should render a product tile for each product', () => {
        const testInstance = renderer.create(
            <MerchantTile data={merchantData} />,
        ).root;
        const products = testInstance.findAllByType(ProductCard);

        expect(products).toHaveLength(merchantData.products.length);
    });

    it('should render no product cards if the merchant does not have any listed products', () => {
        const data = {
            ...merchantData,
            products: [],
        };

        const testInstance = renderer.create(<MerchantTile data={data} />).root;
        const products = testInstance.findAllByType(ProductCard);

        expect(products).toHaveLength(0);
    });

    it('should not render any children if the merchant has not been published', () => {
        const data = {
            ...merchantData,
            publishedState: false,
        };

        const testInstance = renderer.create(<MerchantTile data={data} />).root;

        expect(testInstance.children).toHaveLength(0);
    });
});
