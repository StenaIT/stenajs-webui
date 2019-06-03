import { defaultDateInputTheme } from "@stenajs-webui/calendar";
import {
  defaultFlatButtonTheme,
  defaultSmallButtonTheme,
  defaultStandardButtonTheme
} from "@stenajs-webui/elements";
import {
  defaultCheckboxTheme,
  defaultNumericTextInputTheme,
  defaultRadioButtonTheme,
  defaultStandardTextInputTheme,
  defaultSwitchTheme
} from "@stenajs-webui/forms";
import { DateInputTheme } from "../../../../calendar/src/components/ui/date-time-input/DateInputTheme";
import { ButtonTheme } from "../../../../elements/src/components/ui/buttons/ButtonTheme";
import { CheckboxTheme } from "../../../../forms/src/components/ui/checkbox/CheckboxTheme";
import { RadioButtonTheme } from "../../../../forms/src/components/ui/radio/RadioButtonTheme";
import { SwitchTheme } from "../../../../forms/src/components/ui/switch/SwitchTheme";
import { NumericTextInputTheme } from "../../../../forms/src/components/ui/text-input/NumericTextInputTheme";
import { StandardTextInputTheme } from "../../../../forms/src/components/ui/text-input/StandardTextInputTheme";

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

export const createCheckboxTheme = createThemeFactory<CheckboxTheme>(
  defaultCheckboxTheme
);

export const createSwitchTheme = createThemeFactory<SwitchTheme>(
  defaultSwitchTheme
);

export const createRadioButtonTheme = createThemeFactory(<RadioButtonTheme>(
  defaultRadioButtonTheme
));
