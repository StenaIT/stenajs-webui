import { Label } from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Label", module).add("standard", () => (
  <div className={"margin-wrapper"}>
    <Label>Standard</Label>
    <Label
      style={{
        ["--swui-label-background-color" as string]: "#f1002e",
        ["--swui-label-border-color" as string]: "#d70029",
        ["--swui-label-color" as string]: "#ffdde4"
      }}
    >
      With custom color
    </Label>
    <Label
      style={{
        ["--swui-label-background-color" as string]: "#ffb633",
        ["--swui-label-border-color" as string]: "#ffa400",
        ["--swui-label-color" as string]: "#ffeac4"
      }}
    >
      With another custom color
    </Label>
  </div>
));
