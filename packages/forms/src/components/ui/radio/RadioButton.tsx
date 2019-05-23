import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Clickable, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { ChangeEvent, useCallback } from "react";
import { FullOnChangeProps } from "../types";
import { defaultRadioButtonTheme, RadioButtonTheme } from "./RadioButtonTheme";

export interface RadioButtonProps
  extends FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>> {
  disabled?: boolean;
  theme?: RadioButtonTheme;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  disabled,
  onChange,
  onValueChange,
  theme = defaultRadioButtonTheme,
  value
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        iconColorDisabled: theme.iconColorDisabled,
        iconColor: theme.iconColor,
        iconColorNotChecked: theme.iconColorNotChecked
      }
    },
    [theme]
  );

  const icon: IconProp = value ? theme.iconChecked : theme.iconNotChecked;

  const onClickHandler = useCallback(
    ev => {
      if (onChange) {
        onChange(ev);
      }
      if (onValueChange) {
        onValueChange(true);
      }
    },
    [onChange, onValueChange]
  );
  if (disabled) {
    return (
      <FontAwesomeIcon
        color={colors.iconColorDisabled}
        icon={icon}
        style={{ fontSize: theme.iconSize }}
      />
    );
  }
  return (
    <Clickable onClick={onClickHandler}>
      <FontAwesomeIcon
        color={value ? colors.iconColor : colors.iconColorNotChecked}
        icon={icon}
        style={{ fontSize: theme.iconSize }}
      />
    </Clickable>
  );
};
