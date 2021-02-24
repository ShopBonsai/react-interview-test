import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FavProduct from '../FavProduct';

describe('FavProduct Component', () => {
    it('renders correctly', () => {
        const productProps = {
            favorite: {
                name: 'name',
                brand: 'brand',
                color: 'color',
                size: 'size',
                price: 1
            }
        }
        const renderer = new ShallowRenderer();
        renderer.render(<FavProduct favorite={productProps}/>);
        const renderedOutput = renderer.getRenderOutput();
        expect(renderedOutput).toMatchSnapshot();
    });
});
