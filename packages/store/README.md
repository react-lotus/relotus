<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [@relotus/store](#relotusstore)
  - [Мотивация](#%D0%BC%D0%BE%D1%82%D0%B8%D0%B2%D0%B0%D1%86%D0%B8%D1%8F)
  - [Использование](#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
    - [configureStore](#configurestore)
    - [getSliceCreator](#getslicecreator)
    - [useDispatchActions](#usedispatchactions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# @relotus/store

Библиотека для управления стейтом приложения и работы с ним.

## Мотивация

В проектах React UI Team в качестве стейт-менеджера используется **Redux**. Для уменьшения boilerplate-кода и облегчения работы со стейтом используется пакет `@reduxjs/toolkit`.
Тем не менее в проектах по прежнему имеется большой кусок повторяющегося кода: инициализация стора и утилитарный код. Помимо этого в команде было найдено несколько интересных решений, которые тоже хотелось бы использовать во всех проектах.

## Использование

Для использования библиотеки предварительно необходимо описать стейт приложения:

```ts
// src/modules/SomeModule/types/slice.ts
interface SomeSliceState {
  /* fields of slice */
}

// src/modules/OtherModule/types/slice.ts
interface OtherSliceState {
  /* fields of other slice */
}

// src/types/state.ts
import { SomeSliceState } from 'modules/SomeModule';
import { OtherSliceState } from 'modules/OtherModule';

export interface RootState {
  someSlice: SomeSliceState;
  otherSlice: OtherSliceState;
}
```

Этот тип (`RootState`) будет использоваться в качестве типа для типизации стора.

### configureStore

Это обертка над `configureStore` из [redux-toolkit](https://redux-toolkit.js.org/api/configureStore).

Функция принимает в качестве аргументов тот же набор параметров, за двумя исключениями:

- вместо `reducer` (одного корневого редьюсера) можно использовать `reducers` - объект из редьюсров, на основе которого будет создан корневой редюсер
- вместо `middleware` необходимо передавать `middlewares` - `Middleware[]`

#### Пример использования

```ts
// src/service/store.ts
import { configureStore } from '@relotus/store';
import { someSlice } from 'modules/SomeModule';
import { RootState } from '../types';

/** Передаем RootState для типизации ключей в reducers и preloadedState */
export const store = configureStore<RootState>({
  reducers: { [someSlice.name]: someSlice.reducer },
  devTools: process.env.NODE_ENV !== 'production',
});
```

### getSliceCreator

Эта функция обертка над [createSlice](https://redux-toolkit.js.org/api/createSlice) которая добавляет строгой типизации и расширяет функционал.

#### Пример использования

Для использования типизированного `createSlice`:

```ts
// src/service/slice
export const createSlice = getSliceCreator<RootState>();
```

Далее в слайсе модуля:

```ts
// src/modules/someModule/store/slice.ts
import { createSlice } from '../../../services';
import { RootState } from '../../../types';

export type SliceState = RootState['someSlice'];

export const initialState: SliceState = {
  title: undefined,
};

const uiSlice = createSlice({
  name: 'someSlice',
  initialState,
  reducers: {
    setTitle(state, { payload }: PayloadAction<string | undefined>) {
      state.title = payload;
    },
  },
});

export const {
  reducer,
  name,
  actions,
  useSomeSliceDispatch, // - хук для получения эшкенов слайса обернутх в dispatch (см. useDispatchActions )
  selectDomain, // - селектор стейта для слайса. Если стейт не определен, будет возвращаен initialState
} = uiSlice;
```

### useDispatchActions

Этот хук - обертка над [bindActionCreators](https://redux.js.org/api/bindactioncreators).

#### Пример использования

В большинстве случаев для того чтобы использовать экшены из слайса их нужно диспатчить

```tsx
const dispatch = useDispatch();
const handleAction = useCallback(() => dispatch(someSlice.actions.someAction));
return <button onClick={handleAction}>Test</button>;
```

С использованием хука `useDispatchActions` этот код становится более чистым:

```tsx
const { someAction } = useDispatchActions(someSlice.actions));
return <button onClick={someAction}>Test</button>;
```

> ❗ если слайс создан через getSliceCreator (например с именем `user`), то у него есть хук `useUserDispatch`
