import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useCombobox, UseComboboxStateChange } from 'downshift';
import { useBooleanState } from '@relotus/hooks';
import { Autocomplete } from '..';
import type { AutocompleteOption, AutocompleteProps } from '../types';
import { ReactComponent as SettingsSvg } from './assets/settings.svg';
import { ReactComponent as SearchSvg } from './assets/search.svg';
import { ReactComponent as Search2Svg } from './assets/search2.svg';
import { ReactComponent as LockSvg } from './assets/lock.svg';
import { Button } from '../../Button';
import { Modal } from '../../Modal';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Control: FC<{ fixWidth?: boolean }> = ({ fixWidth, children }) => (
  <div style={{ flexBasis: 350, width: fixWidth ? 350 : 'auto', marginRight: 20 }}>{children}</div>
);

const getOptions = () => [
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

export default {
  title: 'Controls/Autocomplete',
  component: Autocomplete,
  argTypes: {
    options: {
      description: 'Варианты выбора',
      table: {
        category: 'Props',
      },
    },
    value: {
      description: 'Значение',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    disabled: {
      table: {
        category: 'Props',
      },
    },
    className: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    onChange: {
      action: 'changed',
      control: {
        type: null,
      },
      table: {
        category: 'Props',
      },
    },
    formatOptionLabel: {
      control: {
        type: null,
      },
      table: {
        category: 'Props',
      },
    },
    formatInputValue: {
      control: {
        type: null,
      },
      table: {
        category: 'Props',
      },
    },
    filterOption: {
      control: {
        type: null,
      },
      table: {
        category: 'Props',
      },
    },
    id: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    name: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    optionsCount: {
      control: {
        type: 'number',
      },
      table: {
        category: 'Props',
      },
    },
    icon: {
      description:
        "Иконка в suffix \n\n import { ReactComponent as Search2Svg } from './assets/search2.svg';",
      control: {
        type: 'select',
        options: ['none', 'SettingsSvg', 'SearchSvg', 'Search2Svg', 'LockSvg'],
      },
      table: {
        category: 'Children',
      },
    },
    suffix: {
      control: {
        type: null,
      },
      table: {
        category: 'Children',
      },
    },
    style: {
      control: {
        type: null,
      },
      table: {
        category: 'Props',
      },
    },
    label: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    direction: {
      control: {
        type: 'select',
        options: ['column', 'row'],
      },
      table: {
        category: 'Props',
      },
    },
    error: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Children',
      },
    },
    errorPlacement: {
      control: {
        type: 'select',
        options: ['right', 'left', 'top', 'bottom'],
      },
      table: {
        category: 'Props',
      },
    },
    appendToBody: {
      table: {
        category: 'Props',
      },
    },
    menuMaxHeight: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    menuWidth: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    menuPosition: {
      control: {
        type: 'select',
        options: [
          'left',
          'right',
          'top',
          'bottom',
          'top-start',
          'top-end',
          'bottom-start',
          'bottom-end',
          'right-start',
          'right-end',
          'left-start',
          'left-end',
          'auto',
          'auto-start',
          'auto-end',
        ],
      },
      table: {
        category: 'Props',
      },
    },
    onInputValueChange: {
      action: 'valueChange',
      control: {
        type: null,
      },
      table: {
        category: 'Props',
      },
    },
    selectOption: {
      action: 'selectOption',
      control: {
        type: null,
      },
      table: {
        category: 'Props',
      },
    },
    inputRef: {
      table: {
        category: 'Props',
      },
    },
    onIsOpenChange: {
      action: 'isOpenChanged',
      control: {
        type: null,
      },
      table: {
        category: 'Props',
      },
    },
    required: {
      table: {
        category: 'Props',
      },
    },
    isOpen: {
      table: {
        category: 'Props',
      },
    },
  },
} as Meta;

const SVG_COMPONENTS = {
  SettingsSvg,
  SearchSvg,
  Search2Svg,
  LockSvg,
};

export const Playground: Story<
  AutocompleteProps & {
    icon: keyof typeof SVG_COMPONENTS | 'none';
  }
> = ({ icon, ...args }) => {
  if (icon === 'none') {
    return <Autocomplete {...args} ref={null} />;
  }

  const SvgComponent = SVG_COMPONENTS[icon];
  SvgComponent.toString = () => icon;
  return <Autocomplete {...args} suffix={<SvgComponent />} ref={null} />;
};

Playground.args = {
  options: [
    { value: 'value1', label: 'Вариант1' },
    { value: 'value2', label: 'Вариант2' },
    { value: 'value3', label: 'Вариант3' },
  ],
  icon: 'none',
  onChange: undefined,
  formatInputValue: undefined,
  filterOption: undefined,
  direction: undefined,
  errorPlacement: undefined,
  formatOptionLabel: undefined,
  id: undefined,
  menuMaxHeight: undefined,
  menuPosition: undefined,
  menuWidth: undefined,
  onInputValueChange: undefined,
  onIsOpenChange: undefined,
  placeholder: undefined,
  selectOption: undefined,
  value: undefined,
};

export const Preview = () => {
  const simpleOptions: AutocompleteOption[] = useMemo(
    () => [
      { value: 'regular', label: 'Регулярный' },
      { value: 'promo', label: 'Промо' },
      { value: 'regular1', label: 'Регулярный1' },
      { value: 'promo1', label: 'Промо1' },
      { value: 'regular2', label: 'Регулярный2' },
      { value: 'promo2', label: 'Промо2' },
      { value: 'regular3', label: 'Регулярный3' },
      { value: 'promo3', label: 'Промо3' },
    ],
    [],
  );

  const [value1, setValue1] = useState<string | null>();
  const [value2, setValue2] = useState<string>(simpleOptions[1].value as string);

  const onInputValueChange = useCallback(
    (inputValue) => {
      const selectedItem = simpleOptions.find((opt) => opt.value === value1);
      if (selectedItem?.label !== inputValue && value1) {
        setValue1(null);
      }
    },
    [simpleOptions, value1],
  );

  return (
    <div className={cx('col')}>
      <span className={cx('label')}>Простой выбор</span>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            value={value1}
            onChange={(e) => {
              setValue1(String(e.target.value));
            }}
            onInputValueChange={onInputValueChange}
            options={simpleOptions}
          />
        </Control>
        <Control>
          <Autocomplete
            value={value1}
            onChange={(e) => {
              setValue1(String(e.target.value));
            }}
            options={simpleOptions}
            suffix={<Search2Svg />}
          />
        </Control>
      </div>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            value={value1}
            onChange={(e) => setValue1(String(e.target.value))}
            options={simpleOptions}
            disabled
          />
        </Control>
        <Control>
          <Autocomplete
            value={value1}
            onChange={(e) => {
              setValue1(String(e.target.value));
            }}
            options={simpleOptions}
            suffix={<Search2Svg />}
            disabled
          />
        </Control>
      </div>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            value={value2}
            onChange={(e) => setValue2(String(e.target.value))}
            options={simpleOptions}
          />
        </Control>
        <Control>
          <Autocomplete
            value={value2}
            onChange={(e) => setValue2(String(e.target.value))}
            options={simpleOptions}
            disabled
          />
        </Control>
      </div>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            error="Some error occurred"
            errorPlacement="bottom"
            value={value1}
            onChange={(e) => setValue1(String(e.target.value))}
            options={simpleOptions}
          />
        </Control>
        <Control>
          <Autocomplete
            error="Some error occurred"
            errorPlacement="bottom"
            value={value1}
            onChange={(e) => setValue1(String(e.target.value))}
            options={simpleOptions}
            suffix={<Search2Svg />}
          />
        </Control>
      </div>
    </div>
  );
};

export const UncontrolledMode = () => {
  const simpleOptions: AutocompleteOption[] = [
    { value: 'regular', label: 'Регулярный' },
    { value: 'promo', label: 'Промо' },
    { value: 'regular1', label: 'Регулярный1' },
    { value: 'promo1', label: 'Промо1' },
    { value: 'regular2', label: 'Регулярный2' },
    { value: 'promo2', label: 'Промо2' },
    { value: 'regular3', label: 'Регулярный3' },
    { value: 'promo3', label: 'Промо3' },
  ];

  return (
    <div className={cx('col')}>
      <span className={cx('label')}>Простой выбор</span>
      <div className={cx('row')}>
        <Control>
          <Autocomplete onChange={action('onChange')} options={simpleOptions} />
        </Control>
      </div>
    </div>
  );
};

export const ControlledMode = () => {
  const simpleOptions: AutocompleteOption[] = useMemo(
    () => [
      { value: 'regular', label: 'Регулярный' },
      { value: 'promo', label: 'Промо' },
      { value: 'regular1', label: 'Регулярный1' },
      { value: 'promo1', label: 'Промо1' },
      { value: 'regular2', label: 'Регулярный2' },
      { value: 'promo2', label: 'Промо2' },
      { value: 'regular3', label: 'Регулярный3' },
      { value: 'promo3', label: 'Промо3' },
    ],
    [],
  );

  const [value1, setValue1] = useState<string | null>();

  const onInputValueChange = useCallback(
    (inputValue) => {
      const selectedItem = simpleOptions.find((opt) => opt.value === value1);
      if (selectedItem?.label !== inputValue && value1) {
        // handle null manually
        setValue1(null);
      }
    },
    [simpleOptions, value1],
  );

  return (
    <div className={cx('col')}>
      <span className={cx('label')}>Простой выбор</span>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            value={value1}
            onChange={(e) => {
              action('onChange')(e);
              setValue1(String(e.target.value));
            }}
            onInputValueChange={onInputValueChange}
            options={simpleOptions}
          />
        </Control>
      </div>
    </div>
  );
};

export const Labeled = () => {
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

  const [value, setValue] = useState<string>();

  return (
    <div className={cx('col')}>
      <span className={cx('label')}>Название поля</span>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            options={options}
            label="Название поля сверху"
          />
        </Control>
      </div>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            options={options}
            label="Название поля"
            direction="row"
          />
        </Control>
      </div>
    </div>
  );
};

export const LongLabelOption = () => {
  const options: AutocompleteOption[] = [
    { value: 'all', label: 'Все' },
    { value: 'regular', label: 'Вариант выбора с длинным текстом выбора с длинным текстом' },
    { value: 'promo', label: 'Промо' },
  ];

  const [value, setValue] = useState<string>(options[1].value as string);

  return (
    <div className={cx('col')}>
      <span className={cx('label')}>Вариант выбора с длинным текстом</span>
      <div className={cx('row')}>
        <Control fixWidth>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            options={options}
          />
        </Control>
        <Control fixWidth>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            options={options}
          />
        </Control>
      </div>
      <div className={cx('row')}>
        <Control fixWidth>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            options={options}
            disabled
          />
        </Control>
      </div>
    </div>
  );
};

export const LongList = () => {
  const options: AutocompleteOption[] = Array.from({ length: 20 }).map((_, i) => ({
    value: i,
    label: `Вариант ${i + 1}`,
  }));

  const [value, setValue] = useState<number>(options[options.length - 3].value as number);

  return (
    <div className={cx('col')}>
      <span className={cx('label')}>Длинный список вариантов выбора</span>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            options={options}
          />
        </Control>
        <Control>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            options={options}
          />
        </Control>
      </div>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            options={options}
            disabled
          />
        </Control>
      </div>
      <span className={cx('label')}>
        Длинный список вариантов выбора с ограничением кол-ва элементов
      </span>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            options={options}
            optionsCount={4}
          />
        </Control>
      </div>
    </div>
  );
};

export const MenuSizing = () => {
  const [options] = useState<AutocompleteOption[]>(
    Array.from({ length: 20 }).map((_, i) => ({
      value: i,
      label: `Вариант ${i + 1}`,
    })),
  );

  const [value, setValue] = useState<number>(options[options.length - 3].value as number);
  const onChange = useCallback(
    ({ target: { value: targetValue } }) => setValue(Number(targetValue)),
    [setValue],
  );

  return (
    <div className={cx('col')}>
      <span className={cx('label')}>Menu max height</span>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            label="max-height: 100px"
            value={value}
            onChange={onChange}
            options={options}
            menuMaxHeight={100}
          />
        </Control>
        <Control>
          <Autocomplete
            label="max-height: 50vh"
            value={value}
            onChange={onChange}
            options={options}
            appendToBody
            menuMaxHeight="50vh"
          />
        </Control>
      </div>
      <span className={cx('label')}>Menu width and position</span>
      <div className={cx('row')}>
        <Control>
          <Autocomplete
            label="width: 400px"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            options={options}
            menuWidth={400}
          />
        </Control>
        <Control>
          <Autocomplete
            label="width: 75%; position: bottom-end"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            options={options}
            appendToBody
            menuWidth="75%"
            menuPosition="bottom-end"
          />
        </Control>
      </div>
    </div>
  );
};

export const FormatOptionLabel = () => {
  type TCurrency = {
    code: string;
    description: string;
  };

  const currencies: TCurrency[] = [
    {
      code: 'RUB',
      description: 'Российский рубль',
    },
    {
      code: 'STD',
      description: 'Добра',
    },
    {
      code: 'USD',
      description: 'Доллар США',
    },
    {
      code: 'XCD',
      description: 'Восточно-карибский доллар',
    },
  ];

  const options: AutocompleteOption[] = currencies.map((currency) => ({
    value: currency.code,
    ...currency,
  }));

  const formatCurrencyOption: AutocompleteProps['formatOptionLabel'] = ({ option }) => {
    return (
      <>
        <strong>{option.code}</strong> {option.description}
      </>
    );
  };

  const filterCurrencyOption = (query: string) => {
    const queryRe = new RegExp(query, 'i');
    return (option: AutocompleteOption) =>
      queryRe.test(option.code as string) || queryRe.test(option.description as string);
  };

  const formatInputValue = (option: AutocompleteOption | null) =>
    option ? `${option.code as string} - ${option.description as string}` : '';

  const [value, setValue] = useState<string>(options[0].value as string);

  return (
    <div className={cx('col')}>
      <span className={cx('label')}>Форматирование вариантов выбора (без filterOption)</span>
      <div className={cx('row')}>
        <Control fixWidth>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            options={options}
            formatOptionLabel={formatCurrencyOption}
          />
        </Control>
      </div>
      <span className={cx('label')}>
        Форматирование вариантов выбора (с кастомным filterOption)
      </span>
      <div className={cx('row')}>
        <Control fixWidth>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            options={options}
            formatOptionLabel={formatCurrencyOption}
            filterOption={filterCurrencyOption}
          />
        </Control>
      </div>
      <span className={cx('label')}>
        Форматирование вариантов выбора с форматированием вывода input
      </span>
      <div className={cx('row')}>
        <Control fixWidth>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            options={options}
            formatOptionLabel={formatCurrencyOption}
            filterOption={filterCurrencyOption}
            formatInputValue={formatInputValue}
          />
        </Control>
      </div>
      <span className={cx('label')}>Disabled вариант</span>
      <div className={cx('row')}>
        <Control fixWidth>
          <Autocomplete
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            options={options}
            formatOptionLabel={formatCurrencyOption}
            disabled
          />
        </Control>
      </div>
    </div>
  );
};

export const AppendToBody = () => {
  const options: AutocompleteOption[] = Array.from({ length: 20 }).map((_, i) => ({
    value: i + 1,
  }));

  const [value, setValue] = useState<number | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={cx('col')}>
      <span className={cx('label')}>Выпадающий список внутри body</span>
      <div className={cx('row')}>
        <Button onClick={() => setOpen(true)}>Autocomplete в модальном окне</Button>
      </div>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <Modal.Title>Модальное окно</Modal.Title>
        <Modal.Body style={{ height: 200 }}>
          <div style={{ height: 300 }}>
            <div className={cx('row')}>
              <Control fixWidth>
                <Autocomplete
                  value={value}
                  onChange={(e) => setValue(e.target.value as number)}
                  options={options}
                  appendToBody
                />
              </Control>
            </div>
            <div className={cx('row')}>
              <Control fixWidth>
                <Autocomplete
                  label="Название поля"
                  value={value}
                  onChange={(e) => setValue(e.target.value as number)}
                  options={options}
                  appendToBody
                />
              </Control>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export const IsOpenControlledMode = () => {
  const [options] = useState(getOptions);
  const [isOpen, show, hide] = useBooleanState(false);

  const handleIsOpenChange = useCallback(
    (changes: UseComboboxStateChange<AutocompleteOption>) => {
      if (!changes.isOpen) {
        if (changes.type !== useCombobox.stateChangeTypes.InputBlur) hide();
      } else {
        show();
      }
    },
    [show, hide],
  );

  const [value, setValue] = useState<string>();

  return (
    <div className={cx('col')}>
      <Control>
        <Button onClick={isOpen ? hide : show} style={{ marginBottom: '15px' }}>
          {isOpen ? 'Закрыть' : 'Открыть'} Autocomplete
        </Button>
        <Autocomplete
          value={value}
          onChange={(e) => setValue(String(e.target.value))}
          options={options}
          isOpen={isOpen}
          onIsOpenChange={handleIsOpenChange}
        />
      </Control>
    </div>
  );
};

export const AutocompleteWithRef = () => {
  const simpleOptions: AutocompleteOption[] = [
    { value: 'regular', label: 'Регулярный' },
    { value: 'promo', label: 'Промо' },
    { value: 'regular1', label: 'Регулярный1' },
    { value: 'promo1', label: 'Промо1' },
    { value: 'regular2', label: 'Регулярный2' },
    { value: 'promo2', label: 'Промо2' },
    { value: 'regular3', label: 'Регулярный3' },
    { value: 'promo3', label: 'Промо3' },
  ];

  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.focus();
  };

  return (
    <div className={cx('col')}>
      <span className={cx('label')}>Простой выбор</span>
      <div className={cx('row')}>
        <Control>
          <Autocomplete onChange={action('onChange')} options={simpleOptions} ref={ref} />
        </Control>
      </div>
      <Button onClick={handleClick}>Нажми меня и сфокусируешься на инпуте</Button>
    </div>
  );
};
