import * as React from "react";
import { memo, ReactElement } from "react";
import {
  MultiSelect,
  MultiSelectOption,
  MultiSelectProps,
} from "./MultiSelect";
import { components, ValueContainerProps } from "react-select";

export function OverflowingMultiSelect<T extends MultiSelectOption>(
  props: MultiSelectProps<T>,
) {
  return (
    <MultiSelect
      hideSelectedOptions={false}
      {...props}
      components={{
        ...props.components,
        ValueContainer: FirstValueOnlyValueContainer,
      }}
    />
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */

const FirstValueOnlyValueContainer = memo(
  (props: ValueContainerProps<any, true>) => {
    const [prevOptions, ...restChildren] = props.children as [
      ReactElement[] | null | undefined,
      ReactElement[] | null | undefined,
    ];

    const options = getOptionsToRender(prevOptions, props);

    return (
      <components.ValueContainer {...props}>
        {options}
        {restChildren}
      </components.ValueContainer>
    );
  },
);

const getOptionsToRender = (
  optionElements: ReactElement[] | null | undefined,
  {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    children,
    innerProps,
    className,
    ...spreadProps
  }: ValueContainerProps<any, true>,
) => {
  if (!optionElements) {
    return null;
  }

  if (optionElements.length > 1) {
    return [
      optionElements[0],
      <components.MultiValue
        {...spreadProps}
        key={"DUMMY_VALUE_FOR_PLUS_X"}
        innerProps={{}}
        data={null}
        isFocused={false}
        removeProps={{}}
        index={1}
        components={{
          Container: components.MultiValueContainer,
          Label: components.MultiValueLabel,
          Remove: () => <div style={{ height: 16, margin: 3, marginTop: 4 }} />,
        }}
      >
        {"+" + (optionElements.length - 1)}
      </components.MultiValue>,
    ];
  } else {
    return optionElements;
  }
};
