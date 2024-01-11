import * as React from "react";
import {
  SearchFilterSection,
  SearchFilterSectionProps,
} from "../../../components/SearchFilterSection";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { BooleanRecord, BooleanRecordOptions } from "../BooleanRecordTypes";
import { FilterCheckbox } from "../../../features/filter-checkbox/FilterCheckbox";
import { FilterCheckboxList } from "../../../features/filter-checkbox/FilterCheckboxList";

export interface SimpleCheckboxSectionProps<TSectionKey extends string>
  extends SearchFilterSectionProps<TSectionKey>,
    ValueAndOnValueChangeProps<BooleanRecord> {
  options?: BooleanRecordOptions;
}

export const SimpleCheckboxListSection = <TSectionKey extends string>({
  options,
  value,
  onValueChange,
  ...sectionProps
}: SimpleCheckboxSectionProps<TSectionKey>): React.ReactElement => (
  <SearchFilterSection disableContentPadding {...sectionProps}>
    <FilterCheckboxList maxHeight={"400px"}>
      {options?.map((d) => (
        <FilterCheckbox
          key={d.value}
          value={value?.[d.value]}
          label={d.label}
          onValueChange={(v) =>
            onValueChange?.({
              ...value,
              [d.value]: v,
            })
          }
        />
      ))}
    </FilterCheckboxList>
  </SearchFilterSection>
);
