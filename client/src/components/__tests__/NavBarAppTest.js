import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Provider} from 'react-redux';
import NavBarApp from '../NavBarApp';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

const store = mockStore({});

describe('NavBarApp Component', () => {
    it('renders correctly', () => {
        const renderer = new ShallowRenderer()
        renderer.render(<Provider store={store}><NavBarApp/></Provider>);
        const renderedOutput = renderer.getRenderOutput();
        expect(renderedOutput).toMatchSnapshot();
    });
})
