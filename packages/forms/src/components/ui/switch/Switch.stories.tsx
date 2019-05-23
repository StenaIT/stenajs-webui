import { withInfo } from "@storybook/addon-info";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Switch } from "./Switch";
import { defaultSwitchTheme } from "./SwitchTheme";

storiesOf("forms/Switch", module)
  .addDecorator(withInfo())
  .add("standard", () => (
    <Switch
      value={knobs.boolean("Toggled", false)}
      disabled={knobs.boolean("Disabled", false)}
    />
  ))
  .add("custom size", () => (
    <Switch
      value={knobs.boolean("Toggled", false)}
      disabled={knobs.boolean("Disabled", false)}
      theme={{
        ...defaultSwitchTheme,
        height: 40,
        width: 200
      }}
    />
  ))
  .add("disabled", () => (
    <Switch value={knobs.boolean("Toggled", false)} disabled />
  ));
