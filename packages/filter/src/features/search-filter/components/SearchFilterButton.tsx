import { faSlidersH } from "@fortawesome/free-solid-svg-icons/faSlidersH";
import { SecondaryButton } from "@stenajs-webui/elements";
import * as React from "react";
import { Dispatch, useCallback } from "react";
import {
  SearchFilterAction,
  SearchFilterActions,
} from "../redux/SearchFilterRedux";

interface SearchFilterDrawerButtonProps<
  TFormModel,
  TSectionKey extends string
> {
  dispatch: Dispatch<SearchFilterAction<TFormModel>>;
  actions: SearchFilterActions<TFormModel, TSectionKey>;
}

export const SearchFilterButton = function SearchFilterDrawerButton<
  TFormModel,
  TSectionKey extends string
>({
  dispatch,
  actions,
}: SearchFilterDrawerButtonProps<TFormModel, TSectionKey>) {
  const onClickButton = useCallback(() => {
    dispatch(actions.openFilters());
  }, [actions, dispatch]);

  return (
    <SecondaryButton
      label={"Filters"}
      leftIcon={faSlidersH}
      onClick={onClickButton}
    />
  );
};
