import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { SmallButton } from "@stenajs-webui/elements";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Buttons/SmallButton", module)
  .add("default", () => (
    <SmallButton label={"Submit"} onClick={action("Button clicked")} />
  ))
  .add("disabled", () => (
    <SmallButton label={"Submit"} disabled onClick={action("Button clicked")} />
  ))
  .add("with icon left", () => (
    <SmallButton
      label={"Submit"}
      leftIcon={faCoffee}
      onClick={action("Button clicked")}
    />
  ))
  .add("with icon right", () => (
    <SmallButton
      label={"Submit"}
      rightIcon={faCoffee}
      onClick={action("Button clicked")}
    />
  ))
  .add("with loading", () => (
    <SmallButton label={"Submit"} loading onClick={action("Button clicked")} />
  ))
  .add("with loading label", () => (
    <SmallButton
      label={"Submit"}
      loading
      loadingLabel={"Loading..."}
      onClick={action("Button clicked")}
    />
  ))
  .add("with success", () => (
    <SmallButton label={"Submit"} success onClick={action("Button clicked")} />
  ))
  .add("with success label", () => (
    <SmallButton label={"Submit"} success successLabel={"Done!"} />
  ));
