import { defaultSwitchTheme, Switch } from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import * as React from "react";

export default { title: "forms/Switch" };

export const standard = () => (
  <Switch
    value={knobs.boolean("Toggled", false)}
    disabled={knobs.boolean("Disabled", false)}
  />
);

export const customSize = () => (
  <Switch
    value={knobs.boolean("Toggled", false)}
    disabled={knobs.boolean("Disabled", false)}
    theme={{
      ...defaultSwitchTheme,
      height: 40,
      width: 200
    }}
  />
);

export const disabled = () => (
  <Switch value={knobs.boolean("Toggled", false)} disabled />
);
