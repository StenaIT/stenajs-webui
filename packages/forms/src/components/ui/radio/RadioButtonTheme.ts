import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-regular-svg-icons/faCircle";
import { faCircle as faCircleSolid } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons/faDotCircle";
import { faDotCircle as faDotCircleRegular } from "@fortawesome/free-regular-svg-icons/faDotCircle";
import { ThemeColorField } from "@stenajs-webui/core";

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
  iconNotCheckedHover: faDotCircleRegular,
  iconNotCheckedDisabled: faCircleSolid,
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
  iconNotCheckedHover: faDotCircleRegular,
  iconNotCheckedDisabled: faCircleSolid,
  iconSize: 20
};
