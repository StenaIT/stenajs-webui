import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { ThemeColorField } from "@stenajs-webui/core";

export interface CheckboxTheme {
  borderColor: ThemeColorField | string;
  borderColorDisabled: ThemeColorField | string;
  borderColorFocused: ThemeColorField | string;
  borderColorChecked: ThemeColorField | string;
  backgroundColor: ThemeColorField | string;
  backgroundColorDisabled: ThemeColorField | string;
  backgroundColorChecked: ThemeColorField | string;
  iconColor: ThemeColorField | string;
  iconColorDisabled: ThemeColorField | string;
  iconColorChecked: ThemeColorField | string;
  checkIcon: IconProp;
  width: string;
  height: string;
  borderRadius: string;
  iconSize: number;
}

export const defaultCheckboxTheme: CheckboxTheme = {
  backgroundColor: "white",
  backgroundColorDisabled: "#f1f1f1",
  backgroundColorChecked: "white",
  borderColor: "inputBorder",
  borderColorDisabled: "transparent",
  borderColorChecked: "inputBorder",
  borderColorFocused: "inputBorderFocused",
  iconColor: "primaryText",
  iconColorDisabled: "disabledText",
  iconColorChecked: "primaryText",
  checkIcon: faCheck,
  width: "22px",
  height: "22px",
  borderRadius: "4px",
  iconSize: 10
};

export const defaultCheckboxThemeDark: CheckboxTheme = {
  backgroundColor: "#b7d1d9",
  borderColor: "transparent",
  iconColor: "#4d7989",
  backgroundColorDisabled: "#f1f1f1",
  borderColorDisabled: "transparent",
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
