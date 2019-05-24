import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { withInfo } from "@storybook/addon-info";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Checkbox } from "./Checkbox";
import {
  CheckboxTheme,
  defaultCheckboxTheme,
  defaultCheckboxThemeDark
} from "./CheckboxTheme";
import { CheckboxWithLabel } from "./CheckboxWithLabel";

storiesOf("forms/Checkbox", module)
  .add("standard", () => (
    <Checkbox
      value={knobs.boolean("Checked", false)}
      disabled={knobs.boolean("Disabled", false)}
    />
  ))
  .add("checked and disabled", () => <Checkbox value={true} disabled />)
  .add("not checked and disabled", () => <Checkbox value={false} disabled />)
  .add("with dark theme", () => (
    <Checkbox
      value={knobs.boolean("Checked", false)}
      disabled={knobs.boolean("Disabled", false)}
      theme={defaultCheckboxThemeDark}
    />
  ))
  .add("with custom theme", () => {
    const theme: CheckboxTheme = {
      ...defaultCheckboxTheme,
      backgroundColor: "lightgray",
      borderColor: "black",
      iconColor: "white",
      backgroundColorDisabled: "lightgray",
      borderColorDisabled: "black",
      iconColorDisabled: "white",
      backgroundColorChecked: "lightblue",
      borderColorChecked: "red",
      iconColorChecked: "white",
      checkIcon: faCoffee,
      borderRadius: "2px"
    };
    return <Checkbox value={knobs.boolean("Checked", false)} theme={theme} />;
  });

storiesOf("forms/Checkbox/CheckboxWithLabel", module)
  .add("standard", () => (
    <CheckboxWithLabel
      label={"Add cake"}
      value={knobs.boolean("Checked", false)}
      disabled={knobs.boolean("Disabled", false)}
    />
  ));
