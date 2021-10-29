import * as React from "react";
import { Dispatch, useCallback } from "react";
import { SearchFilterConfig } from "../../config/SearchFilterConfig";
import {
  SearchFilterAction,
  SearchFilterActions,
  SearchFilterState,
} from "../../redux/SearchFilterRedux";
import { Chip } from "@stenajs-webui/elements";
import { ChipSpacer } from "./ChipSpacer";

interface SectionChipsProps<TFormModel, TSectionKey extends string> {
  sectionId: TSectionKey;
  config: SearchFilterConfig<TFormModel, TSectionKey>;
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
  config,
  state: { formModel },
  dispatch,
  actions,
  disableChipClearButton,
}: SectionChipsProps<TFormModel, TSectionKey>) {
  const { emptyChipLabel, onClickRemoveOnChip, chips } = config.sections[
    sectionId
  ];
  const chipModels = chips?.({ formModel }) ?? [];

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
