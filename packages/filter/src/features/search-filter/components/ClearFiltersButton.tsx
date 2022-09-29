import { FlatButton } from "@stenajs-webui/elements";
import * as React from "react";
import { useCallback } from "react";
import { useSearchFilterDispatch } from "../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../context/SearchFilterActionsContext";

interface ClearFiltersButtonProps {
  label?: string;
  onClick?: () => void;
}

export const ClearFiltersButton: React.VFC<ClearFiltersButtonProps> = ({
  label = "Clear filters",
  onClick,
}) => {
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions();

  const onClickButton = useCallback(() => {
    onClick?.();
    dispatch(actions.clearFormModel());
  }, [actions, dispatch, onClick]);

  return <FlatButton label={label} onClick={onClickButton} />;
};
