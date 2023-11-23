import * as React from "react";
import { useCallback } from "react";
import { Chip } from "@stenajs-webui/elements";
import { useSearchFilterDispatch } from "../../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../../context/SearchFilterActionsContext";
import { SearchFilterSectionOnClickRemoveOnChip } from "../../config/SearchFilterConfig";

interface SearchFilterChipProps<TFormModel, TSectionKey> {
  sectionId: TSectionKey;
  label: string;
  value: string;
  onClickRemove?: SearchFilterSectionOnClickRemoveOnChip<TFormModel>;
}

export const SearchFilterChip = function SearchFilterChip<
  TFormModel,
  TSectionKey extends string
>({
  sectionId,
  label,
  value,
  onClickRemove,
}: SearchFilterChipProps<TFormModel, TSectionKey>) {
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions();

  const setFormModelFields = useCallback(
    (fields: Partial<TFormModel>) =>
      dispatch(actions.setFormModelFields(fields)),
    [dispatch, actions]
  );

  const onClickRemoveHandler = useCallback(() => {
    onClickRemove?.({ value, setFormModelFields });
  }, [onClickRemove, setFormModelFields, value]);

  const onClickLabel = useCallback(() => {
    dispatch(actions.clearExpandedSections());
    dispatch(actions.expandSection(sectionId));
    dispatch(actions.openFilters());
  }, [actions, dispatch, sectionId]);

  return (
    <Chip
      label={label ?? sectionId}
      onClick={onClickLabel}
      onClickRemove={onClickRemove ? onClickRemoveHandler : undefined}
    />
  );
};
