import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import * as React from "react";
import {
  MultiSelect,
  MultiSelectOption,
  MultiSelectProps,
} from "../MultiSelect";
import { ChipRow, ChipRowItem } from "./ChipRow";

export interface ChipMultiSelectOption extends ChipRowItem {}

/**
 * @deprecated renamed to ChipMultiSelectOption
 */
export type ChipMultiSelectValue = ChipMultiSelectOption;

export interface ChipMultiSelectProps<
  TOption extends MultiSelectOption = MultiSelectOption,
> extends Omit<MultiSelectProps<TOption>, "value" | "onChange" | "isLoading">,
    ValueAndOnValueChangeProps<Array<TOption>> {
  loading?: boolean;
  inputValue?: string;
  onInputChange?: (inputValue: string) => void;
  noneSelectedLabel?: string;
}

function _ChipMultiSelect<TOption extends ChipMultiSelectOption>({
  value,
  onValueChange,
  placeholder = "Type to search",
  loading,
  inputValue,
  onInputChange,
  noneSelectedLabel = "None",
  ...selectProps
}: ChipMultiSelectProps<TOption>) {
  return (
    <ChipRow
      noneSelectedLabel={noneSelectedLabel}
      onValueChange={onValueChange}
      value={value}
    >
      <MultiSelect<TOption>
        {...selectProps}
        isClearable={false}
        value={value}
        onChange={
          onValueChange ? (value) => onValueChange([...value]) : undefined
        }
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

export const ChipMultiSelect = React.memo(
  _ChipMultiSelect,
) as typeof _ChipMultiSelect;
