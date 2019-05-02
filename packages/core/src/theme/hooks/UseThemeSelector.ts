import { DependencyList, useMemo } from "react";
import { ThemeFontField, ThemeFontSizeField, ThemeFontSizes } from "../..";
import { Theme } from "../Theme";
import { ThemeColorField, ThemeColors } from "../theme-types/ThemeColors";
import { ThemeFonts } from "../theme-types/ThemeFonts";
import { useTheme } from "./UseTheme";

type ThemeSelectorFunction<T> = (theme: Theme) => T;

export const useThemeSelector = <T>(
  fn: ThemeSelectorFunction<T>,
  deps: DependencyList | undefined
) => {
  const theme = useTheme();
  const memoizedSelector = useMemo(() => fn, deps);
  return useMemo(() => memoizedSelector(theme), [theme, memoizedSelector]);
};

type ThemeFieldRecord<T> = Record<string, T | string>;
type ColorFields = ThemeFieldRecord<ThemeColorField>;
type FontFields = ThemeFieldRecord<ThemeFontField>;
type FontSizesFields = ThemeFieldRecord<ThemeFontSizeField>;

export const useThemeColorSelector = <
  TFields extends {
    colors?: ColorFields;
    fontSizes?: FontFields;
    fonts?: FontSizesFields;
  }
>(
  themeFields: TFields
): TFields => {
  const theme = useTheme();

  const colors = useMemo(() => {
    if (!themeFields.colors) {
      return undefined;
    }
    const fields = Object.keys(themeFields.colors) as Array<
      keyof ThemeColors | string
    >;
    return fields.reduce<ColorFields>(
      (sum, field) => ({
        ...sum,
        [field]: (field && theme.colors[field]) || fields[field]
      }),
      {} as ColorFields
    );
  }, [themeFields.colors, theme]);
  const fonts = useMemo(() => {
    if (!themeFields.fonts) {
      return undefined;
    }
    const fields = Object.keys(themeFields.fonts) as Array<
      keyof ThemeFonts | string
    >;
    return fields.reduce<FontFields>(
      (sum, field) => ({
        ...sum,
        [field]: (field && theme.fonts[field]) || fields[field]
      }),
      {} as FontFields
    );
  }, [themeFields.fonts, theme]);
  const fontSizes = useMemo(() => {
    if (!themeFields.fontSizes) {
      return undefined;
    }
    const fields = Object.keys(themeFields.fontSizes) as Array<
      keyof ThemeFontSizes | string
    >;
    return fields.reduce<FontSizesFields>(
      (sum, field) => ({
        ...sum,
        [field]: (field && theme.fontSizes[field]) || fields[field]
      }),
      {} as FontSizesFields
    );
  }, [themeFields.fontSizes, theme]);
  return {
    colors,
    fonts,
    fontSizes
  } as TFields;
};

const useFieldsFromPartOfTheme = <TThemePart extends keyof Theme>(
  theme: Theme,
  themePart: TThemePart,
  partFields: ThemeFieldRecord<keyof Theme[TThemePart]> | undefined,
) => {
  return useMemo(() => {
    if (!partFields) {
      return undefined;
    }
    const fields = Object.keys(partFields) as Array<
      keyof ThemeFontSizes | string
    >;
    return fields.reduce<FontSizesFields>(
      (sum, field) => ({
        ...sum,
        [field]: (field && theme[themePart][field]) || fields[field]
      }),
      {} as FontSizesFields
    );
  }, [partFields, theme]);
};
