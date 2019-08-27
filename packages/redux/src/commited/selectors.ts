import { CommittedState } from "./reducer";

export type CommittedStateSelector<TStoreState, TState> = (
  state: TStoreState,
  id: string
) => CommittedState<TState>;

export interface CommittedSelectors<TStoreState, TState> {
  getWorkspaceValues: (state: TStoreState) => TState;
  getCommittedValues: (state: TStoreState) => TState;
}

export const createCommittedSelectors = <TStoreState, TState>(
  stateSelector: CommittedStateSelector<TStoreState, TState>,
  id: string
): CommittedSelectors<TStoreState, TState> => {
  return {
    getWorkspaceValues: state => stateSelector(state, id).workspace,
    getCommittedValues: state => stateSelector(state, id).committed
  };
};
