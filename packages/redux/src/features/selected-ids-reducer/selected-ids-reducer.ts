import { Reducer } from "redux";
import { SelectedIdsAction } from "./selected-ids-actions";

export interface SelectedIdsState {
  selectedIds: Array<string>;
}

export const selectedIdsReducerInitialState: SelectedIdsState = {
  selectedIds: []
};

export type SelectedIdsReducer = Reducer<SelectedIdsState, SelectedIdsAction>;

export const createSelectedIdsReducer = (
  reducerId: string
): SelectedIdsReducer => (state = selectedIdsReducerInitialState, action) => {
  if (action.reducerId !== reducerId) {
    return state;
  }
  switch (action.type) {
    case "SELECTED_IDS:SET_SELECTED_IDS": {
      const { selectedIds } = action;
      return {
        ...state,
        selectedIds
      };
    }
    case "SELECTED_IDS:CLEAR_SELECTED_IDS": {
      return {
        ...state,
        selectedIds: []
      };
    }
    default:
      return state;
  }
};
