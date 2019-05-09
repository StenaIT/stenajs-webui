import { Clickable, Row, Space, StandardText } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";
import { defaultCheckboxTheme } from "./CheckboxTheme";

export interface CheckboxWithLabelProps extends CheckboxProps {
  label?: string;
  textColor?: string;
  disabled?: boolean;
  innerRef?: Ref<HTMLDivElement>;
}

export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = props => {
  const {
    children,
    disabled,
    label,
    onChange, // Do not pass to Checkbox
    innerRef,
    textColor,
    value,
    theme = defaultCheckboxTheme,
    ...propsToCheckbox
  } = props;
  return (
    <div ref={innerRef}>
      <Clickable
        onClick={disabled || !onChange ? undefined : () => onChange(!value)}
      >
        <Row alignItems={"center"}>
          <Checkbox
            {...propsToCheckbox}
            disabled={disabled}
            value={value}
            theme={theme}
          />
          <Space />
          {label && (
            <StandardText
              color={disabled ? theme.iconColorDisabled : textColor}
            >
              {label}
            </StandardText>
          )}
          {children}
        </Row>
      </Clickable>
    </div>
  );
};
