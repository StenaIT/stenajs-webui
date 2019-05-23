import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons/faDotCircle";
import { ThemeColorField } from "@stenajs-webui/core";

export interface RadioButtonTheme {
  iconColorDisabled: ThemeColorField | string;
  textColorDisabled: ThemeColorField | string;
  iconChecked: IconDefinition;
  iconNotChecked: IconDefinition;
  iconColor: ThemeColorField | string;
  iconColorNotChecked: ThemeColorField | string;
  iconSize: number;
  textColor: ThemeColorField | string;
  textSize: string;
}

export const defaultRadioButtonTheme: RadioButtonTheme = {
  iconColor: "primaryText",
  iconColorDisabled: "disabledText",
  iconColorNotChecked: "primaryText",
  iconChecked: faDotCircle,
  iconNotChecked: faCircle,
  textColor: "primaryText",
  textColorDisabled: "disabledText",
  iconSize: 20,
  textSize: "normal"
};

export const defaultRadioButtonThemeDark: RadioButtonTheme = {
  iconChecked: faDotCircle,
  iconNotChecked: faCircle,
  iconColorNotChecked: "#4d7989",
  iconColorDisabled: "disabledText",
  textColorDisabled: "disabledText",
  iconColor: "#4d7989",
  iconSize: 20,
  textColor: "#4d7989",
  textSize: "normal"
};
