import { Badge } from "@stenajs-webui/elements";
import { select, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Badge/Badge", module).add("standard", () => (
  <Badge
    label={text("Label", "5")}
    type={select("Type", ["notification", "warning", "error"], "notification")}
  />
));
