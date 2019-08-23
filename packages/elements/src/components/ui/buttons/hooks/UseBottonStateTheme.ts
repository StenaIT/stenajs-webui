import { ThemeColorField, useThemeFields } from "@stenajs-webui/core";
import { ButtonTheme } from "../ButtonTheme";

export const useButtonStateTheme = (
  buttonTheme: ButtonTheme,
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
        loadingTextColor: buttonTheme.loadingTextColor
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
    [buttonTheme]
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
    fontWeight: fontWeights.fontWeight
  };
};
