import * as React from "react";
import { useCallback } from "react";
import {
  SearchFilterSectionChipModel,
  SearchFilterSectionOnClickRemoveOnChip,
} from "../../config/SearchFilterConfig";
import { Chip } from "@stenajs-webui/elements";
import { ChipSpacer } from "./ChipSpacer";
import { useSearchFilterDispatch } from "../../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../../context/SearchFilterActionsContext";

export interface SectionChipsProps<TFormModel, TSectionKey extends string> {
  sectionId: TSectionKey;
  chips?: Array<SearchFilterSectionChipModel>;
  emptyChipLabel?: string;
  onClickRemoveOnChip?: SearchFilterSectionOnClickRemoveOnChip<TFormModel>;
  disableChipClearButton?: boolean;
}

export const SectionChips = function SectionChips<
  TFormModel,
  TSectionKey extends string
>({
  sectionId,
  chips,
  emptyChipLabel,
  onClickRemoveOnChip,
  disableChipClearButton,
}: SectionChipsProps<TFormModel, TSectionKey>) {
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions();

  const setFormModelFields = useCallback(
    (fields: Partial<TFormModel>) =>
      dispatch(actions.setFormModelFields(fields)),
    [dispatch, actions]
  );

  const onClickRemove = useCallback(
    (value: string) => {
      onClickRemoveOnChip?.({ value, setFormModelFields });
    },
    [onClickRemoveOnChip, setFormModelFields]
  );

  const onClickLabel = useCallback(() => {
    dispatch(actions.clearExpandedSections());
    dispatch(actions.expandSection(sectionId));
    dispatch(actions.openFilters());
  }, [actions, dispatch, sectionId]);

  if (!chips?.length) {
    if (!emptyChipLabel) {
      return null;
    }
    return (
      <ChipSpacer>
        <Chip
          label={emptyChipLabel}
          variant={"secondary"}
          onClick={onClickLabel}
        />
      </ChipSpacer>
    );
  }

  return (
    <>
      {chips.map(({ label, value }) => (
        <ChipSpacer key={value}>
          <Chip
            label={label ?? sectionId}
            onClick={onClickLabel}
            onClickRemove={
              disableChipClearButton ? undefined : () => onClickRemove(value)
            }
          />
        </ChipSpacer>
      ))}
    </>
  );
};
