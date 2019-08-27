import { CommittedAction } from "./actions";

export interface CommittedState<TState> {
  workspace: TState;
  committed: TState;
}

export const createCommittedReducer = <TState>(
  id: string,
  initialState: CommittedState<TState>
) => (
  state: CommittedState<TState> = initialState,
  action: CommittedAction<TState>
): CommittedState<TState> => {
  if (action.id !== id) {
    return state;
  }
  switch (action.type) {
    case `COMMITTED.SET_VALUES`: {
      const { values } = action;
      return {
        ...state,
        workspace: {
          ...state.workspace,
          ...values
        }
      };
    }

    case `COMMITTED.CLEAR`: {
      return {
        ...state,
        workspace: {
          ...initialState.workspace
        }
      };
    }

    case `COMMITTED.COMMIT_VALUES`: {
      return {
        ...state,
        committed: {
          ...state.workspace
        }
      };
    }

    default:
      return state;
  }
};
