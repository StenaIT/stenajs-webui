import {
  Clickable,
  Row,
  Space,
  StandardText,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { Ref, useCallback } from "react";
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
    onValueChange, // Do not pass to Checkbox
    innerRef,
    textColor,
    value,
    theme = defaultCheckboxTheme,
    ...propsToCheckbox
  } = props;

  const { colors } = useThemeFields(
    {
      colors: {
        iconColorDisabled: theme.iconColorDisabled
      }
    },
    [theme]
  );

  const onClickHandler = useCallback(
    ev => {
      if (onChange) {
        onChange(ev);
      }
      if (onValueChange) {
        onValueChange(!value);
      }
    },
    [onChange, onValueChange, value]
  );

  return (
    <div ref={innerRef}>
      <Clickable onClick={onClickHandler}>
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
              color={disabled ? colors.iconColorDisabled : textColor}
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
