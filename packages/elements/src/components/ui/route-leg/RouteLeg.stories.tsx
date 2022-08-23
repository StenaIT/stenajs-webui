import * as React from "react";
import { RouteLeg } from "./RouteLeg";
import { Box } from "@stenajs-webui/core";
import { RouteLegBanner } from "./banner/RouteLegBanner";
import { Link } from "../link/Link";

export default {
  title: "elements/RouteLeg",
  component: RouteLeg,
};

export const Demo = () => (
  <RouteLeg
    variant={"ship"}
    departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
    arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
  />
);

export const Rail = () => (
  <RouteLeg
    variant={"rail"}
    departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
    arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
  />
);

export const WithChildren = () => (
  <RouteLeg
    variant={"rail"}
    departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
    arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
  >
    <Link>123456789</Link>
  </RouteLeg>
);

export const Multileg = () => (
  <Box width={200} gap={2}>
    <RouteLeg
      variant={"rail"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
    />
    <RouteLegBanner
      headerText={"Waiting time"}
      text={"3h 15min"}
      variant={"warning"}
    />
    <RouteLeg
      variant={"ship"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
    />
    <RouteLegBanner
      headerText={"Waiting time"}
      text={"3h 15min"}
      variant={"warning"}
    />
    <RouteLeg
      variant={"rail"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
    />
    <RouteLegBanner headerText={"Total time"} text={"3h 15min"} />
  </Box>
);
