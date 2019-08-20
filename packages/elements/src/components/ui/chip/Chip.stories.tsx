import { Chip } from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Chip", module)
  .add("standard", () => <Chip label={"Some text"} />)
  .add("clickable label", () => (
    <Chip label={"Some text"} onClickLabel={() => alert("hello world")} />
  ))
  .add("removable", () => (
    <Chip label={"Some text"} onClickRemove={() => alert("remove")} />
  ))
  .add("clickable label and removable", () => (
    <Chip
      label={"Some text"}
      onClickLabel={() => alert("hello world")}
      onClickRemove={() => alert("remove")}
    />
  ));
