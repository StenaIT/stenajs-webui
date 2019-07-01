import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { ThemeColorField } from '@stenajs-webui/core';

export interface CheckboxTheme {
  borderColorFocused: ThemeColorField | string;
  borderColorChecked: ThemeColorField | string;
  borderColorNotChecked: ThemeColorField | string;
  borderColorNotCheckedHover: ThemeColorField | string;
  borderColorDisabled: ThemeColorField | string;
  backgroundColorNotChecked: ThemeColorField | string;
  backgroundColorNotCheckedHover: ThemeColorField | string;
  backgroundColorDisabled: ThemeColorField | string;
  backgroundColorChecked: ThemeColorField | string;
  iconColorChecked: ThemeColorField | string;
  iconColorNotChecked: ThemeColorField | string;
  iconColorNotCheckedHover: ThemeColorField | string;
  iconColorDisabled: ThemeColorField | string;
  checkIcon: IconDefinition;
  width: string;
  height: string;
  borderRadius: string;
  iconSize: number;
}

export const defaultCheckboxTheme: CheckboxTheme = {
  backgroundColorChecked: "primaryText",
  backgroundColorNotChecked: "white",
  backgroundColorNotCheckedHover: "white",
  backgroundColorDisabled: "#f1f1f1",
  borderColorNotChecked: "primaryText",
  borderColorNotCheckedHover: "primaryText",
  borderColorDisabled: "transparent",
  borderColorChecked: "primaryText",
  borderColorFocused: "primaryText",
  iconColorNotChecked: "primaryText",
  iconColorNotCheckedHover: 'primaryTextLight',
  iconColorDisabled: "disabledText",
  iconColorChecked: "white",
  checkIcon: faCheck,
  width: "22px",
  height: "22px",
  borderRadius: "4px",
  iconSize: 10
};

export const defaultCheckboxThemeDark: CheckboxTheme = {
  backgroundColorChecked: "#b7d1d9",
  backgroundColorNotChecked: "#b7d1d9",
  backgroundColorNotCheckedHover: "#b7d1d9",
  backgroundColorDisabled: "#f1f1f1",

  borderColorChecked: "transparent",
  borderColorNotChecked: "transparent",
  borderColorNotCheckedHover: "transparent",
  borderColorDisabled: "transparent",
  borderColorFocused: "transparent",

  iconColorChecked: "primaryText",
  iconColorNotChecked: "#4d7989",
  iconColorNotCheckedHover: 'primaryTextLight',
  iconColorDisabled: "disabledText",
  checkIcon: faCheck,
  width: "22px",
  height: "22px",
  borderRadius: "4px",
  iconSize: 10
};
