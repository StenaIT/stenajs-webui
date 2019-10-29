import {
  defaultRadioButtonTheme,
  defaultRadioButtonThemeDark,
  RadioButton,
  RadioButtonWithLabel
} from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("forms/RadioButton", module)
  .add("standard", () => (
    <RadioButton
      value={knobs.boolean("Checked", false)}
      disabled={knobs.boolean("Disabled", false)}
    />
  ))
  .add("with DOM name", () => (
    <RadioButton
      value={knobs.boolean("Checked", false)}
      disabled={knobs.boolean("Disabled", false)}
      name={knobs.text("Name", "agree")}
    />
  ))
  .add("checked and disabled", () => <RadioButton value={true} disabled />)
  .add("not checked and disabled", () => <RadioButton value={false} disabled />)
  .add("with dark theme", () => (
    <RadioButton
      value={knobs.boolean("Checked", false)}
      theme={defaultRadioButtonThemeDark}
    />
  ))
  .add("with custom theme", () => (
    <RadioButton
      value={knobs.boolean("Checked", false)}
      theme={{
        ...defaultRadioButtonTheme,
        iconColorNotChecked: "magenta",
        iconColor: "darkgreen",
        iconSize: 40
      }}
    />
  ));

storiesOf("forms/RadioButton/RadioButtonWithLabel", module)
  .add("standard", () => (
    <RadioButtonWithLabel
      label={"Add cake"}
      value={knobs.boolean("Checked", false)}
    />
  ))
  .add("with custom theme", () => (
    <RadioButtonWithLabel
      label={"Add cake"}
      value={knobs.boolean("Checked", false)}
      textColor="lightblue"
      theme={{
        ...defaultRadioButtonTheme,
        iconColor: "pink",
        iconSize: 40
      }}
    />
  ));
