import { Row, Space, Text, TextSize } from "@stenajs-webui/core";
import {
  Icon,
  stenaCheck,
  stenaTimes,
  TextInputButton,
} from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode } from "react";
import {
  ActionMeta,
  ClearIndicatorProps,
  components,
  GroupBase,
  MultiValueProps,
  OnChangeValue,
  OptionProps,
  Options,
} from "react-select";
import { defaultSelectTheme, SelectTheme } from "../../SelectTheme";
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

function formatInnerOptionLabel<TData>(
  props: OptionProps<
    InternalDropdownOption<TData>,
    true,
    GroupBase<InternalDropdownOption<TData>>
  >
) {
  const { formatGroupLabel, formatOptionLabel } = props.selectProps;

  if ("internalOptions" in props.data) {
    return formatGroupLabel
      ? formatGroupLabel({
          label: props.data.label,
          options: props.data.internalOptions,
        })
      : props.label;
  }

  return formatOptionLabel
    ? formatOptionLabel(props.data, {
        context: "menu",
        inputValue: props.selectProps.inputValue ?? "",
        selectValue: props.getValue(),
      })
    : props.label;
}

export function GroupedMultiSelect<TData>({
  onChange,
  options,
  value,
  variant = "standard",
  formatGroupLabel,
  formatOptionLabel,
  ...selectProps
}: GroupedMultiSelectProps<TData>): React.ReactElement<
  GroupedMultiSelectProps<TData>
> {
  const Option = (
    props: OptionProps<
      InternalDropdownOption<TData>,
      true,
      GroupBase<InternalDropdownOption<TData>>
    >
  ) => {
    const label = formatInnerOptionLabel(props);
    const isGroupOption = "internalOptions" in props.data;

    return (
      <components.Option {...props}>
        <Row>
          {!isGroupOption && <Space />}
          <InnerOption
            theme={defaultSelectTheme}
            size={!isGroupOption ? "small" : undefined}
            label={label}
            selected={props.isSelected}
            focused={props.isFocused}
          />
        </Row>
      </components.Option>
    );
  };

  const ClearIndicator = (
    props: ClearIndicatorProps<
      InternalDropdownOption<TData>,
      true,
      GroupBase<InternalDropdownOption<TData>>
    >
  ) => {
    return (
      <TextInputButton
        variant={"error"}
        icon={stenaTimes}
        onClick={props.clearValue}
      />
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
        ClearIndicator,
        MultiValue,
        Option,
      }}
      isMulti={true}
      options={internalOptions}
      value={internalValue}
      variant={variant}
    />
  );
}

interface InnerOptionProps {
  size?: TextSize;
  selected: boolean;
  theme: SelectTheme;
  label: ReactNode;
  focused: boolean;
}

const InnerOption: React.VFC<InnerOptionProps> = ({
  focused,
  label,
  selected,
  size,
  theme,
}) => (
  <Row alignItems={"center"} justifyContent={"space-between"} flexGrow={1}>
    <Text tabIndex={-1} size={size} color={"currentColor"}>
      {label}
    </Text>
    {selected && (
      <Icon
        color={resolveIconColor(theme, focused)}
        icon={stenaCheck}
        size={12}
      />
    )}
  </Row>
);
