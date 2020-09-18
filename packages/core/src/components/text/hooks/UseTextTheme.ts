import { useThemeSelector } from "../../../theme/hooks/UseThemeSelector";
import { TextBaseProps, TextThemeProps } from "../TextBase";

export const useTextTheme = ({
  fontFamily,
  fontSize,
  fontWeight,
}: TextThemeProps) =>
  useThemeSelector<Partial<TextBaseProps>>(
    (theme) => ({
      fontSize: (fontSize && theme.fontSizes[fontSize]) || fontSize,
      fontFamily: (fontFamily && theme.fonts[fontFamily]) || fontFamily,
      fontWeight: (fontWeight && theme.fontWeights[fontWeight]) || fontWeight,
    }),
    [fontFamily, fontSize, fontWeight]
  );
