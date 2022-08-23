import * as React from "react";
import { Box } from "@stenajs-webui/core";
import { RouteLegBanner } from "./RouteLegBanner";

export default {
  title: "elements/RouteLeg/RouteLegBanner",
  component: RouteLegBanner,
};

export const Standard = () => (
  <Box width={"200px"}>
    <RouteLegBanner headerText={"Total time"} text={"3h 15min"} />
  </Box>
);

export const VariantInfo = () => (
  <Box width={"200px"}>
    <RouteLegBanner headerText={"Total time"} text={"3h 15min"} />
  </Box>
);

export const VariantWarning = () => (
  <Box width={"200px"}>
    <RouteLegBanner
      headerText={"Waiting time"}
      text={"3h 15min"}
      variant={"warning"}
    />
  </Box>
);
