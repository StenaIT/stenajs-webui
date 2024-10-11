import * as React from "react";
import { ReactNode, useCallback } from "react";
import { Row } from "@stenajs-webui/core";
import { FlatButton, stenaClean } from "@stenajs-webui/elements";
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
    [actions, dispatch],
  );

  return (
    <Row flexWrap={"wrap"} alignItems={"center"} gap>
      {children}
      {!disableClearAllButton && (
        <FlatButton
          size={"small"}
          leftIcon={stenaClean}
          label={"Clear"}
          onClick={onClickClearAll}
        />
      )}
    </Row>
  );
};
