import * as React from "react";
import { Text } from "@stenajs-webui/core";

export default {
  title: "core/Text/Text",
};

export const Body = () => <Text>The five boxing wizards jump quickly.</Text>;
export const BodyBold = () => (
  <Text variant={"bold"}>The five boxing wizards jump quickly.</Text>
);
