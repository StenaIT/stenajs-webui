import { Chip } from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Column } from "@stenajs-webui/core";

storiesOf("elements/Chip", module).add("standard", () => (
  <Column alignItems={"flex-start"}>
    <Chip label={"Default"} style={{ margin: "8px" }} />
    <Chip label={"Error"} style={{ margin: "8px" }} variant={"error"} />
    <Chip label={"Success"} style={{ margin: "8px" }} variant={"success"} />
    <Chip
      label={"With onClickLabel"}
      style={{ margin: "8px" }}
      onClickLabel={() => alert("hello world")}
    />
    <Chip
      label={"With onClickRemove"}
      style={{ margin: "8px" }}
      onClickRemove={() => alert("remove")}
    />
    <Chip
      label={"With both"}
      style={{ margin: "8px" }}
      onClickLabel={() => alert("hello world")}
      onClickRemove={() => alert("remove")}
    />
  </Column>
));
