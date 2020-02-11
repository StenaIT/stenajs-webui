import { SwitchWithLabel } from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("forms/Switch/SwitchWithLabel", module).add("standard", () => (
  <SwitchWithLabel
    label={knobs.text("Label", "Enable something")}
    value={knobs.boolean("Toggled", false)}
    disabled={knobs.boolean("Disabled", false)}
  />
));
