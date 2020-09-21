import {
  ClearFilterValuesActionCreator,
  CommitFilterValuesActionCreator,
  SetFilterValuesActionCreator,
} from "./commit-actions";

export interface CommitReducerActions<TState> {
  setValues: SetFilterValuesActionCreator<TState>;
  commitValues: CommitFilterValuesActionCreator;
  clearValues: ClearFilterValuesActionCreator;
}

export const createCommitReducerActions = <TState>(
  id: string
): CommitReducerActions<TState> => {
  return {
    setValues: (values) => ({
      type: "COMMIT_REDUCER.SET_VALUES",
      id,
      values,
    }),
    commitValues: () => ({
      type: "COMMIT_REDUCER.COMMIT_VALUES",
      id,
    }),
    clearValues: () => ({
      type: "COMMIT_REDUCER.CLEAR",
      id,
    }),
  };
};
