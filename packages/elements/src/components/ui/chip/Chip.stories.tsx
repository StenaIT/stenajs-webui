import { Chip } from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Chip", module).add("standard", () => (
  <div className={"margin-wrapper"}>
    <Chip label={"Default"} />
    <Chip label={"With onClickLabel"} onClick={() => alert("hello world")} />
    <Chip label={"With onClickRemove"} onClickRemove={() => alert("remove")} />
    <Chip
      label={"With both"}
      onClick={() => alert("hello world")}
      onClickRemove={() => alert("remove")}
    />
  </div>
));
