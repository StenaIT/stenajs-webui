import * as React from "react";
import {
  SearchFilterSection,
  SearchFilterSectionProps,
} from "../../../components/SearchFilterSection";
import { Column } from "@stenajs-webui/core";
import { CollapsibleClickableContent } from "@stenajs-webui/panels";
import { Checkbox, ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { BooleanRecord, BooleanRecordOptions } from "../BooleanRecordTypes";

export interface CheckboxSectionProps<TFormModel, TSectionKey extends string>
  extends SearchFilterSectionProps<TFormModel, TSectionKey>,
    ValueAndOnValueChangeProps<BooleanRecord> {
  options?: BooleanRecordOptions;
}

export const CheckboxSection = <TFormModel, TSectionKey extends string>({
  actions,
  options,
  dispatch,
  error,
  loading,
  sectionId,
  state,
  value,
  onValueChange,
}: CheckboxSectionProps<TFormModel, TSectionKey>): React.ReactElement => (
  <SearchFilterSection
    sectionId={sectionId}
    state={state}
    actions={actions}
    dispatch={dispatch}
    loading={loading}
    error={error}
    disableContentPadding
  >
    <Column maxHeight={"400px"} overflowY={"auto"} flex={1}>
      {options?.map((d) => (
        <CollapsibleClickableContent
          key={d.value}
          onClick={() => {
            if (value && onValueChange) {
              const sel = !value[d.value];
              onValueChange({
                ...value,
                [d.value]: sel,
              });
            }
          }}
          contentLeft={<Checkbox tabIndex={-1} value={value?.[d.value]} />}
        >
          {d.label}
        </CollapsibleClickableContent>
      ))}
    </Column>
  </SearchFilterSection>
);
