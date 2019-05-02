import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { StandardButton } from "@stenajs-webui/elements";

storiesOf("elements/Buttons/StandardButton", module)
  .addDecorator(withInfo())
  .add("default", () => (
    <StandardButton label={"Submit"} onClick={() => alert("Click")} />
  ))
  .add("disabled", () => <StandardButton label={"Submit"} disabled />)
  .add("with icon and no text", () => <StandardButton leftIcon={faCoffee} />)
  .add("with icon left", () => (
    <StandardButton label={"Submit"} leftIcon={faCoffee} />
  ))
  .add("with icon right", () => (
    <StandardButton label={"Submit"} rightIcon={faCoffee} />
  ))
  .add("with loading", () => <StandardButton label={"Submit"} loading />)
  .add("with loading label", () => <StandardButton label={"Submit"} loading loadingLabel={'Loading...'}/>)
  .add("with success", () => <StandardButton label={"Submit"} success />)
  .add("with success label", () => (
    <StandardButton label={"Submit"} success successLabel={"Done!"} />
  ));
