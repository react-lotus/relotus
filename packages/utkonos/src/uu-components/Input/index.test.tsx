/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import renderer from 'react-test-renderer';
import { Input } from '.';

const onChange = jest.fn();

describe('UIKIT | Input NEW', () => {
  describe('Snapshots', () => {
    it('default', () => {
      const tree = renderer.create(<Input name="testName" onChange={onChange} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('labeled row', () => {
      const tree = renderer
        .create(<Input name="testName" label="labeled" onChange={onChange} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('labeled column', () => {
      const tree = renderer
        .create(<Input name="testName" label="labeled" direction="column" onChange={onChange} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('with error', () => {
      const tree = renderer
        .create(<Input name="testName" error="Test error" onChange={onChange} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with suffix', () => {
      const tree = renderer
        .create(<Input name="testName" suffix="Руб" onChange={onChange} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('disabled', () => {
      const tree = renderer.create(<Input name="testName" disabled onChange={onChange} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('disabled with suffix', () => {
      const tree = renderer
        .create(<Input name="testName" suffix="Руб" disabled onChange={onChange} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('disabled with suffix and Error', () => {
      const tree = renderer
        .create(
          <Input name="testName" suffix="Руб" disabled error="Test error" onChange={onChange} />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
