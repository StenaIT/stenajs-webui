export interface SwitchTheme {
  backgroundColor: string;
  iconBackgroundColor: string;
  iconColor: string;
  backgroundColorDisabled: string;
  iconBackgroundColorDisabled: string;
  iconColorDisabled: string;
  backgroundColorChecked: string;
  iconBackgroundColorChecked: string;
  iconColorChecked: string;
  width: number;
  height: number;
  borderRadius: number;
}

export const defaultSwitchTheme: SwitchTheme = {
  backgroundColor: "primaryTextLight",
  iconBackgroundColor: "white",
  iconColor: "primaryTextLight",
  backgroundColorDisabled: "inputBorder",
  iconBackgroundColorDisabled: "white",
  iconColorDisabled: "disabledText",
  backgroundColorChecked: "primaryText",
  iconBackgroundColorChecked: "white",
  iconColorChecked: "primaryText",
  width: 40,
  height: 21,
  borderRadius: 4
};

export const defaultSwitchThemeDark: SwitchTheme = {
  backgroundColor: "#b7d1d9",
  backgroundColorChecked: "#b7d1d9",
  backgroundColorDisabled: "inputBorder",
  iconBackgroundColor: "white",
  iconBackgroundColorDisabled: "white",
  iconBackgroundColorChecked: "white",
  iconColor: "#4d7989",
  iconColorDisabled: "disabledText",
  iconColorChecked: "primaryText",
  width: 40,
  height: 21,
  borderRadius: 4
};
