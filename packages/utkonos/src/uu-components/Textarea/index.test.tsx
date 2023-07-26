import { useState, createRef } from 'react';
import type { Ref } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Textarea, TextareaProps } from '.';

const TextareaWrapper = (
  props: Partial<TextareaProps> & { customRef?: Ref<HTMLTextAreaElement> },
) => {
  const [value, setValue] = useState('');
  const { customRef, ...rest } = props;
  return (
    <Textarea
      onChange={(e) => setValue(String(e.target.value))}
      value={value}
      aria-label="area"
      ref={customRef}
      {...rest}
    />
  );
};

describe('Textarea component', () => {
  it('should render without errors', () => {
    render(<TextareaWrapper />);
  });

  it('should properly pass ref to the textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();
    const { getByRole } = render(<TextareaWrapper customRef={ref} />);
    ref.current?.focus();
    expect(getByRole('textbox')).toHaveFocus();
  });

  it('should has value text when prop "value" exist', () => {
    const { queryByText } = render(<TextareaWrapper value="Многотекста" />);
    const value = queryByText('Многотекста');
    expect(value).not.toBeNull();
  });

  it('should call onChange when value is changed', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<TextareaWrapper onChange={onChange} />);
    const input = getByLabelText('area');
    fireEvent.change(input, { target: { value: 'Многотекста' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should has placeholder when prop "placeholder" exist', () => {
    const { getByPlaceholderText } = render(<TextareaWrapper placeholder="Test" />);
    const placeholder = getByPlaceholderText('Test');
    expect(placeholder).not.toBeNull();
  });

  it('should hasn\'t error when prop "error" exist and disabled is true', () => {
    const { queryByText } = render(<TextareaWrapper error="error text" disabled />);
    const error = queryByText('error');
    expect(error).toBeNull();
  });
});
