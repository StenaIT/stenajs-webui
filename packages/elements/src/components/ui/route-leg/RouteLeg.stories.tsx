import * as React from "react";
import { RouteLeg } from "./RouteLeg";
import { RouteLegBanner, RouteLegTimeTag } from "./banner/RouteLegBanner";
import { Link } from "../link/Link";
import { RouteLegList } from "./RouteLegList";
import { Box, SeparatorLine } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";

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

export const FinalDestination = () => (
  <RouteLeg
    variant={"rail"}
    departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
    arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
    isFinal
  />
);

export const WithChildren = () => (
  <RouteLeg
    variant={"ship"}
    departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
    arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
  >
    <Link>123456789</Link>
  </RouteLeg>
);

export const Compact = () => (
  <Box width={220}>
    <RouteLeg
      variant={"rail"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      size={"compact"}
    />
  </Box>
);

export const Relaxed = () => (
  <RouteLeg
    variant={"rail"}
    departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
    arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
    size={"relaxed"}
  />
);

export const WithLabel = () => (
  <Box width={220}>
    <RouteLeg
      variant={"rail"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      size={"compact"}
      label={"1st route"}
    />
  </Box>
);

export const Selected = () => (
  <Box width={220}>
    <RouteLeg
      variant={"rail"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      size={"compact"}
      selected
    />
  </Box>
);

export const SelectedWithLabel = () => (
  <Box width={220}>
    <RouteLeg
      variant={"rail"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      size={"compact"}
      label={"1st route"}
      selected
    />
  </Box>
);

export const Multileg = () => (
  <RouteLegList width={200}>
    <RouteLeg
      variant={"rail"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
    />
    <RouteLegBanner
      headerText={"Waiting time"}
      text={"2d 3h 15min"}
      variant={"warning"}
    />
    <RouteLeg
      variant={"ship"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
    />
    <RouteLegBanner
      headerText={"Waiting time"}
      text={"2d 3h 15min"}
      variant={"warning"}
    />
    <RouteLeg
      variant={"rail"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      isFinal
    />
    <RouteLegBanner headerText={"Total time"} text={"2d 3h 15min"} />
  </RouteLegList>
);

export const MultilegCompact = () => (
  <Box width={250} border={`1px solid ${cssColor("--lhds-color-ui-300")}`}>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
        arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      >
        <Link>123456789</Link>
      </RouteLeg>
    </Box>
    <Box gap alignItems={"center"}>
      <SeparatorLine />
      <RouteLegTimeTag text={"2d 3h 15min"} variant={"warning"} />
      <SeparatorLine />
    </Box>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"ship"}
        departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
        arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      >
        <Link>123456789</Link>
      </RouteLeg>
    </Box>
    <Box gap alignItems={"center"}>
      <SeparatorLine />
      <RouteLegTimeTag text={"2d 3h 15min"} variant={"warning"} />
      <SeparatorLine />
    </Box>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
        arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
        isFinal
      >
        <Link>123456789</Link>
      </RouteLeg>
    </Box>
  </Box>
);

export const MultilegCompactCompact = () => (
  <Box width={264} border={`1px solid ${cssColor("--lhds-color-ui-300")}`}>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
        arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
        size={"relaxed"}
        selected
        isFinal
      />
    </Box>
    <SeparatorLine />
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
        arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
        size={"compact"}
        label={"1st route"}
      />
    </Box>
    <Box gap alignItems={"center"}>
      <SeparatorLine />
      <RouteLegTimeTag text={"2d 3h 15min"} variant={"warning"} />
      <SeparatorLine />
    </Box>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"ship"}
        departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
        arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
        size={"compact"}
        label={"2nd route"}
      />
    </Box>
    <Box gap alignItems={"center"}>
      <SeparatorLine />
      <RouteLegTimeTag text={"2d 3h 15min"} variant={"warning"} />
      <SeparatorLine />
    </Box>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
        arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
        size={"compact"}
        label={"3rd route"}
        isFinal
      />
    </Box>
  </Box>
);
