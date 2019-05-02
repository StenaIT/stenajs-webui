import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { SmallButton } from "@stenajs-webui/elements";

storiesOf("elements/Buttons/SmallButton", module)
  .addDecorator(withInfo())
  .add("default", () => <SmallButton label={"Submit"} />)
  .add("disabled", () => <SmallButton label={"Submit"} disabled />)
  .add("with icon left", () => (
    <SmallButton label={"Submit"} leftIcon={faCoffee} />
  ))
  .add("with icon right", () => (
    <SmallButton label={"Submit"} rightIcon={faCoffee} />
  ))
  .add("with loading", () => <SmallButton label={"Submit"} loading />)
  .add("with success", () => <SmallButton label={"Submit"} success />);
