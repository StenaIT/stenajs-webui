import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { StandardButton } from "@stenajs-webui/elements";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Buttons/StandardButton", module)
  .add("default", () => (
    <StandardButton label={"Submit"} onClick={action("Button clicked")} />
  ))
  .add("disabled", () => (
    <StandardButton
      label={"Submit"}
      disabled
      onClick={action("Button clicked")}
    />
  ))
  .add("with no content", () => (
    <StandardButton onClick={action("Button clicked")} />
  ))
  .add("with icon only", () => (
    <StandardButton leftIcon={faCoffee} onClick={action("Button clicked")} />
  ))
  .add("with icon left", () => (
    <StandardButton
      label={"Submit"}
      leftIcon={faCoffee}
      onClick={action("Button clicked")}
    />
  ))
  .add("with icon right", () => (
    <StandardButton
      label={"Submit"}
      rightIcon={faCoffee}
      onClick={action("Button clicked")}
    />
  ))
  .add("with icon left and right", () => (
    <StandardButton
      label={"Submit"}
      leftIcon={faCheck}
      rightIcon={faCoffee}
      onClick={action("Button clicked")}
    />
  ))
  .add("with icon left and right, no label", () => (
    <StandardButton
      leftIcon={faCheck}
      rightIcon={faCoffee}
      onClick={action("Button clicked")}
    />
  ))
  .add("with loading", () => (
    <StandardButton
      label={"Submit"}
      loading
      onClick={action("Button clicked")}
    />
  ))
  .add("with loading label", () => (
    <StandardButton
      label={"Submit"}
      loading
      loadingLabel={"Loading..."}
      onClick={action("Button clicked")}
    />
  ))
  .add("with success", () => (
    <StandardButton
      label={"Submit"}
      success
      onClick={action("Button clicked")}
    />
  ))
  .add("with success label", () => (
    <StandardButton label={"Submit"} success successLabel={"Done!"} />
  ));
