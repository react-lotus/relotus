import { FC, useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash-es';
import { SingleSelect } from '.';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Tooltip } from '../Tooltip';
import type { Option, OptionFormatLabel, SelectFilterOption } from '../_option';
import { ReactComponent as SettingsSvg } from './assets/settings.svg';
import { ReactComponent as SuccessSvg } from './assets/success.svg';
import { ReactComponent as PendingSvg } from './assets/pending.svg';
import { ReactComponent as FailSvg } from './assets/fail.svg';
import type { SingleSelectProps } from '.';

export default {
  title: 'Controls/SingleSelect',
  component: SingleSelect,
};

const Control: FC<{ fixWidth?: boolean }> = ({ fixWidth = false, children }) => (
  <div style={{ flexBasis: 200, width: fixWidth ? 200 : 'auto' }}>{children}</div>
);

export const Preview = () => {
  enum Values {
    ALL = 'ALL',
    REGULAR = 'REGULAR',
    PROMO = 'PROMO',
  }

  const simpleOptions: Option<Values>[] = [
    { value: Values.ALL, label: 'Все' },
    { value: Values.REGULAR, label: 'Регулярный' },
    { value: Values.PROMO, label: 'Промо' },
  ];

  const [value1, setValue1] = useState<Values>();
  const [value2, setValue2] = useState(Values.REGULAR);

  return (
    <div className="sb-col">
      <span className="sb-label">Простой выбор</span>
      <div className="sb-row">
        <Control>
          <SingleSelect
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            options={simpleOptions}
          />
        </Control>
        <Control>
          <SingleSelect
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            options={simpleOptions}
            filterable
          />
        </Control>
        <Control>
          <SingleSelect
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            options={simpleOptions}
            disabled
          />
        </Control>
      </div>
      <div className="sb-row">
        <Control>
          <SingleSelect
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            options={simpleOptions}
          />
        </Control>
        <Control>
          <SingleSelect
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            options={simpleOptions}
            filterable
          />
        </Control>
        <Control>
          <SingleSelect
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            options={simpleOptions}
            disabled
          />
        </Control>
      </div>
      <div className="sb-row">
        <Control>
          <SingleSelect
            error="Some error occurred"
            errorPlacement="bottom"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            options={simpleOptions}
          />
        </Control>
      </div>
    </div>
  );
};

export const Labeled = () => {
  const options = [
    { value: 'all', label: 'Все' },
    { value: 'regular', label: 'Регулярный' },
    { value: 'promo', label: 'Промо' },
  ];

  const [value, setValue] = useState<string>();

  return (
    <div className="sb-col">
      <span className="sb-label">Название поля</span>
      <div className="sb-row">
        <Control>
          <SingleSelect<string>
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            label="Название поля сверху"
          />
        </Control>
      </div>
      <div className="sb-row">
        <Control>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
  const options = [
    { value: 'all', label: 'Все' },
    { value: 'regular', label: 'Регулярный поток словесности' },
    { value: 'promo', label: 'Промо' },
  ];

  const [value, setValue] = useState(options[1].value);

  return (
    <div className="sb-col">
      <span className="sb-label">Вариант выбора с длинным текстом</span>
      <div className="sb-row">
        <Control fixWidth>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
          />
        </Control>
        <Control fixWidth>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            filterable
          />
        </Control>
      </div>
      <div className="sb-row">
        <Control fixWidth>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            disabled
          />
        </Control>
      </div>
    </div>
  );
};

export const LongList = () => {
  const options = Array.from({ length: 20 }).map((_, i) => ({
    value: i,
    label: `Вариант ${i + 1}`,
  }));

  const [value, setValue] = useState(options[options.length - 3].value);

  return (
    <div className="sb-col">
      <span className="sb-label">Длинный список вариантов выбора</span>
      <div className="sb-row">
        <Control>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
          />
        </Control>
        <Control>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            filterable
          />
        </Control>
      </div>
      <div className="sb-row">
        <Control>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            disabled
          />
        </Control>
      </div>
      <span className="sb-label">
        Длинный список вариантов выбора с ограничением кол-ва элементов
      </span>
      <div className="sb-row">
        <Control>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            optionsCount={4}
          />
        </Control>
        <Control>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            filterable
            optionsCount={4}
          />
        </Control>
      </div>
    </div>
  );
};

export const MenuSizing = () => {
  const [options] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      value: i,
      label: `Вариант ${i + 1}`,
    })),
  );

  const [value, setValue] = useState(options[options.length - 3].value);
  const onChange = useCallback<Required<SingleSelectProps<number>>['onChange']>(
    (e) => setValue(e.target.value),
    [setValue],
  );

  return (
    <div className="sb-col">
      <span className="sb-label">Menu max height</span>
      <div className="sb-row">
        <Control>
          <SingleSelect
            label="max-height: 100px"
            value={value}
            onChange={onChange}
            options={options}
            menuMaxHeight={100}
          />
        </Control>
        <Control>
          <SingleSelect
            label="max-height: 50vh"
            value={value}
            onValueChange={setValue}
            options={options}
            appendToBody
            menuMaxHeight="50vh"
          />
        </Control>
      </div>
      <span className="sb-label">Menu width and position</span>
      <div className="sb-row">
        <Control>
          <SingleSelect
            label="width: 400px"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            menuWidth={400}
          />
        </Control>
        <Control>
          <SingleSelect
            label="width: 75%; position: bottom-end"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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

  const options: Option<TCurrency['code'], TCurrency>[] = currencies.map((currency) => ({
    ...currency,
    value: currency.code,
  }));

  const formatCurrencyOption: OptionFormatLabel<TCurrency['code'], TCurrency> = ({ option }) => (
    <>
      <strong>{option.code}</strong> {option.description}
    </>
  );

  const filterCurrencyOption: SelectFilterOption<TCurrency['code'], TCurrency> = (query) => {
    const queryRe = new RegExp(query, 'i');
    return (option) => queryRe.test(option.code) || queryRe.test(option.description);
  };

  const [value, setValue] = useState(options[0].value);

  return (
    <div className="sb-col">
      <span className="sb-label">Форматирование вариантов выбора</span>
      <div className="sb-row">
        <Control fixWidth>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            formatOptionLabel={formatCurrencyOption}
          />
        </Control>
        <Control fixWidth>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            formatOptionLabel={formatCurrencyOption}
            filterable
            filterOption={filterCurrencyOption}
          />
        </Control>
      </div>
      <div className="sb-row">
        <Control fixWidth>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            formatOptionLabel={formatCurrencyOption}
            disabled
          />
        </Control>
      </div>
    </div>
  );
};

export const ToggleIcon = () => {
  const options = [{ value: 10 }, { value: 20 }, { value: 30 }, { value: 40 }];

  const [value, setValue] = useState<number>(options[0].value);

  const ToggleIconFunction = ({ isOpen, disabled }: { isOpen: boolean; disabled: boolean }) => {
    if (isOpen) {
      return <PendingSvg />;
    }
    if (disabled) {
      return <FailSvg />;
    }
    return <SuccessSvg />;
  };

  return (
    <div className="sb-col">
      <span className="sb-label">Иконка раскрытия списка</span>
      <div className="sb-row">
        <Control fixWidth>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            toggleIcon={<SettingsSvg />}
          />
        </Control>
      </div>
      <div className="sb-row">
        <Control fixWidth>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            toggleIcon={({ isOpen }) => (
              <SettingsSvg fill={isOpen ? '#fec800' : '#0db14b'} stroke="none" />
            )}
          />
        </Control>
      </div>
      <div className="sb-row">
        <Control fixWidth>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            toggleIcon={ToggleIconFunction}
          />
        </Control>
        <Control fixWidth>
          <SingleSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            toggleIcon={ToggleIconFunction}
            disabled
          />
        </Control>
      </div>
    </div>
  );
};

export const AppendToBody = () => {
  const options = Array.from({ length: 20 }).map((_, i) => ({
    value: i + 1,
  }));

  const [value, setValue] = useState<number>();
  const [open, setOpen] = useState(false);

  return (
    <div className="sb-col">
      <span className="sb-label">Выпадающий список внутри body</span>
      <div className="sb-row">
        <Button onClick={() => setOpen(true)}>Select в модальном окне</Button>
      </div>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <Modal.Title>Модальное окно</Modal.Title>
        <Modal.Body style={{ height: 150 }}>
          <div style={{ height: 300 }}>
            <div className="sb-row">
              <Control fixWidth>
                <SingleSelect
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  options={options}
                  appendToBody
                />
              </Control>
            </div>
            <div className="sb-row">
              <Control fixWidth>
                <SingleSelect
                  label="Название поля"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  options={options}
                  appendToBody
                  filterable
                />
              </Control>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export const FilterForLoadOptions = () => {
  const [options, setOptions] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      value: i,
      label: `Вариант ${i + 1}`,
    })),
  );

  const [value, setValue] = useState<number>(options[options.length - 3].value);

  const filterOption = useCallback(() => () => true, []);

  const onFilterChange = useMemo<Required<SingleSelectProps>['onFilterChange']>(
    () =>
      debounce((query: string) => {
        if (query) {
          setTimeout(() => {
            setOptions(
              Array.from({ length: 20 }).map((_, i) => ({
                value: i,
                label: `${query} ${i + 1}`,
              })),
            );
          }, 1000);
        }
      }, 500),
    [setOptions],
  );

  return (
    <div className="sb-col">
      <span className="sb-label">Change filter for load new options</span>
      <div className="sb-row">
        <Control>
          <SingleSelect
            value={value}
            onValueChange={setValue}
            options={options}
            filterable
            filterOption={filterOption}
            onFilterChange={onFilterChange}
          />
        </Control>
      </div>
    </div>
  );
};

export const HiddenOptions = () => {
  type ActiveOption = Option<number, { active: boolean }>;

  const [options] = useState<Array<ActiveOption>>(
    Array.from({ length: 20 }).map((_, i) => {
      return {
        value: i,
        label: `Вариант ${i + 1} - ${i % 2 ? 'Видимый' : 'Скрытый'}`,
        active: Boolean(i % 2),
      };
    }),
  );

  const isOptionShown = useCallback((option: ActiveOption) => option.active, []);

  const [value, setValue] = useState<number>(2);

  const setInactiveValue = useCallback(() => setValue(4), []);

  return (
    <div className="sb-col">
      <div className="sb-row">
        <Control>
          <SingleSelect
            value={value}
            onValueChange={setValue}
            options={options}
            isOptionShown={isOptionShown}
          />
        </Control>
        <Button small onClick={setInactiveValue}>
          Поставить скрытое значение
        </Button>
      </div>
    </div>
  );
};

export const WithGroups = () => {
  const options: Option<string>[] = [
    {
      value: 'red',
      label: 'Красный',
      options: [
        { value: 'example1', label: 'Пример1' },
        { value: 'example2', label: 'Пример2' },
        { value: 'example3', label: 'Пример3' },
      ],
    },
    {
      value: 'yellow',
      label: 'Желтый',
      options: [
        { value: 'example4', label: 'Пример4' },
        { value: 'example5', label: 'Пример5' },
        { value: 'example6', label: 'Пример6' },
      ],
    },
  ];

  const [value, setValue] = useState('yellow');

  return (
    <div className="sb-col">
      <div className="sb-row">
        <Control>
          <SingleSelect value={value} onValueChange={setValue} options={options} />
        </Control>
      </div>
    </div>
  );
};

export const WithTooltip = () => {
  enum Values {
    ALL = 'ALL',
    REGULAR = 'REGULAR',
    PROMO = 'PROMO',
  }

  const simpleOptions: Option<Values>[] = [
    { value: Values.ALL, label: 'Все' },
    { value: Values.REGULAR, label: 'Регулярный' },
    { value: Values.PROMO, label: 'Промо' },
  ];

  const [value1, setValue1] = useState<Values>();

  return (
    <div className="sb-col">
      <span className="sb-label">Простой выбор c тултипом</span>
      <div className="sb-row">
        <Control>
          <Tooltip placement="right" title="Сингл селект">
            <SingleSelect
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              options={simpleOptions}
            />
          </Tooltip>
        </Control>
      </div>
    </div>
  );
};
