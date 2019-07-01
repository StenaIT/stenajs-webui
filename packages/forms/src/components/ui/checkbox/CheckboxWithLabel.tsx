import {
  Row,
  Space,
  StandardText,
  ThemeColorField,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";
import { defaultCheckboxTheme } from "./CheckboxTheme";

export interface CheckboxWithLabelProps extends CheckboxProps {
  label?: string;
  textColor?: ThemeColorField | string;
}

export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = props => {
  const {
    children,
    disabled,
    label,
    innerRef,
    textColor,
    theme = defaultCheckboxTheme,
    ...propsToCheckbox
  } = props;

  const { colors } = useThemeFields(
    {
      colors: {
        textColor: textColor,
        iconColorDisabled: theme.iconColorDisabled
      }
    },
    [theme, textColor]
  );

  return (
    <div ref={innerRef}>
      <label>
        <Row alignItems={"center"}>
          <Checkbox {...propsToCheckbox} disabled={disabled} theme={theme} />
          <Space />
          {label && (
            <StandardText
              color={disabled ? colors.iconColorDisabled : colors.textColor}
            >
              {label}
            </StandardText>
          )}
          {children}
        </Row>
      </label>
    </div>
  );
};
