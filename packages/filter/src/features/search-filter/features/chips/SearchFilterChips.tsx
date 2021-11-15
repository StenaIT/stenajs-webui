import * as React from "react";
import { Dispatch, useCallback } from "react";
import {
  SearchFilterAction,
  SearchFilterActions,
} from "../../redux/SearchFilterRedux";
import { Row } from "@stenajs-webui/core";
import { ChipSpacer } from "./ChipSpacer";
import { SecondaryButton } from "@stenajs-webui/elements";

interface SearchFilterChipsProps {
  dispatch: Dispatch<SearchFilterAction<any>>;
  actions: SearchFilterActions<any, any>;
  disableClearAllButton?: boolean;
}

export const SearchFilterChips: React.FC<SearchFilterChipsProps> = ({
  children,
  actions,
  dispatch,
  disableClearAllButton = false,
}) => {
  const onClickClearAll = useCallback(
    () => dispatch(actions.clearFormModel()),
    [actions, dispatch]
  );

  return (
    <Row flexWrap={"wrap"}>
      {children}
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
