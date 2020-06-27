export type SelectedIdsAction =
  | SelectedIdsSetSelectedIdsAction
  | SelectedIdsClearSelectedIdsAction;

export interface SelectedIdsSetSelectedIdsAction {
  type: "SELECTED_IDS:SET_SELECTED_IDS";
  selectedIds: Array<string>;
}

export interface SelectedIdsClearSelectedIdsAction {
  type: "SELECTED_IDS:CLEAR_SELECTED_IDS";
}
