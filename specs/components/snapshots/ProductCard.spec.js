import React from 'react';
import renderer from 'react-test-renderer';

import { ProductCard } from '../../../client/src/components/ProductCard';
import { productData } from '../fixtures/productCard';

describe('Product Card component snapshot tests', () => {
    it('should render correctly', () => {
        const tree = renderer
            .create(<ProductCard data={productData} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
