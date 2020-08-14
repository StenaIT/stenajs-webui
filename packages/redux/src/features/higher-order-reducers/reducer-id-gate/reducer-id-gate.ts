import { Action, Reducer } from "redux";

export interface ReducerIdGateAction<TInnerAction> {
  type: "REDUCER_ID_GATE:ACTION";
  reducerId: string;
  action: TInnerAction;
}

export type ReducerIdGateReducer<TState, TInnerAction> = (
  state: TState | undefined,
  action: ReducerIdGateAction<TInnerAction>
) => TState;

export const reducerIdGate = <TState, TInnerAction extends Action>(
  reducerId: string,
  reducer: Reducer<TState, TInnerAction>
): ReducerIdGateReducer<TState, TInnerAction> => (state, action) => {
  if (state === undefined) {
    return reducer(state, action.action);
  }
  if (
    reducerId !== action.reducerId ||
    action.type !== "REDUCER_ID_GATE:ACTION"
  ) {
    return state;
  }
  return reducer(state, action.action);
};

export const reducerIdGateAction = <TInnerAction>(
  reducerId: string,
  action: TInnerAction
): ReducerIdGateAction<TInnerAction> => ({
  type: "REDUCER_ID_GATE:ACTION",
  action,
  reducerId
});
