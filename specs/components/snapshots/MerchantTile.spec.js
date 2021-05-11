import React from 'react';
import renderer from 'react-test-renderer';

import { MerchantTile } from '../../../client/src/components/MerchantTile';
import { merchantData } from '../fixtures/merchantTile';

describe('Merchant Tile component snapshot tests', () => {
    it('should render correctly', () => {
        const tree = renderer
            .create(<MerchantTile data={merchantData} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should not render if the merchant has not been published', () => {
        const data = {
            ...merchantData,
            publishedState: false,
        };
        const tree = renderer.create(<MerchantTile data={data} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
