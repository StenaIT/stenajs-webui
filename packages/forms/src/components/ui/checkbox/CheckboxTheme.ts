import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { ThemeColorField } from "@stenajs-webui/core";

export interface CheckboxTheme {
  borderColorFocused: ThemeColorField | string;
  borderColorChecked: ThemeColorField | string;
  borderColorIndeterminate: ThemeColorField | string;
  borderColorNotChecked: ThemeColorField | string;
  borderColorNotCheckedHover: ThemeColorField | string;
  borderColorDisabled: ThemeColorField | string;
  backgroundColorNotChecked: ThemeColorField | string;
  backgroundColorNotCheckedHover: ThemeColorField | string;
  backgroundColorDisabled: ThemeColorField | string;
  backgroundColorChecked: ThemeColorField | string;
  backgroundColorIndeterminate: ThemeColorField | string;
  iconColorChecked: ThemeColorField | string;
  iconColorIndeterminate: ThemeColorField | string;
  iconColorNotChecked: ThemeColorField | string;
  iconColorNotCheckedHover: ThemeColorField | string;
  iconColorDisabled: ThemeColorField | string;
  checkIcon: IconDefinition;
  indeterminateIcon: IconDefinition;
  width: string;
  height: string;
  borderRadius: string;
  iconSize: number;
}

export const defaultCheckboxTheme: CheckboxTheme = {
  backgroundColorChecked: "primaryText",
  backgroundColorIndeterminate: "primaryText",
  backgroundColorNotChecked: "white",
  backgroundColorNotCheckedHover: "white",
  backgroundColorDisabled: "disabledBackground",
  borderColorNotChecked: "primaryText",
  borderColorNotCheckedHover: "primaryText",
  borderColorDisabled: "transparent",
  borderColorChecked: "primaryText",
  borderColorIndeterminate: "primaryText",
  borderColorFocused: "primaryText",
  iconColorNotChecked: "primaryText",
  iconColorNotCheckedHover: "primaryTextLight",
  iconColorDisabled: "disabledText",
  iconColorChecked: "white",
  iconColorIndeterminate: "white",
  checkIcon: faCheck,
  indeterminateIcon: faMinus,
  width: "22px",
  height: "22px",
  borderRadius: "4px",
  iconSize: 10
};

export const defaultCheckboxThemeDark: CheckboxTheme = {
  backgroundColorChecked: "#b7d1d9",
  backgroundColorIndeterminate: "#b7d1d9",
  backgroundColorNotChecked: "#b7d1d9",
  backgroundColorNotCheckedHover: "#b7d1d9",
  backgroundColorDisabled: "#f1f1f1",

  borderColorChecked: "transparent",
  borderColorIndeterminate: "transparent",
  borderColorNotChecked: "transparent",
  borderColorNotCheckedHover: "transparent",
  borderColorDisabled: "transparent",
  borderColorFocused: "transparent",

  iconColorChecked: "primaryText",
  iconColorIndeterminate: "primaryText",
  iconColorNotChecked: "#4d7989",
  iconColorNotCheckedHover: "primaryTextLight",
  iconColorDisabled: "disabledText",
  checkIcon: faCheck,
  indeterminateIcon: faMinus,
  width: "22px",
  height: "22px",
  borderRadius: "4px",
  iconSize: 10
};
