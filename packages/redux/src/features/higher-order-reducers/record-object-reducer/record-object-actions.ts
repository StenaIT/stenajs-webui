export interface RecordObjectWrappedAction {
  type: string;
}

export type RecordObjectAction<TInnerAction extends RecordObjectWrappedAction> =

    | RecordObjectClearRecordAction
    | RecordObjectClearAllRecordsAction
    | RecordObjectRecordAction<TInnerAction>;

export type RecordObjectKey = string | number;

export interface RecordObjectRecordAction<
  TInnerAction extends RecordObjectWrappedAction,
> {
  type: "RECORD_OBJECT:ACTION";
  recordId: RecordObjectKey;
  action: TInnerAction;
}

export interface RecordObjectClearRecordAction {
  type: "RECORD_OBJECT:CLEAR_RECORD";
  recordId: RecordObjectKey;
}

export interface RecordObjectClearAllRecordsAction {
  type: "RECORD_OBJECT:CLEAR_ALL_RECORDS";
}
