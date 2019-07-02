import {
  Box,
  Space,
  StandardText,
  ThemeColorField,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { Switch, SwitchProps } from "./Switch";
import { defaultSwitchTheme } from "./SwitchTheme";

export interface SwitchWithLabelProps extends SwitchProps {
  label: string;
  textColor?: ThemeColorField | string;
  innerRef?: Ref<HTMLDivElement>;
}

export const SwitchWithLabel: React.FC<SwitchWithLabelProps> = ({
  label,
  theme = defaultSwitchTheme,
  disabled,
  innerRef,
  textColor,
  ...switchProps
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        textColorDisabled: theme.iconColorDisabled,
        textColor: textColor
      }
    },
    [theme, textColor]
  );

  return (
    <div ref={innerRef}>
      <label>
        <Box row alignItems={"center"}>
          <Switch theme={theme} disabled={disabled} {...switchProps} />
          <Space />
          <StandardText
            userSelect={"none"}
            color={disabled ? colors.textColorDisabled : colors.textColor}
          >
            {label}
          </StandardText>
        </Box>
      </label>
    </div>
  );
};
