import React from 'react';
import renderer from 'react-test-renderer';
import FancyInput from './FancyInput';

describe('FancyInput', () => {
  it('should render correctly', () => {
    expect(
      renderer.create(
        <FancyInput />
      )
    ).toMatchSnapshot();
  });
});