import { State } from '../__tests__';
import { configureStore, getSliceCreator, type ConfigureStoreOptions, type PayloadAction } from '.';

const options: Omit<ConfigureStoreOptions<State>, 'reducer'> = {
  devTools: true,
  preloadedState: {
    ui: { title: '' },
  },
};

const createSlice = getSliceCreator<State>();

describe('configureStore', () => {
  it('should accepts configureStore options', () => {
    const store = configureStore(options);
    expect(store.getState()).toBe(options.preloadedState);
  });

  it('should accepts configureStore with extra reducers', () => {
    const store = configureStore(options);
    const {
      actions: { clearTitle },
    } = createSlice({
      name: 'ui',
      initialState: {
        title: 'Some title',
      },
      reducers: {
        clearTitle(state, _action: PayloadAction<number>) {
          state.title = '';
        },
      },
    });
    // @ts-expect-error Argument of type 'boolean' is not assignable to parameter of type 'number'
    store.dispatch(clearTitle(true));
    store.dispatch(clearTitle(1));
    expect(store.getState()).toEqual(
      expect.objectContaining({
        ui: expect.objectContaining({
          title: '',
        }),
      }),
    );
  });
});
