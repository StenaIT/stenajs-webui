import { Chip } from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Chip", module).add("standard", () => (
  <div className={"margin-wrapper"}>
    <Chip label={"Default"} />
    <Chip label={"With onClick"} onClick={() => alert("hello world")} />
    <Chip label={"With onRemove"} onRemove={() => alert("remove")} />
    <Chip
      label={"With both"}
      onClick={() => alert("hello world")}
      onRemove={() => alert("remove")}
    />
  </div>
));
