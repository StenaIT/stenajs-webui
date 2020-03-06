import { Chip } from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Chip", module).add("standard", () => (
  <div className={"margin-wrapper"}>
    <Chip text={"Default"} />
    <Chip
      text={"With onClickLabel"}
      onClickLabel={() => alert("hello world")}
    />
    <Chip text={"With onClickRemove"} onClickRemove={() => alert("remove")} />
    <Chip
      text={"With both"}
      onClickLabel={() => alert("hello world")}
      onClickRemove={() => alert("remove")}
    />
  </div>
));
