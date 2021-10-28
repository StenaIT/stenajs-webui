import { ValueByIdAction } from "./value-by-id-actions";

export interface ValueByIdState<TValue> {
  values: { [key: string]: TValue };
}

export const valueByIdInitialState = { values: {} };

export const createValueByIdReducer = <TValue>(
  initialValue: ValueByIdState<TValue> = valueByIdInitialState
) => {
  return (
    state: ValueByIdState<TValue> = initialValue,
    action: ValueByIdAction<TValue>
  ): ValueByIdState<TValue> => {
    switch (action.type) {
      case "VALUE_BY_ID:SET_VALUE": {
        const { id, value } = action;
        return {
          ...state,
          values: {
            ...state.values,
            [id]: value,
          },
        };
      }

      case "VALUE_BY_ID:CLEAR_ALL_VALUES": {
        return {
          ...state,
          values: {},
        };
      }

      case "VALUE_BY_ID:CLEAR_VALUE": {
        const { id } = action;
        const values = {
          ...state.values,
        };
        delete values[id];
        return {
          ...state,
          values,
        };
      }

      default:
        return state;
    }
  };
};
