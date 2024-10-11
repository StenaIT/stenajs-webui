import { SelectedIdsState } from "./selected-ids-reducer";

export interface SelectedIdsSelectors<TStoreState> {
  getState: SelectedIdsStateSelector<TStoreState>;
}

export type SelectedIdsStateSelector<TStoreState> = (
  state: TStoreState,
) => SelectedIdsState;

export const createSelectedIdsSelectors = <TStoreState>(
  stateSelector: SelectedIdsStateSelector<TStoreState>,
): SelectedIdsSelectors<TStoreState> => ({
  getState: stateSelector,
});
