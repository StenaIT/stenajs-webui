import * as React from "react";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import {
  GroupedMultiSelect,
  GroupedMultiSelectProps,
} from "../GroupedMultiSelect";
import { DropdownOption } from "../GroupedMultiSelectTypes";
import { ChipRow } from "./ChipRow";

type StringGroupedMultiSelectProps = GroupedMultiSelectProps<string>;

export interface GroupedChipMultiSelectValue extends DropdownOption<string> {}

export interface GroupedChipMultiSelectProps
  extends Omit<StringGroupedMultiSelectProps, "onChange" | "value">,
    ValueAndOnValueChangeProps<Array<DropdownOption<string>>> {
  loading?: boolean;
  inputValue?: string;
  onInputChange?: (inputValue: string) => void;
  noneSelectedLabel?: string;
}

export const GroupedChipMultiSelect = React.memo<GroupedChipMultiSelectProps>(
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
        <GroupedMultiSelect<string>
          {...selectProps}
          isClearable={false}
          value={value}
          onChange={onValueChange as StringGroupedMultiSelectProps["onChange"]}
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
