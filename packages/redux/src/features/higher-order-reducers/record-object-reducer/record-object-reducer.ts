import { Reducer } from "react";
import {
  RecordObjectAction,
  RecordObjectClearRecordAction,
  RecordObjectRecordAction,
  RecordObjectKey,
  RecordObjectWrappedAction
} from "./record-object-actions";

export type RecordObjectState<TInnerState> = Record<
  RecordObjectKey,
  TInnerState
>;

export const createRecordObjectReducer = <
  TInnerAction extends RecordObjectWrappedAction,
  TInnerState = unknown
>(
  reducer: Reducer<TInnerState, TInnerAction>
): Reducer<
  RecordObjectState<TInnerState>,
  RecordObjectAction<TInnerAction>
> => (state, action) => {
  switch (action.type) {
    case "RECORD_OBJECT:CLEAR_RECORD": {
      const { recordId } = action as RecordObjectClearRecordAction;
      const newState = { ...state };
      delete newState[recordId];
      return newState;
    }

    case "RECORD_OBJECT:CLEAR_ALL_RECORDS": {
      return {};
    }
  }

  if ("recordId" in action && "action" in action) {
    const {
      recordId,
      action: innerAction
    } = action as RecordObjectRecordAction<TInnerAction>;
    return {
      ...state,
      [recordId]: reducer(state[recordId], innerAction)
    };
  }

  return state;
};
