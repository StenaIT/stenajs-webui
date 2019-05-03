import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Clickable } from "@stenajs-webui/core";
import * as React from "react";
import { ValueOnChangeProps } from "../types";
import { defaultRadioButtonTheme, RadioButtonTheme } from "./RadioButtonTheme";

export interface RadioButtonProps extends ValueOnChangeProps<boolean> {
  disabled?: boolean;
  theme?: RadioButtonTheme;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  disabled,
  onChange,
  theme = defaultRadioButtonTheme,
  value
}) => {
  const icon: IconProp = value ? theme.iconChecked : theme.iconNotChecked;

  if (disabled || !onChange) {
    return (
      <FontAwesomeIcon
        color={theme.iconColorDisabled}
        icon={icon}
        style={{ fontSize: theme.iconSize }}
      />
    );
  }
  return (
    <Clickable onClick={() => onChange(!value)}>
      <FontAwesomeIcon
        color={value ? theme.iconColor : theme.iconColorNotChecked}
        icon={icon}
        style={{ fontSize: theme.iconSize }}
      />
    </Clickable>
  );
};
