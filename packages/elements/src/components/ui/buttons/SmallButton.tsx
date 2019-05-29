import * as React from "react";
import { Button, ButtonProps } from "./Button";
import { ButtonTheme, defaultButtonTheme } from "./ButtonTheme";

export const SmallButton: React.FC<ButtonProps> = ({
  buttonTheme = defaultSmallButtonTheme,
  ...buttonProps
}) => <Button buttonTheme={buttonTheme} {...buttonProps} />;

export const defaultSmallButtonTheme: ButtonTheme = {
  ...defaultButtonTheme,
  height: "28px",
  borderRadius: "3px"
};
