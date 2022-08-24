import * as React from "react";
import { RouteLeg, RouteLegSize } from "./RouteLeg";
import { TimeTag } from "./TimeTag";
import { Link } from "../link/Link";
import { Box, Heading, SeparatorLine } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";

const routeLegSizes: Array<RouteLegSize> = ["compact", "standard", "relaxed"];

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

export const Overview = () => {
  return (
    <Box gap={5}>
      {routeLegSizes.map((size) => (
        <Box width={220} gap={2}>
          <Heading as={"h4"}>{size}</Heading>
          <RouteLeg
            variant={"ship"}
            departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
            arrival={{
              location: "Frederikshavn",
              date: "23 Aug",
              time: "12:40",
            }}
            size={size}
          />
        </Box>
      ))}
    </Box>
  );
};

export const Ship = () => (
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
      variant={"ship"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      size={"compact"}
    />
  </Box>
);

export const CompactWithChildren = () => (
  <Box width={220}>
    <RouteLeg
      variant={"ship"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      size={"compact"}
    >
      <Link>123456789</Link>
    </RouteLeg>
  </Box>
);

export const CompactWithLabel = () => (
  <Box width={220}>
    <RouteLeg
      variant={"ship"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      size={"compact"}
      label={"1st route"}
    />
  </Box>
);

export const CompactWithLabelSelected = () => (
  <Box width={220}>
    <RouteLeg
      variant={"ship"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      size={"compact"}
      label={"1st route"}
      selected
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

export const RelaxedSelected = () => (
  <Box width={220}>
    <RouteLeg
      variant={"rail"}
      departure={{ location: "Göteborg", date: "23 Aug", time: "09:10" }}
      arrival={{ location: "Frederikshavn", date: "23 Aug", time: "12:40" }}
      size={"relaxed"}
      selected
    />
  </Box>
);

export const Multileg = () => (
  <Box width={250} border={`1px solid ${cssColor("--lhds-color-ui-300")}`}>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Bettembourg", date: "15 Apr", time: "18:00" }}
        arrival={{ location: "Rostock", date: "16 Apr", time: "17:15" }}
      />
    </Box>
    <Box gap alignItems={"center"}>
      <SeparatorLine />
      <TimeTag label={"18h 30min"} />
      <SeparatorLine />
    </Box>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"ship"}
        departure={{ location: "Rostock", date: "17 Apr", time: "11:45" }}
        arrival={{ location: "Trelleborg", date: "17 Apr", time: "18:00" }}
      />
    </Box>
    <Box gap alignItems={"center"}>
      <SeparatorLine />
      <TimeTag label={"4h 30min"} />
      <SeparatorLine />
    </Box>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Trelleborg", date: "17 Apr", time: "22:30" }}
        arrival={{ location: "Eskilstuna", date: "18 Apr", time: "06:00" }}
      />
    </Box>
  </Box>
);

export const MultilegCompact = () => (
  <Box width={264} border={`1px solid ${cssColor("--lhds-color-ui-300")}`}>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Bettembourg", date: "15 Apr", time: "18:00" }}
        arrival={{ location: "Eskilstuna", date: "18 Apr", time: "06:00" }}
        size={"relaxed"}
        selected
      />
    </Box>
    <SeparatorLine />
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Bettembourg", date: "15 Apr", time: "18:00" }}
        arrival={{ location: "Rostock", date: "16 Apr", time: "17:15" }}
        size={"compact"}
        label={"1st route"}
      >
        <Link>78900001</Link>
      </RouteLeg>
    </Box>
    <Box gap alignItems={"center"}>
      <SeparatorLine />
      <TimeTag label={"18h 30min"} />
      <SeparatorLine />
    </Box>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"ship"}
        departure={{ location: "Rostock", date: "17 Apr", time: "11:45" }}
        arrival={{ location: "Trelleborg", date: "17 Apr", time: "18:00" }}
        size={"compact"}
        label={"2nd route"}
      >
        <Link>78900002</Link>
      </RouteLeg>
    </Box>
    <Box gap alignItems={"center"}>
      <SeparatorLine />
      <TimeTag label={"4h 30min"} />
      <SeparatorLine />
    </Box>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Trelleborg", date: "17 Apr", time: "22:30" }}
        arrival={{ location: "Eskilstuna", date: "18 Apr", time: "06:00" }}
        size={"compact"}
        label={"3rd route"}
      >
        <Link>78900003</Link>
      </RouteLeg>
    </Box>
  </Box>
);

export const TimeTags = () => (
  <Box gap={2}>
    <TimeTag label={"4h 30min"} variant={"waiting"} />
    <TimeTag label={"4h 30min"} variant={"total"} />
  </Box>
);
