import { FlatButton } from "@stenajs-webui/elements";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { faCoffee } from "@fortawesome/pro-light-svg-icons/faCoffee";

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
  .add("with loading label", () => (
    <FlatButton
      label={"Submit"}
      loading
      loadingLabel={"Loading..."}
      onClick={action("Button clicked")}
    />
  ))
  .add("with success", () => (
    <FlatButton label={"Submit"} success onClick={action("Button clicked")} />
  ))
  .add("with success label", () => (
    <FlatButton label={"Submit"} success successLabel={"Done!"} />
  ));
