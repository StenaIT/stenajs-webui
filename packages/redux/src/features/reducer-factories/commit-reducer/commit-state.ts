export interface CommitReducerState<TState> {
  workspace: TState;
  committed: TState;
}
