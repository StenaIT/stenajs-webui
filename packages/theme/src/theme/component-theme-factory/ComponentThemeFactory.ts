import {
  ButtonTheme,
  defaultButtonTheme,
  defaultFlatButtonTheme,
  defaultSmallButtonTheme,
  defaultStandardButtonTheme
} from "@stenajs-webui/elements";

const createThemeFactory = <TTheme>(defaultTheme: TTheme) => (
  overridingThemeOrFunc: Partial<TTheme> | ThemeFactoryFunc<TTheme>
): TTheme => {
  if (typeof overridingThemeOrFunc === "function") {
    return overridingThemeOrFunc(defaultTheme);
  }
  return {
    ...defaultTheme,
    ...overridingThemeOrFunc
  };
};

type ThemeFactoryFunc<TTheme> = (defaultTheme: TTheme) => TTheme;

export const createFlatButtonTheme = createThemeFactory<ButtonTheme>(
  defaultFlatButtonTheme
);

export const createButtonTheme = createThemeFactory<ButtonTheme>(
  defaultButtonTheme
);

export const createStandardButtonTheme = createThemeFactory<ButtonTheme>(
  defaultStandardButtonTheme
);

export const createSmallButtonTheme = createThemeFactory<ButtonTheme>(
  defaultSmallButtonTheme
);
