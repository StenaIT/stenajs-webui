import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { Box, Row, SmallText, Space, StandardText } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { components } from "react-select/lib/components";
import { MultiValueProps } from "react-select/lib/components/MultiValue";
import { OptionProps } from "react-select/lib/components/Option";
import { GroupedOptionsType, OptionsType } from "react-select/lib/types";
import {
  convertGroupedDropdownOptionsToInternalOptions,
  convertValueToInternalValue,
  createOnChange,
  DropdownOption,
  InternalDropdownOption,
  OnChange
} from "../../util/multiDropdownUtils";
import { Select, SelectProps } from "./Select";

export interface GroupedMultiSelectProps<TData>
  extends Omit<
    SelectProps<DropdownOption<TData>>,
    "options" | "onChange" | "value"
  > {
  options: GroupedOptionsType<DropdownOption<TData>>;
  onChange: OnChange<TData>;
  value: OptionsType<DropdownOption<TData>> | undefined;
}

export const GroupedMultiSelect = <TData extends {}>({
  onChange,
  options,
  value,
  theme,
  formatGroupLabel,
  formatOptionLabel,
  ...selectProps
}: GroupedMultiSelectProps<TData>): React.ReactElement<
  GroupedMultiSelectProps<TData>
> => {
  const iconColor = "#fff"; // TODO
  const Option = (props: OptionProps<DropdownOption<TData>>) => {
    if (props.data.internalOptions) {
      return (
        <components.Option {...props}>
          <Box
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={"row"}
          >
            <StandardText tabIndex={-1}>
              {formatGroupLabel ? formatGroupLabel(props.data) : props.label}
            </StandardText>
            {props.isSelected && (
              <Icon color={iconColor} icon={faCheck} size={12} />
            )}
          </Box>
        </components.Option>
      );
    }
    return (
      <components.Option {...props}>
        <Row>
          <Space />
          <Box
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={"row"}
            flexGrow={1}
          >
            <SmallText tabIndex={-1}>
              {formatOptionLabel ? formatOptionLabel(props.data) : props.label}
            </SmallText>
            {props.isSelected && (
              <Icon color={iconColor} icon={faCheck} size={12} />
            )}
          </Box>
        </Row>
      </components.Option>
    );
  };

  const MultiValue = (
    option: MultiValueProps<InternalDropdownOption<TData>>
  ) => {
    return !("internalOptions" in option.data) ? (
      <components.MultiValue {...option} />
    ) : null;
  };

  const internalValue = convertValueToInternalValue(options, value);
  const internalOptions = convertGroupedDropdownOptionsToInternalOptions(
    options
  );

  return (
    <Select
      {...selectProps}
      onChange={createOnChange(onChange)}
      hideSelectedOptions={false}
      components={{ ...selectProps.components, MultiValue, Option }}
      isMulti={true}
      options={internalOptions}
      value={internalValue}
      theme={theme}
    />
  );
};
