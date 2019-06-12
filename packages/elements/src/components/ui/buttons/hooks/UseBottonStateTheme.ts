import { useThemeFields } from "@stenajs-webui/core";
import { ButtonTheme } from "../ButtonTheme";

export const useButtonStateTheme = (
  buttonTheme: ButtonTheme,
  disabled: boolean
) => {
  const { colors, fontSizes, fonts } = useThemeFields(
    {
      colors: {
        textColor: buttonTheme.textColor,
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
    font: fonts.font
  };
};
