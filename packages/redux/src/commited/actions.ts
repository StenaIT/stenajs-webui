export type CommittedAction<TState> =
  | SetValuesAction<TState>
  | CommitValuesAction
  | ClearValuesAction;

interface SetValuesAction<TState> {
  type: "COMMITTED.SET_VALUES";
  id: string;
  values: Partial<TState>;
}

interface CommitValuesAction {
  type: "COMMITTED.COMMIT_VALUES";
  id: string;
}

interface ClearValuesAction {
  type: "COMMITTED.CLEAR";
  id: string;
}

export type SetFilterValuesActionCreator<TState> = (
  values: Partial<TState>
) => SetValuesAction<TState>;

export type CommitFilterValuesActionCreator = () => CommitValuesAction;

export type ClearFilterValuesActionCreator = () => ClearValuesAction;

export interface CommittedActions<TState> {
  setValues: SetFilterValuesActionCreator<TState>;
  commitValues: CommitFilterValuesActionCreator;
  clearValues: ClearFilterValuesActionCreator;
}

export const createCommittedActions = <TState>(
  id: string
): CommittedActions<TState> => {
  return {
    setValues: values => ({
      type: "COMMITTED.SET_VALUES",
      id,
      values
    }),
    commitValues: () => ({
      type: "COMMITTED.COMMIT_VALUES",
      id
    }),
    clearValues: () => ({
      type: "COMMITTED.CLEAR",
      id
    })
  };
};
