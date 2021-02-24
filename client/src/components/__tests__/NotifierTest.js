import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Provider} from "react-redux";
import Notifier from "../Notifier";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe('Notifier Component', () => {
    it('renders correctly', () => {
        const renderer = new ShallowRenderer()
        renderer.render(<Provider store={store}><Notifier/></Provider>);
        const renderedOutput = renderer.getRenderOutput();
        expect(renderedOutput).toMatchSnapshot();
    });
})
