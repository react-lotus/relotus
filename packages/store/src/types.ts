import { Reducer, AnyAction, EnhancedStore, Middleware, Dispatch } from '@reduxjs/toolkit';

type StateKeyType<State> = Extract<keyof State, string>;

export type InjectedReducersType<State> = {
  [P in StateKeyType<State>]?: Reducer<Required<State>[P], AnyAction>;
};
export interface InjectReducerParams<State, Key extends StateKeyType<State>> {
  key: Key;
  reducer: Reducer<Required<State>[Key], AnyAction>;
}

export type Store<T> = EnhancedStore<
  T,
  AnyAction,
  Middleware<unknown, unknown, Dispatch<AnyAction>>[]
>;
