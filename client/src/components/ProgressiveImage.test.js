import React from 'react';
import renderer from 'react-test-renderer';
import ProgressiveImage from './ProgressiveImage';

describe('ProgressiveImage', () => {
  it('should render correctly', () => {
    expect(
      renderer.create(
        <ProgressiveImage />
      )
    ).toMatchSnapshot();
  });
});