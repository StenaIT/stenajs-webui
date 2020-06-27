import {
  SelectedIdsClearSelectedIdsAction,
  SelectedIdsSetSelectedIdsAction
} from "./selected-ids-actions";

export interface SelectedIdsActions {
  setSelectedIds: (ids: Array<string>) => SelectedIdsSetSelectedIdsAction;
  clearSelectedIds: () => SelectedIdsClearSelectedIdsAction;
}

export const createSelectedIdsActions = (): SelectedIdsActions => ({
  setSelectedIds: selectedIds => ({
    selectedIds,
    type: "SELECTED_IDS:SET_SELECTED_IDS"
  }),
  clearSelectedIds: () => ({
    type: "SELECTED_IDS:CLEAR_SELECTED_IDS"
  })
});

export const selectedIdsActions = createSelectedIdsActions();
