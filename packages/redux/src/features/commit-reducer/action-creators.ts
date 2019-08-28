import {
  ClearFilterValuesActionCreator,
  CommitFilterValuesActionCreator,
  SetFilterValuesActionCreator
} from "./actions";

export interface CommittedActions<TState> {
  setValues: SetFilterValuesActionCreator<TState>;
  commitValues: CommitFilterValuesActionCreator;
  clearValues: ClearFilterValuesActionCreator;
}

export const createCommitReducerActions = <TState>(
  id: string
): CommittedActions<TState> => {
  return {
    setValues: values => ({
      type: "COMMIT_REDUCER.SET_VALUES",
      id,
      values
    }),
    commitValues: () => ({
      type: "COMMIT_REDUCER.COMMIT_VALUES",
      id
    }),
    clearValues: () => ({
      type: "COMMIT_REDUCER.CLEAR",
      id
    })
  };
};
