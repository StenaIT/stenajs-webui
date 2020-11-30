import { Box, Column, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { Spinner } from "./Spinner";

export default {
  title: "elements/Spinner",
};

export const Standard = () => (
  <Column>
    <Text>size=large</Text>
    <Spinner size={"large"} />
    <Space num={4} />
    <Text>size=medium</Text>
    <Spinner size={"medium"} />
    <Space num={4} />
    <Text>size=small</Text>
    <Spinner size={"small"} />
    <Space num={4} />
    <Text>size=tiny</Text>
    <Spinner size={"tiny"} />
    <Space num={4} />
  </Column>
);

export const Inverted = () => (
  <Box indent={4} spacing={4} background={"#777777"} display={"inline-block"}>
    <Spinner variant={"inverted"} />
  </Box>
);

export const WithColor = () => (
  <Box indent={4} spacing={4} background={"#777777"} display={"inline-block"}>
    <Spinner color={"green"} />
  </Box>
);
