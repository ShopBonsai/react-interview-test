import React from 'react';
import Cart from '../Cart';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureMockStore();
const store = mockStore({});

describe('Cart Component', () => {
    it('renders correctly', () => {
        const renderer = new ShallowRenderer()
        renderer.render(<Provider store={store}><Cart/></Provider>);
        const renderedOutput = renderer.getRenderOutput();
        expect(renderedOutput).toMatchSnapshot();
    });
})
