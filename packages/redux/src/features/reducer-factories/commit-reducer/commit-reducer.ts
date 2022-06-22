import { CommitReducerAction } from "./commit-actions";
import { CommitReducerState } from "./commit-state";

export const createCommitReducer =
  <TState>(id: string, initialState: CommitReducerState<TState>) =>
  (
    state: CommitReducerState<TState> = initialState,
    action: CommitReducerAction<TState>
  ): CommitReducerState<TState> => {
    if (action.id !== id) {
      return state;
    }
    switch (action.type) {
      case `COMMIT_REDUCER.SET_VALUES`: {
        const { values } = action;
        return {
          ...state,
          workspace: {
            ...state.workspace,
            ...values,
          },
        };
      }

      case `COMMIT_REDUCER.CLEAR`: {
        return {
          ...state,
          workspace: {
            ...initialState.workspace,
          },
        };
      }

      case `COMMIT_REDUCER.COMMIT_VALUES`: {
        return {
          ...state,
          committed: {
            ...state.workspace,
          },
        };
      }

      default:
        return state;
    }
  };
