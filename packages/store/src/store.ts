import {
  configureStore,
  Middleware,
  combineReducers,
  Reducer,
  ConfigureStoreOptions,
} from '@reduxjs/toolkit';

import type { InjectedReducersType, Store } from './types';

interface StateConfig<S> extends Omit<ConfigureStoreOptions<S>, 'reducer' | 'middleware'> {
  reducers?: InjectedReducersType<S>;
  middlewares?: Middleware[];
}

export function configureAppStore<State>(config: StateConfig<State> = {}): Store<State> {
  const defaultReducer: Reducer = (state: State) => state;

  const { middlewares = [], reducers = {}, preloadedState = {}, devTools, ...other } = config;

  const store = configureStore({
    ...other,
    reducer: Object.keys(reducers).length === 0 ? defaultReducer : combineReducers(reducers),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: true, immutableCheck: true }).concat(middlewares),
    devTools,
    preloadedState,
  }) as Store<State>;

  return store;
}
