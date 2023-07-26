import React, { useState, createRef, forwardRef } from 'react';
import { render, fireEvent, act, waitFor, screen } from '@testing-library/react';
import { Autocomplete } from '..';
import type { AutocompleteOption, AutocompleteProps } from '../types';

const options: AutocompleteOption[] = [
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

const AutocompleteControlledWrapper = forwardRef<HTMLInputElement, Partial<AutocompleteProps>>(
  (props, ref) => {
    const [value, setValue] = useState('');
    return (
      <>
        <Autocomplete
          onChange={(e) => setValue(String(e.target.value))}
          value={value}
          options={options}
          {...props}
          ref={ref}
        />
      </>
    );
  },
);

const AutocompleteUncontrolledWrapper = forwardRef<HTMLInputElement, Partial<AutocompleteProps>>(
  (props, ref) => {
    return (
      <>
        <Autocomplete options={options} {...props} ref={ref} />
      </>
    );
  },
);

describe('Autocomplete component', () => {
  it('should render without errors', async () => {
    const { getByPlaceholderText } = render(<AutocompleteControlledWrapper />);
    const input = getByPlaceholderText('Поиск');
    await waitFor(() => {
      expect(input).toBeInTheDocument();
    });
  });

  it('should be disabled', async () => {
    render(<AutocompleteControlledWrapper disabled />);
    const select = await screen.findByRole('combobox');
    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  describe('controlled', () => {
    it('should show options', async () => {
      const { getByText, getByPlaceholderText } = render(<AutocompleteControlledWrapper />);
      const input = getByPlaceholderText('Поиск');

      act(() => {
        fireEvent.change(input, { target: { value: 'В' } });
      });

      const firstOption = getByText('Вариант1');
      const lastOption = getByText('Вариант9');

      await waitFor(() => {
        expect(firstOption).toBeInTheDocument();
        expect(lastOption).toBeInTheDocument();
      });
    });

    it('should show exact option', async () => {
      const { getByText, getByPlaceholderText } = render(<AutocompleteControlledWrapper />);
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант' } });

      const firstOption = getByText('Вариант1');
      const secondOption = getByText('Вариант2');

      expect(firstOption).toBeInTheDocument();
      expect(secondOption).toBeInTheDocument();

      fireEvent.change(input, { target: { value: 'Вариант1' } });

      await waitFor(() => {
        expect(firstOption).toBeInTheDocument();
        expect(secondOption).not.toBeInTheDocument();
      });
    });

    it("should show empty text when value doesn't match", async () => {
      const { getByText, getByPlaceholderText } = render(<AutocompleteControlledWrapper />);
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'No' } });

      const emptyText = getByText('Нет совпадений');

      await waitFor(() => {
        expect(emptyText).toBeInTheDocument();
      });
    });

    it('should call onChange when option is selected', async () => {
      const onChange = jest.fn();
      const { getByText, getByPlaceholderText } = render(
        <AutocompleteControlledWrapper onChange={onChange} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант' } });

      const secondOption = getByText('Вариант2');

      await waitFor(() => {
        fireEvent.click(secondOption);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            id: expect.any(String),
            value: 'value2',
            name: undefined,
          },
          selectedItem: { value: 'value2', label: 'Вариант2' },
        }),
      );
    });

    it('should show limited list of option when exist "optionsCount" prop', async () => {
      const { queryByText, getByPlaceholderText } = render(
        <AutocompleteControlledWrapper optionsCount={2} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант' } });

      const firstOption = queryByText('Вариант1');
      const secondOption = queryByText('Вариант2');

      const fourthOption = queryByText('Вариант3');
      const ninthOption = queryByText('Вариант9');

      await waitFor(() => {
        expect(firstOption).toBeInTheDocument();
        expect(secondOption).toBeInTheDocument();
        expect(fourthOption).toBeNull();
        expect(ninthOption).toBeNull();
      });
    });

    it('should format input value when prop "formatInputValue" exist', async () => {
      const formatInputValue = (item: AutocompleteOption | null) => {
        if (item?.label) {
          return `-${item.label}-`;
        }

        return '';
      };
      const { getByPlaceholderText, getByText } = render(
        <AutocompleteControlledWrapper formatInputValue={formatInputValue} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант1' } });
      const firstOption = getByText('Вариант1');
      fireEvent.click(firstOption);

      await waitFor(() => {
        expect(input).toHaveValue('-Вариант1-');
      });
    });

    it('should format option text when prop "formatOptionLabel" exist', async () => {
      const formatOptionLabel: NonNullable<AutocompleteProps['formatOptionLabel']> = ({ option }) =>
        `--${option.label as string}--`;
      const { getByPlaceholderText, queryByText } = render(
        <AutocompleteControlledWrapper formatOptionLabel={formatOptionLabel} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант1' } });
      const firstOption = queryByText('--Вариант1--');

      await waitFor(() => {
        expect(firstOption).not.toBeNull();
      });
    });

    it('should has suffix when prop "suffix" exist', async () => {
      const { queryByText } = render(<AutocompleteControlledWrapper suffix="suffix" />);
      const suffix = queryByText('suffix');

      await waitFor(() => {
        expect(suffix).not.toBeNull();
      });
    });

    it('should has placeholder when prop "placeholder" exist', async () => {
      const { getByPlaceholderText } = render(<AutocompleteControlledWrapper placeholder="Test" />);
      const placeholder = getByPlaceholderText('Test');

      await waitFor(() => {
        expect(placeholder).not.toBeNull();
      });
    });

    it('should hasn\'t placeholder when prop "placeholder" exist and disabled is true', async () => {
      const { queryByPlaceholderText } = render(
        <AutocompleteControlledWrapper placeholder="Test" disabled />,
      );
      const placeholder = queryByPlaceholderText('Test');
      const emptyPlaceholder = queryByPlaceholderText('');

      await waitFor(() => {
        expect(placeholder).toBeNull();
        expect(emptyPlaceholder).toBeInTheDocument();
      });
    });

    it('should be open when isOpen true', async () => {
      const { getByRole } = render(<AutocompleteControlledWrapper placeholder="Test" isOpen />);
      await waitFor(() => {
        expect(getByRole('listbox').classList).not.toContain('uu-selectMenu_hidden');
      });
    });

    it('should show autocomlete when isOpen becomes true', async () => {
      const { getByRole, rerender } = render(
        <AutocompleteControlledWrapper placeholder="Test" isOpen={false} />,
      );
      expect(getByRole('listbox').classList).toContain('uu-selectMenu_hidden');

      rerender(<AutocompleteControlledWrapper placeholder="Test" isOpen />);
      expect(getByRole('listbox').classList).not.toContain('uu-selectMenu_hidden');

      rerender(<AutocompleteControlledWrapper placeholder="Test" isOpen={false} />);
      await waitFor(() => {
        expect(getByRole('listbox').classList).toContain('uu-selectMenu_hidden');
      });
    });

    it('should show call onIsOpenChange when visibility changed', async () => {
      const handleVisibleChange = jest.fn();

      const { getAllByRole } = render(
        <AutocompleteControlledWrapper
          placeholder="Test"
          isOpen
          onIsOpenChange={handleVisibleChange}
        />,
      );

      const [option] = getAllByRole('option');
      fireEvent.click(option);

      await waitFor(() => {
        expect(handleVisibleChange).toBeCalledWith(expect.objectContaining({ isOpen: false }));
      });
    });

    it('should call onInputValueChange when input is change', async () => {
      const onInputValueChange = jest.fn();
      const { getByPlaceholderText } = render(
        <AutocompleteControlledWrapper onInputValueChange={onInputValueChange} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вар' } });

      await waitFor(() => {
        expect(onInputValueChange).toHaveBeenCalledTimes(1);
        expect(onInputValueChange).toHaveBeenCalledWith('Вар');
      });
    });

    it('should not call onChange after remove current value', async () => {
      // need realise reset current value in controlled mode manual
      const onChange = jest.fn();
      const { getByText, getByPlaceholderText } = render(
        <AutocompleteControlledWrapper onChange={onChange} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант' } });

      const secondOption = getByText('Вариант2');

      fireEvent.click(secondOption);

      fireEvent.change(input, { target: { value: 'Вариант' } });

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1);
      });
    });

    it('should call selectOption when it exist', async () => {
      // need realise reset current value in controlled mode manual
      const selectOption = jest.fn();
      const { getByPlaceholderText } = render(
        <AutocompleteControlledWrapper selectOption={selectOption} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант' } });

      await waitFor(() => {
        expect(selectOption).toHaveBeenCalledTimes(options.length);
      });
    });
  });

  describe('uncontrolled', () => {
    it('should show options', async () => {
      const { getByText, getByPlaceholderText } = render(<AutocompleteUncontrolledWrapper />);
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'В' } });

      const firstOption = getByText('Вариант1');
      const lastOption = getByText('Вариант9');

      await waitFor(() => {
        expect(firstOption).toBeInTheDocument();
        expect(lastOption).toBeInTheDocument();
      });
    });

    it('should show exact option', async () => {
      const { getByText, getByPlaceholderText } = render(<AutocompleteUncontrolledWrapper />);
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант' } });

      const firstOption = getByText('Вариант1');
      const secondOption = getByText('Вариант2');

      expect(firstOption).toBeInTheDocument();
      expect(secondOption).toBeInTheDocument();

      fireEvent.change(input, { target: { value: 'Вариант1' } });

      await waitFor(() => {
        expect(firstOption).toBeInTheDocument();
        expect(secondOption).not.toBeInTheDocument();
      });
    });

    it("should show empty text when value doesn't match", async () => {
      const { getByText, getByPlaceholderText } = render(<AutocompleteUncontrolledWrapper />);
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'No' } });

      const emptyText = getByText('Нет совпадений');

      await waitFor(() => {
        expect(emptyText).toBeInTheDocument();
      });
    });

    it('should call onChange when option is selected', async () => {
      const onChange = jest.fn();
      const { getByText, getByPlaceholderText } = render(
        <AutocompleteUncontrolledWrapper onChange={onChange} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант' } });

      const secondOption = getByText('Вариант2');

      fireEvent.click(secondOption);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              id: expect.any(String),
              value: 'value2',
              name: undefined,
            },
            selectedItem: { value: 'value2', label: 'Вариант2' },
          }),
        );
      });
    });

    it('should show limited list of option when exist "optionsCount" prop', async () => {
      const { queryByText, getByPlaceholderText } = render(
        <AutocompleteUncontrolledWrapper optionsCount={2} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант' } });

      const firstOption = queryByText('Вариант1');
      const secondOption = queryByText('Вариант2');

      const fourthOption = queryByText('Вариант3');
      const ninthOption = queryByText('Вариант9');

      await waitFor(() => {
        expect(firstOption).toBeInTheDocument();
        expect(secondOption).toBeInTheDocument();
        expect(fourthOption).toBeNull();
        expect(ninthOption).toBeNull();
      });
    });

    it('should format input value when prop "formatInputValue" exist', async () => {
      const formatInputValue = (item: AutocompleteOption | null) => {
        if (item?.label) {
          return `-${item.label}-`;
        }

        return '';
      };
      const { getByPlaceholderText, getByText } = render(
        <AutocompleteUncontrolledWrapper formatInputValue={formatInputValue} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант1' } });
      const firstOption = getByText('Вариант1');
      fireEvent.click(firstOption);

      await waitFor(() => {
        expect(input).toHaveValue('-Вариант1-');
      });
    });

    it('should format option text when prop "formatOptionLabel" exist', async () => {
      const formatOptionLabel: NonNullable<AutocompleteProps['formatOptionLabel']> = ({ option }) =>
        `--${option.label as string}--`;
      const { getByPlaceholderText, queryByText } = render(
        <AutocompleteUncontrolledWrapper formatOptionLabel={formatOptionLabel} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант1' } });
      const firstOption = queryByText('--Вариант1--');

      await waitFor(() => {
        expect(firstOption).not.toBeNull();
      });
    });

    it('should call onChange after remove current value', async () => {
      const onChange = jest.fn();
      const { getByText, getByPlaceholderText } = render(
        <AutocompleteUncontrolledWrapper onChange={onChange} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант' } });

      const secondOption = getByText('Вариант2');

      fireEvent.click(secondOption);

      fireEvent.change(input, { target: { value: 'Вариант' } });

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange.mock.calls).toEqual([
          // First call
          [
            expect.objectContaining({
              target: {
                id: expect.any(String),
                value: 'value2',
                name: undefined,
              },
              selectedItem: { value: 'value2', label: 'Вариант2' },
            }),
          ],
          // Second call
          [
            expect.objectContaining({
              target: {
                id: expect.any(String),
                value: null,
                name: undefined,
              },
              selectedItem: null,
            }),
          ],
        ]);
      });
    });

    it('should call selectOption when it exist', async () => {
      // need realise reset current value in controlled mode manual
      const selectOption = jest.fn();
      const { getByPlaceholderText } = render(
        <AutocompleteControlledWrapper selectOption={selectOption} />,
      );
      const input = getByPlaceholderText('Поиск');

      fireEvent.change(input, { target: { value: 'Вариант' } });

      await waitFor(() => {
        expect(selectOption).toHaveBeenCalledTimes(options.length);
      });
    });
  });

  describe('inputRef', () => {
    it('Providing ref correctly', () => {
      const ref = createRef<HTMLInputElement>();
      const wrapperRef = createRef<HTMLDivElement>();
      render(
        <div ref={wrapperRef}>
          <AutocompleteControlledWrapper placeholder="Test" ref={ref} />,
        </div>,
      );
      expect(wrapperRef.current).toContainElement(ref.current);
    });
  });
});
