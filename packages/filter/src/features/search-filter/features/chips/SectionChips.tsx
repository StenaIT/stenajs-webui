import * as React from "react";
import { Dispatch, useCallback } from "react";
import {
  SearchFilterSectionChipModel,
  SearchFilterSectionOnClickRemoveOnChip,
} from "../../config/SearchFilterConfig";
import {
  SearchFilterAction,
  SearchFilterActions,
  SearchFilterState,
} from "../../redux/SearchFilterRedux";
import { Chip } from "@stenajs-webui/elements";
import { ChipSpacer } from "./ChipSpacer";

interface SectionChipsProps<TFormModel, TSectionKey extends string> {
  sectionId: TSectionKey;
  chips?: Array<SearchFilterSectionChipModel>;
  emptyChipLabel?: string;
  onClickRemoveOnChip?: SearchFilterSectionOnClickRemoveOnChip<TFormModel>;
  state: SearchFilterState<TFormModel>;
  dispatch: Dispatch<SearchFilterAction<TFormModel>>;
  actions: SearchFilterActions<TFormModel, TSectionKey>;
  disableChipClearButton?: boolean;
}

export const SectionChips = function SectionChips<
  TFormModel,
  TSectionKey extends string
>({
  sectionId,
  chips,
  state: { formModel },
  emptyChipLabel,
  onClickRemoveOnChip,
  dispatch,
  actions,
  disableChipClearButton,
}: SectionChipsProps<TFormModel, TSectionKey>) {
  const chipModels = chips ?? [];

  const setFormModelFields = useCallback(
    (fields: Partial<TFormModel>) =>
      dispatch(actions.setFormModelFields(fields)),
    [dispatch, actions]
  );

  const onClickRemove = useCallback(
    (value: string) => {
      onClickRemoveOnChip?.({ value, formModel, setFormModelFields });
    },
    [formModel, onClickRemoveOnChip, setFormModelFields]
  );

  const onClickLabel = useCallback(() => {
    dispatch(actions.clearExpandedSections());
    dispatch(actions.expandSection(sectionId));
    dispatch(actions.openFilters());
  }, [actions, dispatch, sectionId]);

  if (!chipModels.length) {
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
      {chipModels.map(({ label, value }) => (
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
