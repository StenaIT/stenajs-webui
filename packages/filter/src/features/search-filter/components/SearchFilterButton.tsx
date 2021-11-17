import { faSlidersH } from "@fortawesome/free-solid-svg-icons/faSlidersH";
import { SecondaryButton } from "@stenajs-webui/elements";
import * as React from "react";
import { useCallback } from "react";
import { useSearchFilterDispatch } from "../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../context/SearchFilterActionsContext";

interface SearchFilterDrawerButtonProps {
  label?: string;
}

export const SearchFilterButton: React.VFC<SearchFilterDrawerButtonProps> = ({
  label = "Filters",
}) => {
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions();

  const onClickButton = useCallback(() => {
    dispatch(actions.openFilters());
  }, [actions, dispatch]);

  return (
    <SecondaryButton
      label={label}
      leftIcon={faSlidersH}
      onClick={onClickButton}
    />
  );
};
