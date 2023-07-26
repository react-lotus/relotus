/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import type { Ref } from 'react';
import { createRef } from 'react';
import { Radio, RadioProps } from '../index';

const RadioWrapper = (props: Partial<RadioProps> & { customRef?: Ref<HTMLInputElement> }) => {
  const { customRef, ...rest } = props;
  return <Radio value="value" ref={customRef} {...rest} />;
};

describe('Uikit/Radio', () => {
  describe('snapshot', () => {
    it('default', () => {
      const component = <Radio value="value" />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('checked', () => {
      const component = <Radio value="value" checked />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('disabled', () => {
      const component = <Radio disabled />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('disabled checked', () => {
      const component = <Radio disabled defaultChecked />;

      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('component', () => {
    it('should properly pass ref to the Radio element', () => {
      const ref = createRef<HTMLInputElement>();
      const { getByRole } = render(<RadioWrapper customRef={ref} />);
      ref.current?.focus();
      const inputRadio = getByRole('radio');
      expect(inputRadio).toHaveFocus();
    });
  });
});
