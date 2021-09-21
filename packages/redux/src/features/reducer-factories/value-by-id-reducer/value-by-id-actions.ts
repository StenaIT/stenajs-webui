export type ValueByIdAction<TValue> =
  | ValueByIdSetValueAction<TValue>
  | ValueByIdClearValueAction
  | ValueByIdClearAllValuesAction;

export interface ValueByIdSetValueAction<TValue> {
  type: "VALUE_BY_ID:SET_VALUE";
  id: string;
  value: TValue;
}

export interface ValueByIdClearValueAction {
  type: "VALUE_BY_ID:CLEAR_VALUE";
  id: string;
}

export interface ValueByIdClearAllValuesAction {
  type: "VALUE_BY_ID:CLEAR_ALL_VALUES";
}
