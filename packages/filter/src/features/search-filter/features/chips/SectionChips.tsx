import * as React from "react";
import {
  SearchFilterSectionChipModel,
  SearchFilterSectionOnClickRemoveOnChip,
} from "../../config/SearchFilterConfig";
import { EmptyChip } from "./EmptyChip";
import { SearchFilterChip } from "./SearchFilterChip";

export interface SectionChipsProps<TFormModel, TSectionKey extends string> {
  sectionId: TSectionKey;
  chips?: Array<SearchFilterSectionChipModel>;
  emptyChipLabel?: string;
  onClickRemoveOnChip?: SearchFilterSectionOnClickRemoveOnChip<TFormModel>;
}

export const SectionChips = function SectionChips<
  TFormModel,
  TSectionKey extends string
>({
  sectionId,
  chips,
  emptyChipLabel,
  onClickRemoveOnChip,
}: SectionChipsProps<TFormModel, TSectionKey>) {
  if (!chips?.length) {
    if (!emptyChipLabel) {
      return null;
    }
    return <EmptyChip sectionId={sectionId} label={emptyChipLabel} />;
  }

  return (
    <>
      {chips.map(({ label, value }) => (
        <SearchFilterChip
          key={value}
          label={label ?? sectionId}
          sectionId={sectionId}
          onClickRemove={onClickRemoveOnChip}
          value={value}
        />
      ))}
    </>
  );
};
