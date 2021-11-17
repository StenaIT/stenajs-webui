import * as React from "react";
import {
  SearchFilterSection,
  SearchFilterSectionProps,
} from "../../../components/SearchFilterSection";
import { Column, Text } from "@stenajs-webui/core";
import { CollapsibleClickableContent } from "@stenajs-webui/panels";
import { Checkbox, ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { BooleanRecord, BooleanRecordOptions } from "../BooleanRecordTypes";

export interface CheckboxSectionProps<TSectionKey extends string>
  extends SearchFilterSectionProps<TSectionKey>,
    ValueAndOnValueChangeProps<BooleanRecord> {
  options?: BooleanRecordOptions;
}

export const SimpleCheckboxListSection = <TSectionKey extends string>({
  options,
  error,
  loading,
  sectionId,
  value,
  onValueChange,
}: CheckboxSectionProps<TSectionKey>): React.ReactElement => (
  <SearchFilterSection
    sectionId={sectionId}
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
          <Text>{d.label}</Text>
        </CollapsibleClickableContent>
      ))}
    </Column>
  </SearchFilterSection>
);
