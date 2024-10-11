import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  SearchFilterSection,
  SearchFilterSectionProps,
} from "../../../components/SearchFilterSection";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { BooleanRecord, BooleanRecordOptions } from "../BooleanRecordTypes";
import { ChipMultiSelect, ChipMultiSelectValue } from "@stenajs-webui/select";
import { truthyKeysAsList } from "@stenajs-webui/core";

interface ChipMultiSelectSectionProps<TSectionKey extends string>
  extends SearchFilterSectionProps<TSectionKey>,
    ValueAndOnValueChangeProps<BooleanRecord> {
  noneSelectedLabel?: string;
  options?: BooleanRecordOptions;
}

export const ChipMultiSelectSection = <TSectionKey extends string>({
  options,
  value,
  noneSelectedLabel,
  onValueChange,
  ...sectionProps
}: ChipMultiSelectSectionProps<TSectionKey>): React.ReactElement => {
  const [text, setText] = useState<string>("");

  const listValue = useMemo<Array<ChipMultiSelectValue>>(
    () =>
      value
        ? truthyKeysAsList(value).map<ChipMultiSelectValue>((key) => {
            const option = options?.find((o) => o.value === key);
            return { value: key, label: option?.label ?? key };
          })
        : [],
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    return options?.filter(
      (p) =>
        p.value.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) > -1 ||
        p.label.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) > -1,
    );
  }, [options, text]);

  const onValueChangeInternal = useCallback(
    (value: Array<ChipMultiSelectValue>) => {
      onValueChange?.(createBooleanRecordFromValue(value));
    },
    [onValueChange],
  );

  return (
    <SearchFilterSection {...sectionProps}>
      <ChipMultiSelect
        options={filteredOptions}
        value={listValue}
        onValueChange={onValueChangeInternal}
        inputValue={text}
        noneSelectedLabel={noneSelectedLabel}
        onInputChange={setText}
        closeMenuOnSelect={false}
      />
    </SearchFilterSection>
  );
};

const createBooleanRecordFromValue = (
  value: Array<ChipMultiSelectValue>,
): BooleanRecord => {
  return value.reduce<BooleanRecord>((sum, item) => {
    sum[item.value] = true;
    return sum;
  }, {});
};
