import * as React from "react";
import { Button, ButtonProps } from "./Button";
import { ButtonTheme, defaultButtonTheme } from "./ButtonTheme";

export const StandardButton: React.FC<ButtonProps> = ({
  buttonTheme = defaultStandardButtonTheme,
  ...buttonProps
}) => <Button buttonTheme={buttonTheme} {...buttonProps} />;

export const defaultStandardButtonTheme: ButtonTheme = {
  ...defaultButtonTheme,
  borderRadius: "5px"
};
