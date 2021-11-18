import * as React from "react";
import { PropsWithChildren } from "react";
import { useLocalSearchFilterState } from "../../hooks/UseLocalSearchFilterState";
import { SearchFilterContext } from "./SearchFilterContext";
import { createSearchFilterInitialState } from "../../redux/SearchFilterRedux";

interface SearchFilterLocalScopeProps<TFormModel> {
  initialFormModel: TFormModel;
}

export const SearchFilterLocalStateContext = function SearchFilterLocalScope<
  TFormModel
>({
  initialFormModel,
  children,
}: PropsWithChildren<SearchFilterLocalScopeProps<TFormModel>>) {
  const { state, actions, dispatch } = useLocalSearchFilterState(
    createSearchFilterInitialState(initialFormModel)
  );

  return (
    <SearchFilterContext state={state} actions={actions} dispatch={dispatch}>
      {children}
    </SearchFilterContext>
  );
};
