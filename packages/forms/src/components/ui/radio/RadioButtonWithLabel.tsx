import {
  Box,
  Clickable,
  Space,
  StandardText,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { useCallback } from "react";
import { RadioButton, RadioButtonProps } from "./RadioButton";
import { defaultRadioButtonTheme, RadioButtonTheme } from "./RadioButtonTheme";

export interface RadioButtonWithLabelProps extends RadioButtonProps {
  disabled?: boolean;
  label: string;
  theme?: RadioButtonTheme;
}

export const RadioButtonWithLabel: React.FC<RadioButtonWithLabelProps> = ({
  disabled,
  label,
  theme = defaultRadioButtonTheme,
  value,
  onChange,
  onValueChange
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        textColorDisabled: theme.textColorDisabled,
        textColor: theme.textColor
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
    <Clickable onClick={onClickHandler}>
      <Box row alignItems={"center"}>
        <RadioButton {...{ theme }} value={value} />
        <Space />
        <StandardText
          color={disabled ? colors.textColorDisabled : colors.textColor}
          fontSize={theme.textSize}
        >
          {label}
        </StandardText>
      </Box>
    </Clickable>
  );
};
