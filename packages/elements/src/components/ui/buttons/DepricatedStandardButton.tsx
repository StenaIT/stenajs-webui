import * as React from "react";
import { Button, ButtonProps } from "./Button";
import {
  DepricatedButtonTheme,
  defaultButtonTheme
} from "./DepricatedButtonTheme";

export const DepricatedStandardButton: React.FC<ButtonProps> = ({
  buttonTheme = defaultStandardButtonTheme,
  ...buttonProps
}) => <Button buttonTheme={buttonTheme} {...buttonProps} />;

export const defaultStandardButtonTheme: DepricatedButtonTheme = {
  ...defaultButtonTheme,
  borderRadius: "5px"
};
