import * as React from "react";
import { Button, ButtonProps } from "./Button";
import { ButtonTheme, defaultButtonTheme } from "./ButtonTheme";

export const FlatButton: React.FC<ButtonProps> = ({
  buttonTheme = defaultFlatButtonTheme,
  ...buttonProps
}) => <Button buttonTheme={buttonTheme} {...buttonProps} />;

export const defaultFlatButtonTheme: ButtonTheme = {
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
