import * as React from "react";
import { Text } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";

export default {
  title: "core/Text/Text",
};

export const Body = () => <Text>The five boxing wizards jump quickly.</Text>;
export const BodyWhite = () => (
  <Text
    color={cssColor("--lhds-color-ui-50")}
    style={{ background: cssColor("--lhds-color-ui-500") }}
  >
    The five boxing wizards jump quickly.
  </Text>
);

export const BodyBold = () => (
  <Text variant={"bold"}>The five boxing wizards jump quickly.</Text>
);

export const Large = () => (
  <Text size={"large"}>The five boxing wizards jump quickly.</Text>
);

export const LargeWhite = () => (
  <Text
    size={"large"}
    color={cssColor("--lhds-color-ui-50")}
    style={{ background: cssColor("--lhds-color-ui-500") }}
  >
    The five boxing wizards jump quickly.
  </Text>
);

export const LargeBold = () => (
  <Text size={"large"} variant={"bold"}>
    The five boxing wizards jump quickly.
  </Text>
);

export const Small = () => (
  <Text size={"small"}>The five boxing wizards jump quickly.</Text>
);

export const SmallWhite = () => (
  <Text
    size={"small"}
    color={cssColor("--lhds-color-ui-50")}
    style={{ background: cssColor("--lhds-color-ui-500") }}
  >
    The five boxing wizards jump quickly.
  </Text>
);

export const SmallBold = () => (
  <Text size={"small"} variant={"bold"}>
    The five boxing wizards jump quickly.
  </Text>
);

export const Smaller = () => (
  <Text size={"smaller"}>The five boxing wizards jump quickly.</Text>
);

export const SmallerWhite = () => (
  <Text
    size={"smaller"}
    color={cssColor("--lhds-color-ui-50")}
    style={{ background: cssColor("--lhds-color-ui-500") }}
  >
    The five boxing wizards jump quickly.
  </Text>
);

export const SmallerBold = () => (
  <Text size={"smaller"} variant={"bold"}>
    The five boxing wizards jump quickly.
  </Text>
);

export const Caption = () => (
  <Text variant={"caption"}>The five boxing wizards jump quickly.</Text>
);

export const Overline = () => (
  <Text variant={"overline"}>The five boxing wizards jump quickly.</Text>
);
