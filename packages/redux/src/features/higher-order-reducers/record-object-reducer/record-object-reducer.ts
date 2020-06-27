import { Reducer } from "react";

export type RecordObjectKey = string | number;

export interface RecordObjectAction<TInnerAction> {
  recordId: RecordObjectKey;
  action: TInnerAction;
}

export const recordObjectReducer = <
  TInnerState,
  TInnerAction,
  TOuterState extends Record<RecordObjectKey, TInnerState>,
  TOuterAction extends RecordObjectAction<TInnerAction>
>(
  reducer: Reducer<TInnerState, TInnerAction>
): Reducer<TOuterState, TOuterAction> => (state, { recordId, action }) => ({
  ...state,
  [recordId]: reducer(state[recordId], action)
});

export const recordObjectAction = <TInnerAction>(
  recordId: RecordObjectKey,
  action: TInnerAction
): RecordObjectAction<TInnerAction> => ({ action, recordId });
