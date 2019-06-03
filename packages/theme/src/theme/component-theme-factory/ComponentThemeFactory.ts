import { defaultDateInputTheme } from "../../../../calendar/src/components/ui/date-time-input/DateInputTheme";
import { defaultFlatButtonTheme } from "../../../../elements/src/components/ui/buttons/FlatButton";
import { defaultSmallButtonTheme } from "../../../../elements/src/components/ui/buttons/SmallButton";
import { defaultStandardButtonTheme } from "../../../../elements/src/components/ui/buttons/StandardButton";
import { defaultCheckboxTheme } from "../../../../forms/src/components/ui/checkbox/CheckboxTheme";
import { defaultRadioButtonTheme } from "../../../../forms/src/components/ui/radio/RadioButtonTheme";
import { defaultSwitchTheme } from "../../../../forms/src/components/ui/switch/SwitchTheme";
import { defaultNumericTextInputTheme } from "../../../../forms/src/components/ui/text-input/NumericTextInputTheme";
import { defaultStandardTextInputTheme } from "../../../../forms/src/components/ui/text-input/StandardTextInputTheme";

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

export const createFlatButtonTheme = createThemeFactory(defaultFlatButtonTheme);
export const createStandardButtonTheme = createThemeFactory(
  defaultStandardButtonTheme
);
export const createSmallButtonTheme = createThemeFactory(
  defaultSmallButtonTheme
);
export const createStandardTextInputTheme = createThemeFactory(
  defaultStandardTextInputTheme
);
export const createNumericTextInputTheme = createThemeFactory(
  defaultNumericTextInputTheme
);
export const createDateInputTheme = createThemeFactory(defaultDateInputTheme);
export const createCheckboxTheme = createThemeFactory(defaultCheckboxTheme);
export const createSwitchTheme = createThemeFactory(defaultSwitchTheme);
export const createRadioButtonTheme = createThemeFactory(
  defaultRadioButtonTheme
);
