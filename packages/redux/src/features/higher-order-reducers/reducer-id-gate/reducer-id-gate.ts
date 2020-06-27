import { Reducer } from "react";

export interface ReducerIdGateAction<TInnerAction> {
  reducerId: string;
  action: TInnerAction;
}

export const reducerIdGate = <
  TState,
  TInnerAction,
  TOuterAction extends ReducerIdGateAction<TInnerAction>
>(
  reducerId: string,
  reducer: Reducer<TState, TInnerAction>
): Reducer<TState, TOuterAction> => (state, action) => {
  if (reducerId !== action.reducerId) {
    return state;
  }
  return reducer(state, action.action);
};

export const reducerIdGateAction = <TInnerAction>(
  reducerId: string,
  action: TInnerAction
): ReducerIdGateAction<TInnerAction> => ({ action, reducerId });
