/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { RadioGroup } from '../index';

describe('Uikit/RadioGroup', () => {
  describe('snapshot', () => {
    it('default', () => {
      const component = (
        <RadioGroup
          options={[
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ]}
        />
      );

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('disabled', () => {
      const component = (
        <RadioGroup
          disabled
          options={[
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ]}
        />
      );

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('only one item disabled', () => {
      const component = (
        <RadioGroup
          options={[
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2', disabled: true },
          ]}
        />
      );

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('default value', () => {
      const component = (
        <RadioGroup
          value="value1"
          options={[
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ]}
        />
      );

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('component', () => {
    it('should properly pass ref to the RadioGroup element', () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <RadioGroup
          options={[
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ]}
          ref={ref}
        />,
      );
      ref.current?.focus();
      const divWithRef = container.getElementsByClassName('uu-radioGroup');
      expect(divWithRef[0]).toHaveFocus();
    });
  });
});
