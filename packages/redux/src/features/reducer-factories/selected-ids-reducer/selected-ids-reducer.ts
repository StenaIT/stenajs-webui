import { Reducer } from "redux";
import { SelectedIdsAction } from "./selected-ids-actions";

export interface SelectedIdsState {
  selectedIds: Array<string>;
}

export const createSelectedIdsReducerInitialState = (
  initialSelection: string[] = []
): SelectedIdsState => ({
  selectedIds: initialSelection
});

const INITIAL_STATE = createSelectedIdsReducerInitialState();

export type SelectedIdsReducer = Reducer<SelectedIdsState, SelectedIdsAction>;

export const createSelectedIdsReducer = (): SelectedIdsReducer => (
  state = INITIAL_STATE,
  action
) => {
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

export const selectedIdsReducer = createSelectedIdsReducer();
