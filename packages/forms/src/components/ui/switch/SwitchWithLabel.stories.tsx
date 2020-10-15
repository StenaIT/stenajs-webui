import { SwitchWithLabel } from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "forms/Switch/SwitchWithLabel",
};

export const Standard = () => (
  <SwitchWithLabel
    label={knobs.text("Label", "Enable something")}
    value={knobs.boolean("Toggled", false)}
    disabled={knobs.boolean("Disabled", false)}
  />
);
