import * as React from "react";
import { Button, ButtonProps } from "./Button";
import {
  DepricatedButtonTheme,
  defaultButtonTheme
} from "./DepricatedButtonTheme";

export const FlatButton: React.FC<ButtonProps> = ({
  buttonTheme = defaultFlatButtonTheme,
  ...buttonProps
}) => <Button buttonTheme={buttonTheme} {...buttonProps} />;

export const defaultFlatButtonTheme: DepricatedButtonTheme = {
  ...defaultButtonTheme,
  bgColor: "transparent",
  bgColorDisabled: "transparent",
  textColor: "primaryText",
  textColorDisabled: "disabledText",
  loadingTextColor: "primaryText",
  loadingSpinnerColor: "primaryText",
  successIconColor: "primaryText",
  successTextColor: "primaryText"
};
