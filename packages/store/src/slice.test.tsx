import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { PayloadAction, configureStore } from '.';
import { getSliceCreator, type SliceOptions } from './slice';

import { type State } from '../__tests__';

const options: SliceOptions<State> = {
  name: 'ui',
  initialState: {
    title: 'initial title',
  },
  reducers: {
    setTitle(state, { payload }: PayloadAction<string>) {
      state.title = payload;
    },
  },
};

const createSlice = getSliceCreator<State>();

describe('createSlice', () => {
  it('should return slice', () => {
    const slice = createSlice(options);
    expect(slice.reducer).toBeDefined();
    expect(slice.name).toBe('ui');
  });

  it('should throw type error if slice name is not in state', () => {
    const invalidOptions: SliceOptions<State> = {
      // @ts-expect-error Type '"notExistsKey"' is not assignable to type '"ui"'
      name: 'notExistsKey',
    };
    expect(invalidOptions);
  });

  it('should throw type error if initialState is not correct type', () => {
    const invalidOptions: SliceOptions<State> = {
      name: 'domain',
      initialState: {
        // @ts-expect-error Type 'string' is not assignable to type 'number'
        page: 'a',
      },
    };
    expect(invalidOptions);
  });

  it('should throw type error if reducer state is not correct type', () => {
    const invalidOptions: SliceOptions<State> = {
      name: 'ui',
      initialState: {
        title: '',
      },
      reducers: {
        setTitle(state, { payload }: PayloadAction<number>) {
          // @ts-expect-error Type 'number' is not assignable to type 'string'
          state.title = payload;
        },
      },
    };
    expect(invalidOptions);
  });

  describe('select domain', () => {
    it('should be in createSlice return object', () => {
      const slice = createSlice(options);
      expect(slice.selectDomain).toBeDefined();
    });

    it('should return initial state when state is undefined', () => {
      const { selectDomain } = createSlice(options);
      expect(selectDomain(undefined).title).toBe('initial title');
    });

    it('should return initial state return when state is undefined', () => {
      const { selectDomain } = createSlice({
        ...options,
        initialState: () => ({ title: 'Lazy title' }),
      });
      expect(selectDomain(undefined).title).toBe('Lazy title');
    });

    it('should return state of slice if state is defined', () => {
      const { selectDomain } = createSlice(options);
      expect(
        selectDomain({
          ui: { title: 'Some state title' },
          domain: { list: [''], page: 1, pageSize: 10, total: 100 },
        }).title,
      ).toBe('Some state title');
    });
  });

  describe('useDispatch', () => {
    it('should return slice actions', () => {
      const { actions, useUiDispatch } = createSlice(options);
      const store = configureStore();
      const { result } = renderHook(() => useUiDispatch(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });
      expect(Object.keys(result.current)).toEqual(Object.keys(actions));
    });

    it('should return correct hook name', () => {
      const slice = createSlice(options);
      const { useUiDispatch } = slice;
      expect(useUiDispatch).toBeDefined();
    });
  });
});
