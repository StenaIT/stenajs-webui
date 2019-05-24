import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons/faDotCircle";
import { ThemeColorField } from "@stenajs-webui/core";

export interface RadioButtonTheme {
  iconColorDisabled: ThemeColorField | string;
  iconChecked: IconDefinition;
  iconNotChecked: IconDefinition;
  iconColor: ThemeColorField | string;
  iconColorNotChecked: ThemeColorField | string;
  iconSize: number;
}

export const defaultRadioButtonTheme: RadioButtonTheme = {
  iconColor: "primaryText",
  iconColorDisabled: "disabledText",
  iconColorNotChecked: "primaryText",
  iconChecked: faDotCircle,
  iconNotChecked: faCircle,
  iconSize: 20
};

export const defaultRadioButtonThemeDark: RadioButtonTheme = {
  iconColor: "#4d7989",
  iconColorDisabled: "disabledText",
  iconColorNotChecked: "#4d7989",
  iconChecked: faDotCircle,
  iconNotChecked: faCircle,
  iconSize: 20
};
