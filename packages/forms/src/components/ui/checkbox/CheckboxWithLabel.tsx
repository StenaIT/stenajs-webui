import { Clickable, Row, Space, StandardText } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { SimpleCheckbox, SimpleCheckboxProps } from "./SimpleCheckbox";
import { defaultSimpleCheckboxTheme } from "./SimpleCheckboxTheme";

export interface CheckboxWithLabelProps extends SimpleCheckboxProps {
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
    onChange, // Do not pass to SimpleCheckbox
    innerRef,
    textColor,
    value,
    theme = defaultSimpleCheckboxTheme,
    ...propsToCheckbox
  } = props;
  return (
    <div ref={innerRef}>
      <Clickable
        onClick={disabled || !onChange ? undefined : () => onChange(!value)}
      >
        <Row alignItems={"center"}>
          <SimpleCheckbox
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
