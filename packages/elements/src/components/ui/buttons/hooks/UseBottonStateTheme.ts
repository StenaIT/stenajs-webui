import { ThemeColorField, useThemeFields } from "@stenajs-webui/core";
import { DepricatedButtonTheme } from "../DepricatedButtonTheme";

export const useButtonStateTheme = (
  buttonTheme: DepricatedButtonTheme,
  textColor: ThemeColorField | string | undefined,
  disabled: boolean
) => {
  const { colors, fontSizes, fontWeights, fonts } = useThemeFields(
    {
      colors: {
        textColor: textColor || buttonTheme.textColor,
        textColorDisabled: buttonTheme.textColorDisabled,
        bgColor: buttonTheme.bgColor,
        bgColorDisabled: buttonTheme.bgColorDisabled,
        successIconColor: buttonTheme.successIconColor,
        successTextColor: buttonTheme.successTextColor,
        loadingSpinnerColor: buttonTheme.loadingSpinnerColor,
        loadingTextColor: buttonTheme.loadingTextColor,
        borderColor: buttonTheme.borderColor,
        borderColorDisabled: buttonTheme.borderColorDisabled
      },
      fontSizes: {
        fontSize: buttonTheme.fontSize
      },
      fonts: {
        font: buttonTheme.font
      },
      fontWeights: {
        fontWeight: buttonTheme.fontWeight
      }
    },
    [buttonTheme, textColor]
  );
  return {
    textColor: disabled ? colors.textColorDisabled : colors.textColor,
    bgColor: disabled ? colors.bgColorDisabled : colors.bgColor,
    successIconColor: colors.successIconColor,
    successTextColor: colors.successTextColor,
    loadingSpinnerColor: colors.loadingSpinnerColor,
    loadingTextColor: colors.loadingTextColor,
    fontSize: fontSizes.fontSize,
    font: fonts.font,
    fontWeight: fontWeights.fontWeight,
    borderColor: disabled ? colors.borderColorDisabled : colors.borderColor
  };
};
