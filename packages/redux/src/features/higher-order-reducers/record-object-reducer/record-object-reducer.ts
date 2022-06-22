import { Reducer } from "redux";
import {
  RecordObjectAction,
  RecordObjectClearRecordAction,
  RecordObjectKey,
  RecordObjectWrappedAction,
} from "./record-object-actions";

export type RecordObjectState<TInnerState> = Record<
  RecordObjectKey,
  TInnerState
>;

export const createRecordObjectReducer =
  <TInnerAction extends RecordObjectWrappedAction, TInnerState = unknown>(
    reducer: Reducer<TInnerState, TInnerAction>
  ): Reducer<
    RecordObjectState<TInnerState>,
    RecordObjectAction<TInnerAction>
  > =>
  (state = {}, action) => {
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

      case "RECORD_OBJECT:ACTION": {
        const { recordId, action: innerAction } = action;
        return {
          ...state,
          [recordId]: reducer(state[recordId], innerAction),
        };
      }

      default:
        return state;
    }
  };
