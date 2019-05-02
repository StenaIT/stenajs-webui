import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { FlatButton } from "@stenajs-webui/elements";

storiesOf("elements/Buttons/FlatButton", module)
  .addDecorator(withInfo())
  .add("default", () => <FlatButton label={"Submit"} />)
  .add("disabled", () => <FlatButton label={"Submit"} disabled />)
  .add("with icon left", () => (
    <FlatButton label={"Submit"} leftIcon={faCoffee} />
  ))
  .add("with icon right", () => (
    <FlatButton label={"Submit"} rightIcon={faCoffee} />
  ))
  .add("with loading", () => <FlatButton label={"Submit"} loading />)
  .add("with success", () => <FlatButton label={"Submit"} success />);
