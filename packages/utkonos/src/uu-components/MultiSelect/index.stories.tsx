import { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash-es';
import { action } from '@storybook/addon-actions';

import { Button } from '../Button';
import { Modal } from '../Modal';
import { Tooltip } from '../Tooltip';
import { MultiSelect } from '.';
import { ReactComponent as SearchSvg } from './assets/search.svg';
import { ReactComponent as ColumnsSvg } from './assets/columns.svg';
import type { SelectToggleIconFunction } from '../_select/ToggleIcon';
import type { MultiSelectProps } from '.';
import type { Option } from '../_option';

export default {
  title: 'Controls/MultiSelect',
  component: MultiSelect,
};

const options: Option[] = [
  { value: 'First', label: 'First' },
  { value: 'Second', label: 'Second' },
  { value: 'Third', label: 'Third' },
  {
    value: 'Fourth',
    label:
      'VeryLongtextVeryLongtextVeryLongtextVeryLongtextVeryLongtextVeryLongtextVeryLongtextVeryLongtext',
  },
];

export const Preview = () => {
  const [selectedValues, setSelectedValues] = useState<Option[]>(options.slice(0, 2));

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <div className="sb-col">
      <span className="sb-label">Primary (default)</span>
      <div className="sb-row">
        <div style={{ width: '30%' }}>
          <MultiSelect options={options} value={selectedValues} onChange={handleChange} />
        </div>
        <div style={{ width: '30%' }}>
          <MultiSelect options={options} value={selectedValues} onChange={handleChange} />
        </div>
        <div style={{ width: '30%' }}>
          <MultiSelect
            options={options}
            value={selectedValues}
            onChange={handleChange}
            menuIsOpen
          />
        </div>
      </div>
      <span className="sb-label">disabled</span>
      <div className="sb-row">
        <div style={{ width: '30%' }}>
          <MultiSelect options={options} value={[]} onChange={handleChange} disabled />
        </div>
        <div style={{ width: '30%' }}>
          <MultiSelect options={options} value={selectedValues} onChange={handleChange} disabled />
        </div>
      </div>
    </div>
  );
};

export const Controlled = () => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);
  const [items, setItems] = useState<Option[]>(options);

  const handleChangeItems1 = () => {
    setItems([
      { value: 'First', label: 'First' },
      { value: 'Second', label: 'Second' },
      { value: 'Six', label: 'Six' },
    ]);
    setSelectedValues([{ value: 'First', label: 'First' }]);
    action('handleChangeItems1');
  };
  const handleChangeItems2 = () => {
    setItems([
      { value: 'Third', label: 'Third' },
      { value: 'Six', label: 'Six' },
      { value: 'Six1', label: 'Six1' },
    ]);
    setSelectedValues([
      { value: 'Third', label: 'Third' },
      { value: 'Six', label: 'Six' },
    ]);

    action('handleChangeItems2');
  };

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <div className="sb-col">
      <div className="sb-row">
        <button type="button" onClick={handleChangeItems1}>
          Change items in menu 1
        </button>
        <button type="button" onClick={handleChangeItems2}>
          Change items in menu 2
        </button>
      </div>
      <div className="sb-row">
        <MultiSelect options={items} value={selectedValues} onChange={handleChange} />
      </div>
    </div>
  );
};

export const WithClassName = () => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <MultiSelect
      className="custom-wrapper-class"
      options={options}
      onChange={handleChange}
      value={selectedValues}
    />
  );
};

export const CloseMenuOnSelect = () => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <div className="sb-col">
      <h4>Do not close menu on select (default)</h4>
      <div className="sb-row">
        <MultiSelect options={options} onChange={handleChange} value={selectedValues} />
        <MultiSelect
          options={options}
          onChange={handleChange}
          value={selectedValues}
          closeMenuOnSelect={false}
        />
      </div>
      <h4>Auto close menu on select</h4>
      <div className="sb-row">
        <MultiSelect
          options={options}
          onChange={handleChange}
          value={selectedValues}
          closeMenuOnSelect
        />
      </div>
    </div>
  );
};

export const MenuIsOpen = () => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <MultiSelect options={options} onChange={handleChange} value={selectedValues} menuIsOpen />
  );
};

export const WithLabel = () => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <MultiSelect
      options={options}
      onChange={handleChange}
      value={selectedValues}
      label="My super label text"
    />
  );
};

export const CustomPlaceholder = () => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <MultiSelect
      options={options}
      onChange={handleChange}
      value={selectedValues}
      placeholder="My super placeholder text"
    />
  );
};

export const IsDisabled = () => {
  const curentOptions: Option[] = [
    { value: 'Third', label: 'Third' },
    { value: 'Six', label: 'Six' },
    { value: 'Six1', label: 'Six1' },
  ];

  const [selectedValues, setSelectedValues] = useState<Option[]>(curentOptions.slice(0, 2));

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <div className="sb-col">
      <div className="sb-row">
        <MultiSelect
          options={curentOptions}
          value={selectedValues}
          onChange={handleChange}
          disabled
        />
        <MultiSelect
          options={curentOptions}
          value={selectedValues}
          onChange={handleChange}
          disabled
        />
      </div>
    </div>
  );
};

export const MenuSizing = () => {
  const curentOptions: Option[] = new Array(100).fill('').map((item, idx) => {
    const newValue = `next item ${idx}`;
    return { value: newValue, label: newValue };
  });

  const [selectedValues, setSelectedValues] = useState<Option[]>(curentOptions.slice(0, 2));

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <div className="sb-col">
      <span className="sb-label">Menu max height</span>
      <div className="sb-row">
        <MultiSelect
          label="max-height: 200px"
          options={curentOptions}
          onChange={handleChange}
          value={selectedValues}
          menuMaxHeight={200}
        />
        <MultiSelect
          label="max-height: 50vh"
          options={curentOptions}
          onChange={handleChange}
          value={selectedValues}
          appendToBody
          menuMaxHeight="50vh"
        />
      </div>
      <span className="sb-label">Menu width and position</span>
      <div className="sb-row">
        <MultiSelect
          label="width: 400px"
          options={curentOptions}
          onChange={handleChange}
          value={selectedValues}
          menuWidth={400}
        />
        <MultiSelect
          label="width: 75%; menuMaxHeight: 100px; position: top-start"
          options={curentOptions}
          onChange={handleChange}
          value={selectedValues}
          appendToBody
          menuWidth="75%"
          menuMaxHeight="100px"
          menuPosition="top-start"
        />
      </div>
    </div>
  );
};

export const FormatOptionLabel = () => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  const formatOptionLabel = ({ option }: { option: Option }) => (
    <span style={{ color: 'tomato' }}>{option.label}</span>
  );

  return (
    <MultiSelect
      options={options}
      onChange={handleChange}
      value={selectedValues}
      formatOptionLabel={formatOptionLabel}
    />
  );
};

export const SingleLine = () => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <MultiSelect singleLine options={options} onChange={handleChange} value={selectedValues} />
  );
};

export const MultiSelectWithSearch = () => {
  const optionsForSearch: Option[] = [
    { value: 'Value1', label: 'Label1' },
    { value: 'Value2', label: 'Label2' },
    { value: 'Value3', label: 'Label3' },
    { value: 'Value4', label: 'Label4' },
    { value: 'Value5', label: 'Label5' },
    { value: 'Value6', label: 'Label6' },
    { value: 'Value7', label: 'Label7' },
    { value: 'Value8', label: 'Label8' },
    { value: 'Value9', label: 'Label9' },
    { value: 'Value10', label: 'Label10' },
    { value: 'Value11', label: 'Label11' },
    { value: 'Value12', label: 'Label12' },
    { value: 'Value13', label: 'Label13' },
    { value: 'Value14', label: 'Label14' },
    { value: 'Value15', label: 'Label15' },
    { value: 'Value16', label: 'Label16' },
  ];

  const [selectedValues1, setSelectedValues1] = useState<Option[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<Option[]>([]);
  const [selectedValues3, setSelectedValues3] = useState<Option[]>([]);
  const [selectedValues4, setSelectedValues4] = useState<Option[]>([]);

  const handleChange =
    (setSelectedValues: (values: Option[]) => void): MultiSelectProps['onChange'] =>
    (value) => {
      action('handleChange');
      setSelectedValues(value);
    };

  return (
    <div className="sb-col">
      <span className="sb-label">Default</span>
      <div className="sb-row">
        <div style={{ width: '30%' }}>
          <MultiSelect
            options={optionsForSearch}
            value={selectedValues1}
            onChange={handleChange(setSelectedValues1)}
          />
        </div>
      </div>
      <span className="sb-label">Filterable</span>
      <div className="sb-row">
        <div style={{ width: '30%' }}>
          <MultiSelect
            options={optionsForSearch}
            value={selectedValues2}
            onChange={handleChange(setSelectedValues2)}
            filterable
          />
        </div>
      </div>
      <span className="sb-label">Filterable with optionsCount=4</span>
      <div className="sb-row">
        <div style={{ width: '30%' }}>
          <MultiSelect
            options={optionsForSearch}
            value={selectedValues3}
            onChange={handleChange(setSelectedValues3)}
            filterable
            optionsCount={4}
          />
        </div>
      </div>
      <span className="sb-label">With optionsCount=4</span>
      <div className="sb-row">
        <div style={{ width: '30%' }}>
          <MultiSelect
            options={optionsForSearch}
            value={selectedValues4}
            onChange={handleChange(setSelectedValues4)}
            optionsCount={4}
          />
        </div>
      </div>
      <span className="sb-label">Clear filter by close menu</span>
      <div className="sb-row">
        <div style={{ width: '30%' }}>
          <MultiSelect
            options={optionsForSearch}
            value={selectedValues4}
            onChange={handleChange(setSelectedValues4)}
            optionsCount={4}
            clearFilter="closeMenu"
            filterable
          />
        </div>
      </div>
      <span className="sb-label">Clear filter by select element</span>
      <div className="sb-row">
        <div style={{ width: '30%' }}>
          <MultiSelect
            options={optionsForSearch}
            value={selectedValues4}
            onChange={handleChange(setSelectedValues4)}
            optionsCount={4}
            clearFilter="select"
            filterable
          />
        </div>
      </div>
      <span className="sb-label">Clear filter by select element or close menu</span>
      <div className="sb-row">
        <div style={{ width: '30%' }}>
          <MultiSelect
            options={optionsForSearch}
            value={selectedValues4}
            onChange={handleChange(setSelectedValues4)}
            optionsCount={4}
            clearFilter="multi"
            filterable
          />
        </div>
      </div>
    </div>
  );
};

export const AppendToBody = () => {
  const curentOptions: Option[] = new Array(30).fill('').map((_, idx) => {
    const newValue = `next item ${idx}`;
    return { value: newValue, label: newValue };
  });

  const [selectedValues, setSelectedValues] = useState<Option[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleChange: MultiSelectProps['onChange'] = (nextValues) => {
    action('handleChange');
    setSelectedValues(nextValues);
  };

  return (
    <div className="sb-col">
      <div className="sb-row">
        <Button onClick={() => setOpen(true)}>MultiSelect в модальном окне</Button>
      </div>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <Modal.Title>Модальное окно</Modal.Title>
        <Modal.Body style={{ height: 150 }}>
          <div style={{ height: 300, width: 200 }}>
            <MultiSelect
              options={curentOptions}
              value={selectedValues}
              onChange={handleChange}
              singleLine
              appendToBody
            />
            <MultiSelect
              label="Название поля"
              options={curentOptions}
              value={selectedValues}
              onChange={handleChange}
              singleLine
              filterable
              appendToBody
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const CustomToggle: SelectToggleIconFunction = ({ isOpen }) => (
  <span style={{ color: isOpen ? '#65C68C' : '#FFA91B' }}>
    <SearchSvg width="20" height="20" />
  </span>
);

export const OnlyToggleWithCustomIcon = () => {
  const curentOptions: Option[] = new Array(20).fill('').map((_, idx) => {
    const newValue = `Колонка ${idx + 1}`;
    return { value: newValue, label: newValue };
  });

  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const handleChange: MultiSelectProps['onChange'] = (values) => {
    action('handleChange');
    setSelectedValues(values);
  };

  return (
    <div className="sb-col">
      <div className="sb-row" style={{ justifyContent: 'space-around' }}>
        <MultiSelect
          options={curentOptions}
          onChange={handleChange}
          value={selectedValues}
          menuWidth={200}
          toggleOnly
          toggleIcon={CustomToggle}
        />
        <MultiSelect
          options={curentOptions}
          onChange={handleChange}
          value={selectedValues}
          menuWidth="200px"
          menuPosition="bottom-end"
          toggleOnly
          toggleIcon={
            <Button view="light" small>
              <ColumnsSvg />
            </Button>
          }
        />
      </div>
    </div>
  );
};

export const FilterForLoadOptions = () => {
  const [currentOptions, setCurrentOptions] = useState(() =>
    Array(20)
      .fill(null)
      .map((_, i) => ({
        value: `Вариант${i + 1}`,
        label: `Вариант ${i + 1}`,
      })),
  );

  const [selectedOptions, setSelectedOptions] = useState<MultiSelectProps['options']>([]);

  const filterOption = useCallback(() => () => true, []);

  const onFilterChange = useMemo<Required<MultiSelectProps>['onFilterChange']>(
    () =>
      debounce((query: string) => {
        if (query) {
          setTimeout(() => {
            const updatedValues = Array(20)
              .fill(null)
              .map((_, i) => ({
                value: `${query}${i + 1}`,
                label: `${query} ${i + 1}`,
              }));
            setCurrentOptions(updatedValues);
            setSelectedOptions((prevSelected) =>
              prevSelected.filter((o) =>
                updatedValues.some((updated) => updated.value === o.value),
              ),
            );
          }, 1000);
        }
      }, 500),
    [setCurrentOptions],
  );

  return (
    <MultiSelect
      value={selectedOptions}
      onChange={setSelectedOptions}
      options={currentOptions}
      filterable
      filterOption={filterOption}
      onFilterChange={onFilterChange}
    />
  );
};

export const Error = () => {
  const [value, setValue] = useState<Option[]>([]);
  return (
    <MultiSelect
      value={value}
      options={options}
      onChange={setValue}
      error="Ошибка"
      errorPlacement="bottom"
    />
  );
};

export const WithTooltip = () => {
  const [selectedValues, setSelectedValues] = useState<Option[]>(options.slice(0, 2));

  const handleChange: MultiSelectProps['onChange'] = (value) => {
    action('handleChange');
    setSelectedValues(value);
  };

  return (
    <div className="sb-col">
      <div className="sb-row">
        <div style={{ flexBasis: 400, width: 'auto' }}>
          <Tooltip placement="bottom" title="Мульти селект">
            <MultiSelect options={options} value={selectedValues} onChange={handleChange} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
