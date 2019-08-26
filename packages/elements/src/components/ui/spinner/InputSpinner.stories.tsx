import { InputSpinner } from "@stenajs-webui/elements";
import { color } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/InputSpinner", module)
  .add("standard", () => <InputSpinner />)
  .add("with custom color", () => (
    <InputSpinner color={color("trackColor", "red")} />
  ));
