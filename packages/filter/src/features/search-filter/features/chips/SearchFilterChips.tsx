import * as React from "react";
import { Dispatch, useCallback } from "react";
import { SearchFilterConfig } from "../../config/SearchFilterConfig";
import {
  SearchFilterAction,
  SearchFilterActions,
  SearchFilterState,
} from "../../redux/SearchFilterRedux";
import { SectionChips } from "./SectionChips";
import { SecondaryButton } from "@stenajs-webui/elements";
import { ChipSpacer } from "./ChipSpacer";
import { Row } from "@stenajs-webui/core";

interface SearchFilterChipsProps<TFormModel, TSectionKey extends string> {
  config: SearchFilterConfig<TFormModel, TSectionKey>;
  state: SearchFilterState<TFormModel>;
  dispatch: Dispatch<SearchFilterAction<TFormModel>>;
  actions: SearchFilterActions<TFormModel, TSectionKey>;
  disableChipClearButton?: boolean;
  disableClearAllButton?: boolean;
}

export const SearchFilterChips = function SearchFilterChips<
  TFormModel,
  TSectionKey extends string
>({
  config,
  state,
  dispatch,
  actions,
  disableClearAllButton,
  disableChipClearButton,
}: SearchFilterChipsProps<TFormModel, TSectionKey>) {
  const sectionIdsWithChips = config.sectionOrder.filter(
    (sectionId) => config.sections[sectionId] != null
  );

  const onClickClearAll = useCallback(
    () => dispatch(actions.clearFormModel()),
    [actions, dispatch]
  );

  return (
    <Row flexWrap={"wrap"}>
      {sectionIdsWithChips.map((sectionId) => {
        return (
          <SectionChips
            key={sectionId}
            sectionId={sectionId}
            config={config}
            state={state}
            dispatch={dispatch}
            actions={actions}
            disableChipClearButton={disableChipClearButton}
          />
        );
      })}
      {!disableClearAllButton && (
        <ChipSpacer>
          <SecondaryButton
            size={"small"}
            label={"Clear all"}
            onClick={onClickClearAll}
          />
        </ChipSpacer>
      )}
    </Row>
  );
};
