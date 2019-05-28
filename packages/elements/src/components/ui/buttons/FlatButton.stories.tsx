import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { FlatButton } from "@stenajs-webui/elements";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Buttons/FlatButton", module)
  .add("default", () => (
    <FlatButton label={"Submit"} onClick={action("Button clicked")} />
  ))
  .add("disabled", () => (
    <FlatButton label={"Submit"} disabled onClick={action("Button clicked")} />
  ))
  .add("with icon left", () => (
    <FlatButton
      label={"Submit"}
      leftIcon={faCoffee}
      onClick={action("Button clicked")}
    />
  ))
  .add("with icon right", () => (
    <FlatButton
      label={"Submit"}
      rightIcon={faCoffee}
      onClick={action("Button clicked")}
    />
  ))
  .add("with loading", () => (
    <FlatButton label={"Submit"} loading onClick={action("Button clicked")} />
  ))
  .add("with success", () => (
    <FlatButton label={"Submit"} success onClick={action("Button clicked")} />
  ));
