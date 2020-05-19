import { SelectedIdsAction } from "./selected-ids-actions";

export interface SelectedIdsState {
  selectedIds: Array<string>;
}

const INITIAL_STATE: SelectedIdsState = {
  selectedIds: []
};

export const createSelectedIdsReducer = (reducerId: string) => (
  state: SelectedIdsState = INITIAL_STATE,
  action: SelectedIdsAction
): SelectedIdsState => {
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
