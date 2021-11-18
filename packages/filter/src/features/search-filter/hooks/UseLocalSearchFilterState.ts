import {
  createSearchFilterActions,
  createSearchFilterReducer,
  SearchFilterState,
} from "../redux/SearchFilterRedux";
import { useReducer, useState } from "react";

export const useLocalSearchFilterState = <
  TFormModel,
  TSectionKey extends string
>(
  initialState: SearchFilterState<TFormModel>
) => {
  const [reducer] = useState(() =>
    createSearchFilterReducer<TFormModel>("local", initialState)
  );

  const [actions] = useState(() =>
    createSearchFilterActions<TFormModel, TSectionKey>(
      "local",
      initialState.formModel
    )
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    actions,
    state,
    dispatch,
  };
};
