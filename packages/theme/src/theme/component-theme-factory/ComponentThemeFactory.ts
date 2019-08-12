import {
  DateInputTheme,
  DateTextInputTheme,
  defaultDateInputTheme,
  defaultDateTextInputTheme
} from "@stenajs-webui/calendar";
import {
  ButtonTheme,
  defaultButtonTheme,
  defaultFlatButtonTheme,
  defaultSmallButtonTheme,
  defaultStandardButtonTheme
} from "@stenajs-webui/elements";
import {
  CheckboxTheme,
  defaultCheckboxTheme,
  defaultNumericTextInputTheme,
  defaultRadioButtonTheme,
  defaultStandardTextInputTheme,
  defaultSwitchTheme,
  NumericTextInputTheme,
  RadioButtonTheme,
  StandardTextInputTheme,
  SwitchTheme
} from "@stenajs-webui/forms";

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

export const createButtonTheme = createThemeFactory(<ButtonTheme>(
  defaultButtonTheme
));

export const createStandardButtonTheme = createThemeFactory(<ButtonTheme>(
  defaultStandardButtonTheme
));

export const createSmallButtonTheme = createThemeFactory(<ButtonTheme>(
  defaultSmallButtonTheme
));

export const createStandardTextInputTheme = createThemeFactory(<
  StandardTextInputTheme
>defaultStandardTextInputTheme);

export const createNumericTextInputTheme = createThemeFactory(<
  NumericTextInputTheme
>defaultNumericTextInputTheme);

export const createDateInputTheme = createThemeFactory<DateInputTheme>(
  defaultDateInputTheme
);

export const createDateTextInputTheme = createThemeFactory<DateTextInputTheme>(
  defaultDateTextInputTheme
);

export const createCheckboxTheme = createThemeFactory<CheckboxTheme>(
  defaultCheckboxTheme
);

export const createSwitchTheme = createThemeFactory<SwitchTheme>(
  defaultSwitchTheme
);

export const createRadioButtonTheme = createThemeFactory(<RadioButtonTheme>(
  defaultRadioButtonTheme
));
