import { useState, createRef } from 'react';
import type { Ref } from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MultiSelect, MultiSelectProps } from '..';
import { Option } from '../../_option';

const options = [
  { value: 'value1', label: 'Вариант1' },
  { value: 'value2', label: 'Вариант2' },
  { value: 'value3', label: 'Вариант3' },
  { value: 'value4', label: 'Вариант4' },
  { value: 'value5', label: 'Вариант5' },
  { value: 'value6', label: 'Вариант6' },
  { value: 'value7', label: 'Вариант7' },
  { value: 'value8', label: 'Вариант8' },
  { value: 'value9', label: 'Вариант9' },
];

const MultiSelectControlledWrapper = (
  props: Partial<MultiSelectProps> & { customRef?: Ref<HTMLDivElement> },
) => {
  const { customRef, ...rest } = props;
  const [value, setValue] = useState<Option[]>([]);
  return (
    <>
      <MultiSelect
        placeholder="Multiselect"
        onChange={setValue}
        value={value}
        options={options}
        ref={customRef}
        {...rest}
      />
    </>
  );
};

describe('MultiSelect component', () => {
  it('should render without errors', async () => {
    await waitFor(() => render(<MultiSelectControlledWrapper />));
    const ms = screen.getByText('Multiselect');
    expect(ms).toBeInTheDocument();
  });

  it('menu should be displayed when selecting option with filtering enabled', async () => {
    await waitFor(() => render(<MultiSelectControlledWrapper filterable />));
    const ms = screen.getByText('Multiselect');
    fireEvent.click(ms);
    const option1 = screen.getByText('Вариант1');
    const option2 = screen.getByText('Вариант2');
    const input = screen.getByPlaceholderText('Поиск');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    fireEvent.click(option1);
    fireEvent.blur(input);

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('menu should be disabled', async () => {
    render(<MultiSelectControlledWrapper disabled />);
    const select = await screen.findByRole('combobox');

    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('filter field should be empty after close', async () => {
    render(<MultiSelectControlledWrapper filterable clearFilter="closeMenu" />);
    const ms = screen.getByText('Multiselect');
    fireEvent.click(ms);

    const input = screen.getByPlaceholderText('Поиск');
    fireEvent.change(input, { target: { value: 'Вариант' } });
    await waitFor(() => {
      expect(input).toHaveValue('Вариант');
    });

    fireEvent.click(ms);
    fireEvent.click(ms);

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('');
    });
  });

  it('filter field should be empty after select', async () => {
    render(<MultiSelectControlledWrapper filterable clearFilter="select" />);
    const ms = screen.getByText('Multiselect');
    fireEvent.click(ms);

    const input = screen.getByPlaceholderText('Поиск');
    const option1 = screen.getByText('Вариант1');

    fireEvent.change(input, { target: { value: 'Вариант' } });

    await waitFor(() => {
      expect(input).toHaveValue('Вариант');
    });

    fireEvent.click(option1);
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should properly pass ref to the MultiSelect element', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByLabelText } = render(
      <MultiSelectControlledWrapper options={[]} customRef={ref} label="label for multi select" />,
    );
    ref.current?.focus();
    expect(getByLabelText('label for multi select', { selector: 'div' })).toHaveFocus();
  });
});
