/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import type { Ref } from 'react';
import { createRef } from 'react';
import { Checkbox, CheckboxProps } from '../index';

const CheckboxWrapper = (props: Partial<CheckboxProps> & { customRef?: Ref<HTMLInputElement> }) => {
  const { customRef, ...rest } = props;
  return <Checkbox ref={customRef} {...rest} />;
};

describe('Uikit/Checkbox', () => {
  describe('snapshot', () => {
    it('default', () => {
      const component = <Checkbox />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('checked', () => {
      const component = <Checkbox defaultChecked />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('disabled', () => {
      const component = <Checkbox disabled />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('disabled checked', () => {
      const component = <Checkbox disabled defaultChecked />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('component', () => {
    it('should properly pass ref to the Checkbox element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<CheckboxWrapper customRef={ref} />);
      ref.current?.focus();
      const inputCheckbox = screen.getAllByRole('checkbox');
      expect(inputCheckbox[0]).toHaveFocus();
    });
  });
});
