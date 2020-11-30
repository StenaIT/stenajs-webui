import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { Box, Row, Space, Text } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import {
  ActionMeta,
  components,
  GroupedOptionsType,
  MultiValueProps,
  OptionProps,
  OptionsType,
  SelectComponentsConfig,
} from "react-select";
import {
  defaultSelectTheme,
  SelectTheme,
  selectThemeDark,
} from "../../SelectTheme";
import {
  convertGroupedDropdownOptionsToInternalOptions,
  convertValueToInternalValue,
  createOnChange,
  InternalDropdownOption,
} from "../../util/multiDropdownUtils";
import { Select, SelectProps } from "./Select";

export type OnChangeValue<TData> =
  | OptionsType<DropdownOption<TData>>
  | undefined;

export type OnChange<TData> = (
  value: OnChangeValue<TData>,
  action: ActionMeta<any>
) => void;

export interface DropdownOption<TData> {
  data: TData;
  label: string;
  value: string;
}

export interface GroupedMultiSelectProps<TData>
  extends Omit<
    SelectProps<DropdownOption<TData>>,
    "options" | "onChange" | "value" | "components"
  > {
  /**
   * Same as Select prop `component`but without MultiValue and Option since they can not be modified
   */
  components?: Omit<
    SelectComponentsConfig<DropdownOption<TData>>,
    "MultiValue" | "Option"
  >;
  /**
   * Same as Select prop `options` but only with GroupOptionsType
   */
  options: GroupedOptionsType<DropdownOption<TData>>;
  /**
   * Same as Select prop `onChange` but only with GroupOptionsType
   */
  onChange: OnChange<TData>;
  /**
   * Same as Select prop `value` but only with GroupOptionsType
   */
  value: OptionsType<DropdownOption<TData>> | undefined;
}

const resolveIconColor = (
  theme: SelectTheme,
  isFocused: boolean
): string | undefined =>
  isFocused
    ? theme.menu.selectedItemHoverTextColor
    : theme.menu.selectedItemTextColor;

export const GroupedMultiSelect = <TData extends {}>({
  onChange,
  options,
  value,
  variant = "light",
  formatGroupLabel,
  formatOptionLabel,
  ...selectProps
}: GroupedMultiSelectProps<TData>): React.ReactElement<
  GroupedMultiSelectProps<TData>
> => {
  const theme = variant === "light" ? defaultSelectTheme : selectThemeDark;

  const Option = (props: OptionProps<DropdownOption<TData>>) => {
    if (props.data.internalOptions) {
      return (
        <components.Option {...props}>
          <Box
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={"row"}
          >
            <Text tabIndex={-1}>
              {formatGroupLabel ? formatGroupLabel(props.data) : props.label}
            </Text>
            {props.isSelected && (
              <Icon
                color={resolveIconColor(theme, props.isFocused)}
                icon={faCheck}
                size={12}
              />
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
            <Text size={"small"} tabIndex={-1}>
              {formatOptionLabel ? formatOptionLabel(props.data) : props.label}
            </Text>
            {props.isSelected && (
              <Icon
                color={resolveIconColor(theme, props.isFocused)}
                icon={faCheck}
                size={12}
              />
            )}
          </Box>
        </Row>
      </components.Option>
    );
  };

  const MultiValue = (
    props: MultiValueProps<InternalDropdownOption<TData>>
  ) => {
    return !("internalOptions" in props.data) ? (
      <components.MultiValue {...props} />
    ) : null;
  };

  const internalValue = convertValueToInternalValue(options, value);
  const internalOptions = convertGroupedDropdownOptionsToInternalOptions(
    options
  );

  return (
    <Select<DropdownOption<TData>>
      {...selectProps}
      onChange={createOnChange<TData>(onChange)}
      hideSelectedOptions={false}
      components={{
        ...selectProps.components,
        MultiValue,
        Option,
      }}
      isMulti={true}
      options={internalOptions}
      value={internalValue}
      variant={variant}
    />
  );
};
