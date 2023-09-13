import * as React from "react";
import {
  SearchFilterSection,
  SearchFilterSectionProps,
} from "../../../components/SearchFilterSection";
import { Column, Row } from "@stenajs-webui/core";
import {
  CheckboxWithLabel,
  ValueAndOnValueChangeProps,
} from "@stenajs-webui/forms";
import { BooleanRecord, BooleanRecordOptions } from "../BooleanRecordTypes";

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
    <Column maxHeight={"400px"} overflowY={"auto"} flex={1} gap={1} spacing={1}>
      {options?.map((d) => (
        <Row key={d.value} alignItems={"center"}>
          <CheckboxWithLabel
            tabIndex={-1}
            value={value?.[d.value]}
            label={d.label}
            onValueChange={(v) =>
              onValueChange?.({
                ...value,
                [d.value]: v,
              })
            }
          />
        </Row>
      ))}
    </Column>
  </SearchFilterSection>
);
