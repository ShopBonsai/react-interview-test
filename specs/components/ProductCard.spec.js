import React from 'react';
import renderer from 'react-test-renderer';
import { CardTitle } from 'reactstrap';

import { ProductCard } from '../../client/src/components/ProductCard';
import { productData } from './fixtures/productCard';

describe('Product Card component unit tests', () => {
    it('should render the price in the correct format', () => {
        const testInstance = renderer.create(
            <ProductCard data={productData} />,
        ).root;
        const priceTitle = testInstance.findAllByType(CardTitle)[1];

        expect(priceTitle.children[0].children).toEqual(['Price: $', '19.00']);
    });
});
