import * as knobs from "@storybook/addon-knobs";
import * as React from "react";
import { RadioButtonWithLabel } from "@stenajs-webui/forms";

export default {
  title: "forms/RadioButton/RadioButtonWithLabel",
};

export const Standard = () => (
  <RadioButtonWithLabel
    label={"Add cake"}
    checked={knobs.boolean("Checked", false)}
  />
);
