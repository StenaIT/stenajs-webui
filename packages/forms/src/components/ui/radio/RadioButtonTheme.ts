import { ThemeColorField } from "@stenajs-webui/core";
import { faCircle } from "@fortawesome/pro-light-svg-icons/faCircle";
import { faDotCircle } from "@fortawesome/pro-light-svg-icons/faDotCircle";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface RadioButtonTheme {
  iconColorDisabled: ThemeColorField | string;
  iconChecked: IconDefinition;
  iconCheckedDisabled: IconDefinition;
  iconNotChecked: IconDefinition;
  iconNotCheckedDisabled: IconDefinition;
  iconNotCheckedHover: IconDefinition;
  iconColor: ThemeColorField | string;
  iconColorNotChecked: ThemeColorField | string;
  iconColorNotCheckedHover: ThemeColorField | string;
  iconSize: number;
}

export const defaultRadioButtonTheme: RadioButtonTheme = {
  iconColor: "primaryText",
  iconColorDisabled: "disabledText",
  iconColorNotChecked: "primaryTextLight",
  iconColorNotCheckedHover: "primaryTextLight",
  iconChecked: faDotCircle,
  iconCheckedDisabled: faDotCircle,
  iconNotChecked: faCircle,
  iconNotCheckedHover: faDotCircle,
  iconNotCheckedDisabled: faCircle,
  iconSize: 20
};

export const defaultRadioButtonThemeDark: RadioButtonTheme = {
  iconColor: "#4d7989",
  iconColorDisabled: "disabledText",
  iconColorNotChecked: "#4d7989",
  iconColorNotCheckedHover: "#4d7989",
  iconChecked: faDotCircle,
  iconCheckedDisabled: faDotCircle,
  iconNotChecked: faCircle,
  iconNotCheckedHover: faDotCircle,
  iconNotCheckedDisabled: faCircle,
  iconSize: 20
};
