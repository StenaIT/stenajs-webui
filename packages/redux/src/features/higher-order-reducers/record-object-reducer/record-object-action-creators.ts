import {
  RecordObjectClearAllRecordsAction,
  RecordObjectClearRecordAction,
  RecordObjectRecordAction,
  RecordObjectKey,
  RecordObjectWrappedAction,
} from "./record-object-actions";

export interface RecordObjectActions<
  TInnerAction extends RecordObjectWrappedAction
> {
  recordAction: (
    recordId: RecordObjectKey,
    action: TInnerAction
  ) => RecordObjectRecordAction<TInnerAction>;
  clearRecord: (recordId: RecordObjectKey) => RecordObjectClearRecordAction;
  clearAllRecords: () => RecordObjectClearAllRecordsAction;
}

export const createRecordObjectActions = <
  TInnerAction extends RecordObjectWrappedAction
>(): RecordObjectActions<TInnerAction> => ({
  recordAction: (recordId, action) => ({
    type: action.type,
    action,
    recordId,
  }),
  clearRecord: (recordId) => ({
    type: "RECORD_OBJECT:CLEAR_RECORD",
    recordId,
  }),
  clearAllRecords: () => ({
    type: "RECORD_OBJECT:CLEAR_ALL_RECORDS",
  }),
});
