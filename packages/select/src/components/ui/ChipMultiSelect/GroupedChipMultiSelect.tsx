import * as React from "react";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import {
  GroupedMultiSelect,
  GroupedMultiSelectProps,
} from "../GroupedMultiSelect";
import { DropdownOption } from "../GroupedMultiSelectTypes";
import { ChipRow } from "./ChipRow";

export interface GroupedChipMultiSelectValue<TData>
  extends DropdownOption<TData> {}

export interface GroupedChipMultiSelectProps<TData>
  extends Omit<GroupedMultiSelectProps<TData>, "onChange" | "value">,
    ValueAndOnValueChangeProps<Array<DropdownOption<TData>>> {
  loading?: boolean;
  inputValue?: string;
  onInputChange?: (inputValue: string) => void;
  noneSelectedLabel?: string;
}

function _GroupedChipMultiSelect<TData>({
  value,
  onValueChange,
  placeholder = "Type to search",
  loading,
  inputValue,
  onInputChange,
  noneSelectedLabel = "None",
  ...selectProps
}: GroupedChipMultiSelectProps<TData>) {
  return (
    <ChipRow
      noneSelectedLabel={noneSelectedLabel}
      onValueChange={onValueChange}
      value={value}
    >
      <GroupedMultiSelect<TData>
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

export const GroupedChipMultiSelect = React.memo(
  _GroupedChipMultiSelect,
) as typeof _GroupedChipMultiSelect;
