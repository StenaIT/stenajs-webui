import { Action, AnyAction, Reducer } from "redux";

export interface ReducerIdGateAction<TInnerAction> {
  type: "REDUCER_ID_GATE:ACTION";
  reducerId: string;
  action: TInnerAction;
}

export type ReducerIdGateReducer<
  TState,
  TInnerAction extends Action = AnyAction
> = Reducer<TState, ReducerIdGateAction<TInnerAction>>;

export const reducerIdGate = <TState, TInnerAction extends Action = AnyAction>(
  reducerId: string,
  reducer: Reducer<TState, TInnerAction>
): ReducerIdGateReducer<TState, TInnerAction> => (state, action) => {
  if (!isValidReducerIdGateAction(action)) {
    if (state === undefined) {
      return reducer(undefined, {} as any);
    } else {
      return state;
    }
  }
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
  reducerId,
});

const isValidReducerIdGateAction = (action: any): boolean =>
  !!action.action &&
  action.type === "REDUCER_ID_GATE:ACTION" &&
  typeof action.reducerId === "string";
