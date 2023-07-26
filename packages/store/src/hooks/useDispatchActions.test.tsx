import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { configureStore, PayloadAction, getSliceCreator, SliceOptions } from '..';

import { type State } from '../../__tests__';

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

describe('useDispatchActions', () => {
  it('should return bound actions', () => {
    const { useUiDispatch } = createSlice(options);
    const store = configureStore();
    const { result } = renderHook(() => useUiDispatch(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(typeof result.current['setTitle']).toBe('function');
  });

  it('should save ', () => {
    const { useUiDispatch } = createSlice({
      ...options,
      reducers: {
        resetTitle(state) {
          state.title = '';
        },
      },
    });
    const store = configureStore();
    const { result } = renderHook(() => useUiDispatch(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current.resetTitle.type).toBeDefined();
    expect(result.current.resetTitle.match).toBeDefined();
  });
});
