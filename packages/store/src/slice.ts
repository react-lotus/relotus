/* eslint-disable react-hooks/rules-of-hooks */
import { CaseReducerActions, createSlice as createSliceOriginal } from '@reduxjs/toolkit';
import type { SliceCaseReducers, CreateSliceOptions, Slice } from '@reduxjs/toolkit';
import { useDispatchActions } from './hooks';

type SliceExtra<
  RootState,
  SliceState,
  CaseReducers extends SliceCaseReducers<SliceState>,
  Name extends string,
> = {
  [key in `use${Capitalize<Name>}Dispatch`]: () => CaseReducerActions<CaseReducers>;
} & {
  selectDomain: (state?: RootState) => SliceState;
};

export type SliceOptions<S> = {
  [K in keyof S]: CreateSliceOptions<
    Required<S>[K],
    SliceCaseReducers<Required<S>[K]>,
    Extract<K, string>
  >;
}[keyof S];

export function getSliceCreator<RootState>() {
  return function createSlice<
    Name extends Extract<keyof RootState, string>,
    SliceState extends RootState[Name],
    CaseReducers extends SliceCaseReducers<SliceState>,
  >(
    options: CreateSliceOptions<SliceState, CaseReducers, Name>,
  ): Slice<SliceState, CaseReducers, Name> & SliceExtra<RootState, SliceState, CaseReducers, Name> {
    const slice = createSliceOriginal(options);
    const { name } = slice;
    const selectDomain = (state?: RootState): SliceState => {
      const stateValue = state?.[options.name];
      if (stateValue) return stateValue as unknown as SliceState;
      const { initialState } = options;
      if (typeof initialState === 'function') return (initialState as () => SliceState)();
      return initialState;
    };

    const capitalizedName = (name.charAt(0).toUpperCase() + name.slice(1)) as Capitalize<Name>;
    const sliceExtra = {
      [`use${capitalizedName}Dispatch`]: () =>
        useDispatchActions<RootState, Name, SliceState, CaseReducers>(slice.actions),
      selectDomain,
    } as SliceExtra<RootState, SliceState, CaseReducers, Name>;

    return {
      ...slice,
      ...sliceExtra,
    };
  };
}
