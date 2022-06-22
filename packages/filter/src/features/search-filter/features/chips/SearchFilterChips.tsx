import * as React from "react";
import { ReactNode, useCallback } from "react";
import { Row } from "@stenajs-webui/core";
import { ChipSpacer } from "./ChipSpacer";
import { FlatButton } from "@stenajs-webui/elements";
import { useSearchFilterDispatch } from "../../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../../context/SearchFilterActionsContext";

interface SearchFilterChipsProps {
  disableClearAllButton?: boolean;
  children?: ReactNode;
}

export const SearchFilterChips: React.FC<SearchFilterChipsProps> = ({
  children,
  disableClearAllButton = false,
}) => {
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions();

  const onClickClearAll = useCallback(
    () => dispatch(actions.clearFormModel()),
    [actions, dispatch]
  );

  return (
    <Row flexWrap={"wrap"}>
      {children}
      {!disableClearAllButton && (
        <ChipSpacer>
          <FlatButton
            size={"small"}
            label={"Clear all"}
            onClick={onClickClearAll}
          />
        </ChipSpacer>
      )}
    </Row>
  );
};
