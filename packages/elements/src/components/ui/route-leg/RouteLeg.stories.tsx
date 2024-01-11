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
    departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
    arrival={{ location: "Frederikshavn", dateTime: "23 Aug 12:40" }}
  />
);

export const Overview = () => {
  return (
    <Box gap={5} alignItems={"flex-start"}>
      {routeLegSizes.map((size) => (
        <Box gap={2} key={size}>
          <Heading as={"h4"}>{size}</Heading>
          <RouteLeg
            variant={"ship"}
            departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
            arrival={{
              location: "Frederikshavn",
              dateTime: "23 Aug 12:40",
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
    departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
    arrival={{ location: "Frederikshavn", dateTime: "23 Aug 12:40" }}
  />
);

export const Rail = () => (
  <RouteLeg
    variant={"rail"}
    departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
    arrival={{ location: "Frederikshavn", dateTime: "23 Aug 12:40" }}
  />
);

export const WithChildren = () => (
  <RouteLeg
    variant={"ship"}
    departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
    arrival={{ location: "Frederikshavn", dateTime: "23 Aug 12:40" }}
  >
    <Link>123456789</Link>
  </RouteLeg>
);

export const Compact = () => (
  <Box alignItems={"flex-start"}>
    <RouteLeg
      variant={"ship"}
      departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
      arrival={{ location: "Frederikshavn", dateTime: "23 Aug 12:40" }}
      size={"compact"}
    />
  </Box>
);

export const CompactWithChildren = () => (
  <Box alignItems={"flex-start"}>
    <RouteLeg
      variant={"ship"}
      departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
      arrival={{ location: "Frederikshavn", dateTime: "23 Aug 12:40" }}
      size={"compact"}
    >
      <Link>123456789</Link>
    </RouteLeg>
  </Box>
);
export const StandardWithStrikethrough = () => (
  <RouteLeg
    variant={"ship"}
    departure={{
      location: "Göteborg",
      dateTime: "23 Aug 09:15",
      originalDateTime: "23 Aug 09:10",
    }}
    arrival={{
      location: "Frederikshavn",
      dateTime: "23 Aug 12:50",
      originalDateTime: "23 Aug 12:40",
    }}
    label={"1st route"}
  />
);

export const RelaxedWithStrikethrough = () => (
  <RouteLeg
    variant={"ship"}
    departure={{
      location: "Göteborg",
      dateTime: "23 Aug 09:15",
      originalDateTime: "23 Aug 09:10",
    }}
    arrival={{
      location: "Frederikshavn",
      dateTime: "23 Aug 12:50",
      originalDateTime: "23 Aug 12:40",
    }}
    size={"relaxed"}
    label={"1st route"}
  />
);

export const CompactWithStrikethrough = () => (
  <Box alignItems={"flex-start"}>
    <RouteLeg
      variant={"ship"}
      departure={{
        location: "Göteborg",
        dateTime: "23 Aug 09:15",
        originalDateTime: "23 Aug 09:10",
      }}
      arrival={{
        location: "Frederikshavn",
        dateTime: "23 Aug 12:50",
        originalDateTime: "23 Aug 12:40",
      }}
      size={"compact"}
      label={"1st route"}
    />
  </Box>
);

export const CompactWithLabel = () => (
  <Box alignItems={"flex-start"}>
    <RouteLeg
      variant={"ship"}
      departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
      arrival={{ location: "Frederikshavn", dateTime: "23 Aug 12:40" }}
      size={"compact"}
      label={"1st route"}
    />
  </Box>
);

export const CompactWithLabelSelected = () => (
  <Box width={250}>
    <RouteLeg
      variant={"ship"}
      departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
      arrival={{ location: "Frederikshavn", dateTime: "23 Aug 12:40" }}
      size={"compact"}
      label={"1st route"}
      selected
    />
  </Box>
);

export const Relaxed = () => (
  <RouteLeg
    variant={"rail"}
    departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
    arrival={{ location: "Frederikshavn", dateTime: "23 Aug 12:40" }}
    size={"relaxed"}
  />
);

export const RelaxedSelected = () => (
  <Box width={250}>
    <RouteLeg
      variant={"rail"}
      departure={{ location: "Göteborg", dateTime: "23 Aug 09:10" }}
      arrival={{ location: "Frederikshavn", dateTime: "23 Aug 12:40" }}
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
        departure={{ location: "Bettembourg", dateTime: "15 Apr 18:00" }}
        arrival={{ location: "Rostock", dateTime: "16 Apr 17:15" }}
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
        departure={{ location: "Rostock", dateTime: "17 Apr 11:45" }}
        arrival={{ location: "Trelleborg", dateTime: "17 Apr 18:00" }}
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
        departure={{ location: "Trelleborg", dateTime: "17 Apr 22:30" }}
        arrival={{ location: "Eskilstuna", dateTime: "18 Apr 06:00" }}
      />
    </Box>
  </Box>
);

export const MultilegCompact = () => (
  <Box width={270} border={`1px solid ${cssColor("--lhds-color-ui-300")}`}>
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Bettembourg", dateTime: "15 Apr 18:00" }}
        arrival={{ location: "Eskilstuna", dateTime: "18 Apr 06:00" }}
        size={"relaxed"}
        selected
      />
    </Box>
    <SeparatorLine />
    <Box indent={3} spacing={3}>
      <RouteLeg
        variant={"rail"}
        departure={{ location: "Bettembourg", dateTime: "15 Apr 18:00" }}
        arrival={{ location: "Rostock", dateTime: "16 Apr 17:15" }}
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
        departure={{ location: "Rostock", dateTime: "17 Apr 11:45" }}
        arrival={{ location: "Trelleborg", dateTime: "17 Apr 18:00" }}
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
        departure={{ location: "Trelleborg", dateTime: "17 Apr 22:30" }}
        arrival={{ location: "Eskilstuna", dateTime: "18 Apr 06:00" }}
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
