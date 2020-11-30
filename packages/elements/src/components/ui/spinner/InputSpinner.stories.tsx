import * as React from "react";
import { InputSpinner, InputSpinnerProps } from "./InputSpinner";
import { Story } from "@storybook/react";
import { colorListControl } from "../../../storybook-helpers/storybook-controls";

export default {
  title: "elements/InputSpinner",
  components: InputSpinner,
  argTypes: {
    color: colorListControl,
  },
};

export const Overview: Story<InputSpinnerProps> = (props) => (
  <InputSpinner {...props} />
);
