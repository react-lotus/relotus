import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ToggleButton } from '.';

describe('ToggleButton', () => {
  it('render', () => {
    const component = render(
      <ToggleButton
        value="value1"
        options={[
          { label: 'label1', value: 'value1' },
          { label: 'label2', value: 'value2' },
        ]}
      />,
    );

    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('has right styles when disabled', () => {
    render(
      <ToggleButton
        disabled
        value="value1"
        options={[
          { label: 'label1', value: 'value1' },
          { label: 'label2', value: 'value2' },
        ]}
      />,
    );

    const button = screen.getByText('label1');

    expect(button).toHaveClass('uu-toggleButtonLabel_disabled');
  });

  it('should not to be clickable when disabled', () => {
    const onChange = jest.fn();

    render(
      <ToggleButton
        disabled
        onChange={onChange}
        value="value2"
        options={[
          { label: 'label1', value: 'value1' },
          { label: 'label2', value: 'value2' },
        ]}
      />,
    );

    const button = screen.getByText('label1');

    fireEvent.click(button);

    expect(onChange).not.toHaveBeenCalled();
  });
});
