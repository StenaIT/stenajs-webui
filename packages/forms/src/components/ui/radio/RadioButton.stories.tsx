import { withInfo } from "@storybook/addon-info";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RadioButton } from "./RadioButton";
import {
  defaultRadioButtonTheme,
  defaultRadioButtonThemeDark
} from "./RadioButtonTheme";
import { RadioButtonWithLabel } from "./RadioButtonWithLabel";

storiesOf("forms/RadioButton", module)
  .addDecorator(withInfo())
  .add("standard", () => (
    <RadioButton
      value={knobs.boolean("Checked", false)}
      disabled={knobs.boolean("Disabled", false)}
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
        notCheckedColor: "magenta",
        iconColor: "darkgreen",
        iconSize: 40
      }}
    />
  ));

storiesOf("forms/RadioButton/RadioButtonWithLabel", module)
  .addDecorator(withInfo())
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
      theme={{
        ...defaultRadioButtonTheme,
        iconColor: "pink",
        iconSize: 40,
        textColor: "lightblue",
        textSize: "30px"
      }}
    />
  ));
