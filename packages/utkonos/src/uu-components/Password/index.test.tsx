/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import renderer from 'react-test-renderer';
import { Password } from '.';

describe('UIKIT  Password input', () => {
  describe('snapshots', () => {
    it('default snapshot', () => {
      const tree = renderer.create(<Password />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('with lable snapshot', () => {
      const tree = renderer.create(<Password label="test" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('whith error', () => {
      const tree = renderer.create(<Password name="testName" error="Test error" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
