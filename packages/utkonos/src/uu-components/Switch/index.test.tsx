/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import type { Ref } from 'react';
import { createRef } from 'react';
import { Switch, SwitchProps } from '.';

const SwitchWrapper = (props: Partial<SwitchProps> & { customRef?: Ref<HTMLInputElement> }) => {
  const { customRef, ...rest } = props;
  return <Switch ref={customRef} {...rest} />;
};

describe('Switch', () => {
  describe('snapshot', () => {
    it('default', () => {
      const component = <Switch />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('checked', () => {
      const component = <Switch defaultChecked />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('disabled', () => {
      const component = <Switch disabled />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('disabled checked', () => {
      const component = <Switch disabled defaultChecked />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('component', () => {
    it('should properly pass ref to the Switch element', () => {
      const ref = createRef<HTMLInputElement>();
      const { getByRole } = render(<SwitchWrapper customRef={ref} />);
      ref.current?.focus();
      expect(getByRole('checkbox')).toHaveFocus();
    });
  });
});
