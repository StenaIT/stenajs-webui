import * as React from "react";
import { PropsWithChildren } from "react";
import {
  SearchFilterActions,
  SearchFilterDispatch,
  SearchFilterState,
} from "../../redux/SearchFilterRedux";
import { SearchFilterDispatchContext } from "../../context/SearchFilterDispatchContext";
import { SearchFilterActionsContext } from "../../context/SearchFilterActionsContext";
import { SearchFilterStateContext } from "../../context/SearchFilterStateContext";
import { SearchFilterModelContext } from "../../context/SearchFilterModelContext";

interface SearchFilterScopeProps<TFormModel, TSectionKey extends string> {
  state: SearchFilterState<TFormModel>;
  dispatch: SearchFilterDispatch<TFormModel>;
  actions: SearchFilterActions<TFormModel, TSectionKey>;
}

export const SearchFilterContext = function SearchFilterScope<
  TFormModel,
  TSectionKey extends string
>({
  state,
  dispatch,
  actions,
  children,
}: PropsWithChildren<SearchFilterScopeProps<TFormModel, TSectionKey>>) {
  return (
    <SearchFilterDispatchContext.Provider
      value={dispatch as SearchFilterDispatch<unknown>}
    >
      <SearchFilterActionsContext.Provider value={actions}>
        <SearchFilterStateContext.Provider value={state}>
          <SearchFilterModelContext.Provider value={state.formModel}>
            {children}
          </SearchFilterModelContext.Provider>
        </SearchFilterStateContext.Provider>
      </SearchFilterActionsContext.Provider>
    </SearchFilterDispatchContext.Provider>
  );
};
