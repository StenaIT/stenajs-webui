import {
  createSearchFilterActions,
  createSearchFilterReducer,
} from "../redux/SearchFilterRedux";
import { useReducer, useState } from "react";

export const useLocalSearchFilterState = <
  TFormModel,
  TSectionKey extends string
>(
  initialFormModel: TFormModel
) => {
  const [reducer] = useState(() =>
    createSearchFilterReducer<TFormModel>("local", initialFormModel)
  );

  const [actions] = useState(() =>
    createSearchFilterActions<TFormModel, TSectionKey>(
      "local",
      initialFormModel
    )
  );

  const [state, dispatch] = useReducer(reducer, {
    settings: {
      open: false,
    },
    formModel: initialFormModel,
    expandedSections: { values: {} },
  });

  return {
    actions,
    state,
    dispatch,
  };
};
