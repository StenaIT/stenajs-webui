import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { Box, Row, Space, Text } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import {
  ActionMeta,
  components,
  GroupBase,
  MultiValueProps,
  OnChangeValue,
  OptionProps,
  Options,
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
  GroupedOptionsType,
  InternalDropdownOption,
} from "../../util/multiDropdownUtils";
import { DropdownOption } from "./GroupedMultiSelectTypes";
import {
  MultiSelect,
  MultiSelectComponentsConfig,
  MultiSelectProps,
} from "./MultiSelect";

export type OnChange<TData> = (
  value: OnChangeValue<DropdownOption<TData>, true>,
  action: ActionMeta<any>
) => void;

export interface GroupedMultiSelectProps<TData>
  extends Omit<
    MultiSelectProps<InternalDropdownOption<TData>>,
    "options" | "onChange" | "value" | "components"
  > {
  /**
   * Same as Select prop `component` but without MultiValue and Option since they can not be modified
   */
  components?: Omit<
    MultiSelectComponentsConfig<InternalDropdownOption<TData>>,
    "MultiValue" | "Option"
  >;
  /**
   * Same as Select prop `options` but only with GroupOptionsType
   */
  options?: GroupedOptionsType<DropdownOption<TData>>;
  /**
   * Same as Select prop `onChange` but only with GroupOptionsType
   */
  onChange?: OnChange<TData>;
  /**
   * Same as Select prop `value` but only with GroupOptionsType
   */
  value?: Options<DropdownOption<TData>> | undefined;
}

const resolveIconColor = (
  theme: SelectTheme,
  isFocused: boolean
): string | undefined =>
  isFocused
    ? theme.menu.selectedItemHoverIconColor
    : theme.menu.selectedItemIconColor;

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

  const Option = (
    props: OptionProps<
      InternalDropdownOption<TData>,
      true,
      GroupBase<InternalDropdownOption<TData>>
    >
  ) => {
    if ("internalOptions" in props.data) {
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
            <Text
              size={"small"}
              tabIndex={-1}
              color={
                props.isSelected ? theme.menu.selectedItemTextColor : undefined
              }
            >
              {formatOptionLabel
                ? formatOptionLabel(props.data, {
                    context: "menu",
                    inputValue: selectProps.inputValue ?? "",
                    selectValue: props.getValue(),
                  })
                : props.label}
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
    props: MultiValueProps<
      InternalDropdownOption<TData>,
      true,
      GroupBase<InternalDropdownOption<TData>>
    >
  ) => {
    return !("internalOptions" in props.data) ? (
      <components.MultiValue {...props} />
    ) : null;
  };

  const internalValue = options
    ? convertValueToInternalValue(options, value)
    : undefined;
  const internalOptions = options
    ? convertGroupedDropdownOptionsToInternalOptions(options)
    : undefined;

  return (
    <MultiSelect<InternalDropdownOption<TData>>
      {...selectProps}
      onChange={onChange ? createOnChange<TData>(onChange) : undefined}
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
