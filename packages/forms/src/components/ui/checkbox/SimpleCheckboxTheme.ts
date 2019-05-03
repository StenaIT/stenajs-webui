import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

export interface SimpleCheckboxTheme {
  borderColor: string;
  borderColorDisabled: string;
  borderColorFocused: string;
  borderColorChecked: string;
  backgroundColor: string;
  backgroundColorDisabled: string;
  backgroundColorChecked: string;
  iconColor: string;
  iconColorDisabled: string;
  iconColorChecked: string;
  checkIcon: IconProp;
  width: string;
  height: string;
  borderRadius: string;
  iconSize: number;
}

export const defaultSimpleCheckboxTheme: SimpleCheckboxTheme = {
  backgroundColor: "white",
  borderColor: "inputBorder",
  iconColor: "primaryText",
  backgroundColorDisabled: "#f1f1f1",
  borderColorDisabled: "inputBorder",
  iconColorDisabled: "disabledText",
  backgroundColorChecked: "white",
  borderColorChecked: "inputBorder",
  iconColorChecked: "primaryText",
  borderColorFocused: "inputBorderFocused",
  checkIcon: faCheck,
  width: "22px",
  height: "22px",
  borderRadius: "4px",
  iconSize: 10
};

export const defaultSimpleCheckboxThemeDark: SimpleCheckboxTheme = {
  backgroundColor: "#b7d1d9",
  borderColor: "transparent",
  iconColor: "#4d7989",
  backgroundColorDisabled: "#f1f1f1",
  borderColorDisabled: "inputBorder",
  iconColorDisabled: "disabledText",
  backgroundColorChecked: "#b7d1d9",
  borderColorChecked: "inputBorder",
  iconColorChecked: "primaryText",
  borderColorFocused: "inputBorderFocused",
  checkIcon: faCheck,
  width: "22px",
  height: "22px",
  borderRadius: "4px",
  iconSize: 10
};
