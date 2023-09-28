import { SecondaryButton, stenaSlidersMini } from "@stenajs-webui/elements";
import * as React from "react";
import { useCallback } from "react";
import { useSearchFilterDispatch } from "../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../context/SearchFilterActionsContext";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface SearchFilterDrawerButtonProps {
  label?: string;
  leftIcon?: IconDefinition;
}

export const SearchFilterButton: React.FC<SearchFilterDrawerButtonProps> = ({
  label = "Filters",
  leftIcon = stenaSlidersMini,
}) => {
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions();

  const onClickButton = useCallback(() => {
    dispatch(actions.openFilters());
  }, [actions, dispatch]);

  return (
    <SecondaryButton
      label={label}
      leftIcon={leftIcon}
      onClick={onClickButton}
    />
  );
};
