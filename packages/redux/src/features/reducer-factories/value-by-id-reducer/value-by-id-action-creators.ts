import {
  ValueByIdClearAllValuesAction,
  ValueByIdClearValueAction,
  ValueByIdSetValueAction,
} from "./value-by-id-actions";

export interface ValueByIdActions<TValue> {
  setValue: (id: string, value: TValue) => ValueByIdSetValueAction<TValue>;
  clearValue: (id: string) => ValueByIdClearValueAction;
  clearAllValues: () => ValueByIdClearAllValuesAction;
}

export const createValueByIdActions = <TValue>(): ValueByIdActions<TValue> => ({
  setValue: (id, value) => ({
    type: "VALUE_BY_ID:SET_VALUE",
    id,
    value,
  }),
  clearValue: (id) => ({
    type: "VALUE_BY_ID:CLEAR_VALUE",
    id,
  }),
  clearAllValues: () => ({
    type: "VALUE_BY_ID:CLEAR_ALL_VALUES",
  }),
});
