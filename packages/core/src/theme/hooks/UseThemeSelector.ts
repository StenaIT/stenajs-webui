import { DependencyList, useMemo } from "react";
import {
  ThemeFontWeightField,
  ThemeFontWeights
} from "../theme-types/ThemeFontWeights";
import { Theme } from "../Theme";
import { ThemeColorField, ThemeColors } from "../theme-types/ThemeColors";
import { ThemeFontField, ThemeFonts } from "../theme-types/ThemeFonts";
import {
  ThemeFontSizeField,
  ThemeFontSizes
} from "../theme-types/ThemeFontSizes";
import { useTheme } from "./UseTheme";

type ThemeSelectorFunction<T> = (theme: Theme) => T;

export const useThemeSelector = <T>(
  fn: ThemeSelectorFunction<T>,
  deps: DependencyList | undefined
) => {
  const theme = useTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedSelector = useMemo(() => fn, deps);
  return useMemo(() => memoizedSelector(theme), [theme, memoizedSelector]);
};

type ThemeFieldRecord<T> = Record<string, T | string | undefined>;
type ColorFields = ThemeFieldRecord<ThemeColorField>;
type FontFields = ThemeFieldRecord<ThemeFontField>;
type FontSizesFields = ThemeFieldRecord<ThemeFontSizeField>;
type FontWeightFields = ThemeFieldRecord<ThemeFontWeightField>;

export type ThemeSelectorFields = {
  colors?: ColorFields;
  fontSizes?: FontFields;
  fontWeights?: FontWeightFields;
  fonts?: FontSizesFields;
};

export const useThemeFields = <TFields extends ThemeSelectorFields>(
  themeFields: TFields,
  deps: DependencyList
): TFields => {
  const theme = useTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fields = useMemo(() => themeFields, deps);

  return useMemo(() => {
    const colors = getFieldsFromPartOfTheme(theme.colors, fields.colors);
    const fonts = getFieldsFromPartOfTheme(theme.fonts, fields.fonts);
    const fontSizes = getFieldsFromPartOfTheme(
      theme.fontSizes,
      fields.fontSizes
    );
    const fontWeights = getFieldsFromPartOfTheme(
      theme.fontWeights,
      fields.fontWeights
    );
    return {
      colors,
      fonts,
      fontSizes,
      fontWeights
    } as TFields;
  }, [theme, fields]);
};

const getFieldsFromPartOfTheme = <
  TThemePart extends
    | ThemeColors
    | ThemeFonts
    | ThemeFontSizes
    | ThemeFontWeights,
  TFields extends ThemeFieldRecord<keyof TThemePart>
>(
  themePart: TThemePart,
  partFields: TFields | undefined
): TFields | undefined | {} => {
  if (!partFields) {
    return undefined;
  }
  const fieldNames = Object.keys(partFields);
  return fieldNames.reduce((sum, fieldName) => {
    const fieldValue = partFields[fieldName];
    return {
      ...sum,
      [fieldName]:
        (fieldValue && themePart[fieldValue as keyof TThemePart]) || fieldValue
    };
  }, {});
};
