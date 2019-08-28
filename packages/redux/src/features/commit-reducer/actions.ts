export type CommitReducerAction<TState> =
  | SetValuesAction<TState>
  | CommitValuesAction
  | ClearValuesAction;

interface SetValuesAction<TState> {
  type: "COMMIT_REDUCER.SET_VALUES";
  id: string;
  values: Partial<TState>;
}

interface CommitValuesAction {
  type: "COMMIT_REDUCER.COMMIT_VALUES";
  id: string;
}

interface ClearValuesAction {
  type: "COMMIT_REDUCER.CLEAR";
  id: string;
}

export type SetFilterValuesActionCreator<TState> = (
  values: Partial<TState>
) => SetValuesAction<TState>;

export type CommitFilterValuesActionCreator = () => CommitValuesAction;

export type ClearFilterValuesActionCreator = () => ClearValuesAction;
