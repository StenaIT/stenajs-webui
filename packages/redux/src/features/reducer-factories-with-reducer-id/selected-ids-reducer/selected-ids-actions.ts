export type SelectedIdsAction =
  | SelectedIdsSetSelectedIdsAction
  | SelectedIdsClearSelectedIdsAction;

interface SelectedIdsSetSelectedIdsAction {
  type: "SELECTED_IDS:SET_SELECTED_IDS";
  selectedIds: Array<string>;
  reducerId: string;
}

interface SelectedIdsClearSelectedIdsAction {
  type: "SELECTED_IDS:CLEAR_SELECTED_IDS";
  reducerId: string;
}

export interface SelectedIdsActions {
  setSelectedIds: (ids: Array<string>) => SelectedIdsSetSelectedIdsAction;
  clearSelectedIds: () => SelectedIdsClearSelectedIdsAction;
}

export const createSelectedIdsActions = (
  reducerId: string
): SelectedIdsActions => ({
  setSelectedIds: selectedIds => ({
    selectedIds,
    reducerId,
    type: "SELECTED_IDS:SET_SELECTED_IDS"
  }),
  clearSelectedIds: () => ({
    reducerId,
    type: "SELECTED_IDS:CLEAR_SELECTED_IDS"
  })
});
