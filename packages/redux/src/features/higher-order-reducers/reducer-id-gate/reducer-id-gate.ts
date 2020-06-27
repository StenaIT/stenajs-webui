import { Reducer } from "react";

export interface ReducerIdGateAction<TInnerAction> {
  reducerId: string;
  action: TInnerAction;
}

export type ReducerIdGateReducer<TState, TInnerAction> = Reducer<
  TState,
  ReducerIdGateAction<TInnerAction>
>;

export const reducerIdGate = <TState, TInnerAction>(
  reducerId: string,
  reducer: Reducer<TState, TInnerAction>
): ReducerIdGateReducer<TState, TInnerAction> => (state, action) => {
  if (reducerId !== action.reducerId) {
    return state;
  }
  return reducer(state, action.action);
};

export const reducerIdGateAction = <TInnerAction>(
  reducerId: string,
  action: TInnerAction
): ReducerIdGateAction<TInnerAction> => ({ action, reducerId });
