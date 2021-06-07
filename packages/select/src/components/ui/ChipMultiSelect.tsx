import { Column, Row, Space, Spacing } from "@stenajs-webui/core";
import { Chip, FlatButton } from "@stenajs-webui/elements";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import * as React from "react";
import { MultiSelect, MultiSelectProps } from "./MultiSelect";

export interface ChipMultiSelectValue {
  label: string;
  value: string;
}

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
      <Column>
        <Row flexWrap={"wrap"}>
          {value?.map((v) => (
            <Row key={v.value}>
              <Spacing num={0.5}>
                <Chip
                  label={v.label}
                  onClickRemove={() =>
                    onValueChange?.(
                      value?.filter((f) => f.value !== v.value) ?? []
                    )
                  }
                />
              </Spacing>
              <Space />
            </Row>
          ))}
          {value?.length ? (
            <Spacing num={0.5}>
              <FlatButton
                size={"small"}
                label={"Clear"}
                onClick={() => onValueChange?.([])}
              />
            </Spacing>
          ) : (
            <Spacing num={0.5}>
              <Chip variant={"secondary"} label={noneSelectedLabel} />
            </Spacing>
          )}
        </Row>
        <Space num={0.5} />
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
      </Column>
    );
  }
);
