import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import * as React from "react";
import { MultiSelect, MultiSelectProps } from "../MultiSelect";
import { ChipRow, ChipRowItem } from "./ChipRow";

export interface ChipMultiSelectValue extends ChipRowItem {}

export interface ChipMultiSelectProps
  extends Omit<MultiSelectProps, "value" | "onChange" | "isLoading">,
    ValueAndOnValueChangeProps<Array<ChipMultiSelectValue>> {
  loading?: boolean;
  inputValue?: string;
  onInputChange?: (inputValue: string) => void;
  noneSelectedLabel?: string;
}

export const ChipMultiSelect = React.memo<ChipMultiSelectProps>(
  ({
    value,
    onValueChange,
    placeholder = "Type to search",
    loading,
    inputValue,
    onInputChange,
    noneSelectedLabel = "None",
    ...selectProps
  }) => {
    return (
      <ChipRow
        noneSelectedLabel={noneSelectedLabel}
        onValueChange={onValueChange}
        value={value}
      >
        <MultiSelect<ChipMultiSelectValue>
          {...selectProps}
          isClearable={false}
          value={value}
          onChange={onValueChange as MultiSelectProps["onChange"]}
          backspaceRemovesValue={false}
          hideSelectedOptions
          controlShouldRenderValue={false}
          placeholder={placeholder}
          isLoading={loading}
          inputValue={inputValue}
          onInputChange={onInputChange}
        />
      </ChipRow>
    );
  }
);
