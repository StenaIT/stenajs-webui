import { Switch } from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("forms/Switch", module)
  .add("standard", () => (
    <Switch
      value={knobs.boolean("Toggled", false)}
      disabled={knobs.boolean("Disabled", false)}
    />
  ))
  .add("custom action color", () => (
    <div style={{ "--swui-color-primary-action": "#41ae33" } as any}>
      <Switch
        value={knobs.boolean("Toggled", false)}
        disabled={knobs.boolean("Disabled", false)}
      />
    </div>
  ))
  .add("disabled", () => (
    <Switch value={knobs.boolean("Toggled", false)} disabled />
  ));
