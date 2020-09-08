import { CommitReducerState } from "./commit-state";

export type CommitReducerStateSelector<TStoreState, TState> = (
  state: TStoreState,
  id: string
) => CommitReducerState<TState>;

export interface CommitReducerSelectors<TStoreState, TState> {
  getWorkspaceValues: (state: TStoreState) => TState;
  getCommittedValues: (state: TStoreState) => TState;
}

export const createCommitReducerSelectors = <TStoreState, TState>(
  id: string,
  stateSelector: CommitReducerStateSelector<TStoreState, TState>
): CommitReducerSelectors<TStoreState, TState> => {
  return {
    getWorkspaceValues: state => stateSelector(state, id).workspace,
    getCommittedValues: state => stateSelector(state, id).committed
  };
};
