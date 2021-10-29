import * as React from "react";
import { Dispatch, useCallback } from "react";
import { SearchFilterConfig } from "../config/SearchFilterConfig";
import { Column } from "@stenajs-webui/core";
import { SearchFilterPanelHeader } from "./SearchFilterPanelHeader";
import { SearchFilterSection } from "./SearchFilterSection";
import {
  SearchFilterAction,
  SearchFilterActions,
  SearchFilterState,
} from "../redux/SearchFilterRedux";

interface SearchFilterPanelProps<TFormModel, TSectionKey extends string> {
  config: SearchFilterConfig<TFormModel, TSectionKey>;
  state: SearchFilterState<TFormModel>;
  dispatch: Dispatch<SearchFilterAction<TFormModel>>;
  actions: SearchFilterActions<TFormModel, TSectionKey>;
}

export const SearchFilterPanel = function SearchFilterPanel<
  TFormModel,
  TSectionKey extends string
>({
  config,
  state,
  dispatch,
  actions,
}: SearchFilterPanelProps<TFormModel, TSectionKey>) {
  const onClickClose = useCallback(() => {
    dispatch(actions.closeFilters());
  }, [actions, dispatch]);

  return (
    <Column>
      <SearchFilterPanelHeader onRequestClose={onClickClose} />

      {config.sectionOrder.map((sectionId) => (
        <SearchFilterSection
          key={sectionId}
          sectionId={sectionId}
          state={state}
          config={config}
          dispatch={dispatch}
          actions={actions}
        />
      ))}
    </Column>
  );
};
