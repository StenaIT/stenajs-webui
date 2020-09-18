import { Badge } from "@stenajs-webui/elements";
import { select, text } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "elements/Badge/Badge"
};

export const Standard = () => (
  <Badge
    label={text("Label", "5")}
    type={select("Type", ["notification", "warning", "error"], "notification")}
  />
);

Standard.storyName = "standard";
