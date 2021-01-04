import * as React from "react";
import { PasswordInput, PasswordInputProps } from "./PasswordInput";
import { Story } from "@storybook/react";

export default {
  title: "forms/PasswordInput",
  component: PasswordInput,
};

export const Demo: Story<PasswordInputProps> = (props) => (
  <PasswordInput {...props} />
);
