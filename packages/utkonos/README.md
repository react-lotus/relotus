## Table of Contents

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [@relotus/utkonos](#relotusutkonos)
  - [Описание](#%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5)
  - [Установка](#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0)
  - [Обновление](#%D0%BE%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Использование](#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
  - [SingleDatePicker & DateRangePicker](#singledatepicker--daterangepicker)
  - [Стилизация](#%D1%81%D1%82%D0%B8%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F)
  - [Правила наименования CSS `.class` селекторов](#%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D0%BD%D0%B0%D0%B8%D0%BC%D0%B5%D0%BD%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-css-class-%D1%81%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BE%D0%B2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

# @relotus/utkonos

## Описание

@relotus/utkonos - библиотека React UI компонентов.

## Установка

```sh
npm i @relotus/utkonos
```

Вместе с самим пакетом устанавливаются `peerDependencies`. Версии пакетов фиксированы.

Добавить в файл общих стилей дополнительные стили компонентов:

```scss
@import '@relotus/utkonos/index';
```

## Обновление

```sh
npm i @relotus/utkonos@latest
```

## Использование

```tsx
import ReactDOM from 'react-dom';

import { Button } from '@relotus/utkonos';

function App() {
  return <Button>Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## SingleDatePicker & DateRangePicker

Подключение и использование компонентов выбора дат дополнительно требует выполнения скрипта инициализации (`/* 1 */`) и языковой локализации пакета `moment` (`/* 2 */`). Перечисленные действия необходимо реализовать в коде проекта только один раз. Для этих целей рекомендуется использовать файл `src/index.tsx` (или аналогичный), являющийся базовой точкой входа в проект.

Компоненты `<SingleDatePicker />` и `<DateRangePicker />` - это стилизованные компоненты библиотеки [react-dates](https://github.com/airbnb/react-dates). API компонентов повторяет API компонентов библиотеки, а также включает несколько дополнительно возможностей (например, валидация полей ввода).

Подключение и использование компонентов `<SingleDatePicker />` и `<DateRangePicker />`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'; /* 2 */

import 'moment/locale/ru'; /* 2 */

import 'react-dates/initialize'; /* 1 */

import { SingleDatePicker } from '@relotus/utkonos';

moment.locale('ru-Ru'); /* 2 */

function App() {
  const [date, setDate] = React.useState(null);

  return <SingleDatePicker date={date} onDateChange={setDate} />;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Стилизация

Для стилизации компонентов используется SCSS.

Главному классу компонента дается имя компонента в `camelCase` с префиксом `uu-`:

```scss
.uu-button {
  font-size: 13px;
  line-height: 36px;
}
```

Важно давать уникальное имена CSS классам в рамках **всех** компонентов. Это сделано для того, чтобы дать возможность менять стили на уровне проектов.

Пример кастомизации стиля кнопки на уровне проекта:

```scss
.root :global(.uu-button) {
  font-size: 16px;
}
```

## Правила наименования CSS `.class` селекторов

Название CSS-классов задается в `camelCase` с префиксом `uu-`:

```scss
/* index.scss */
.uu-awesomeComponent {
  display: flex;
  justify-content: center;
}
```

Для задания модификаторов используется БЭМ нотация с использованием `_` в качестве разделителя.

Булевый модификатор:

```scss
/* index.scss */
.uu-awesomeComponent_loading {
  opacity: 0.5;
}
```

Модификатор ключ-значение:

```scss
/* index.scss */
.uu-awesomeComponent_view_primary {
  background-color: #c0ffee;
}
.uu-awesomeComponent_view_secondary {
  background-color: #bada55;
}
```

Для кастомизации компонента рекомендуется добавлять в API дополнительный prop `className`.

Пример задания классов в рамках компонента:

```tsx
/* index.tsx */
import React from 'react';
import cn from 'classnames';

import './index.scss';

type Props = {
  /**
   * Стилевое оформление для визуального выделения блокирующего действие процесса
   *
   * @default false
   */
  loading?: boolean;
  /**
   * Стилевое оформление для визуального выделения блокирующего действие процесса
   *
   * @default "primary"
   */
  view?: 'primary' | 'secondary';
  /** Дополнительный класс */
  className?: string;
};

export function AwesomeComponent(props: Props): JSX.Element {
  const { className, loading = false, view = 'primary' } = props;
  return (
    <div
      className={cn(className, 'uu-awesomeComponent', `uu-awesomeComponent_view_${view}`, {
        'uu-awesomeComponent_loading': loading,
      })}
    />
  );
}
```
