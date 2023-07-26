import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CaseReducerActions,
  SliceCaseReducers,
  bindActionCreators,
  ActionCreatorsMapObject,
  AnyAction,
  Dispatch,
} from '@reduxjs/toolkit';

export function useDispatchActions<
  RootState,
  Name extends Extract<keyof RootState, string>,
  SliceState extends RootState[Name],
  CaseReducers extends SliceCaseReducers<SliceState>,
>(actions: CaseReducerActions<CaseReducers>): CaseReducerActions<CaseReducers> {
  const [staticActions] = useState(actions);
  const dispatch: Dispatch = useDispatch();
  return useMemo(() => {
    const boundActions = bindActionCreators(
      staticActions as ActionCreatorsMapObject<AnyAction>,
      dispatch,
    );
    Object.keys(boundActions).map((action) =>
      Object.assign(boundActions[action], staticActions[action]),
    );
    return boundActions as CaseReducerActions<CaseReducers>;
  }, [dispatch, staticActions]);
}
