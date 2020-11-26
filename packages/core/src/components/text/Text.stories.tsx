import * as React from "react";
import { Text, TextProps } from "./Text";
import { cssColor } from "@stenajs-webui/theme";
import { Story } from "@storybook/react";

export default {
  title: "core/Text/Text",
  component: Text,
};

const ipsum =
  "Contrary to popular belief, Lorem Ipsum is not simply random text. " +
  "It has roots in a piece of classical Latin literature from 45 BC, " +
  "making it over 2000 years old. Richard McClintock, a" +
  " Latin professor at Hampden-Sydney College in Virginia, " +
  "looked up one of the more obscure Latin words, consectetur, " +
  "from a Lorem Ipsum passage, and going through the cites of the word in classical literature, " +
  "discovered the undoubtable source. Lorem Ipsum comes from " +
  'sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" ' +
  "(The Extremes of Good and Evil) by Cicero, written in 45 BC. " +
  "This book is a treatise on the theory of ethics, " +
  "very popular during the Renaissance. " +
  'The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.';

export const Overview: Story<TextProps> = (props) => (
  <Text {...props}>{ipsum}</Text>
);

export const Body = () => <Text>{ipsum}</Text>;

export const BodyWhite = () => (
  <Text
    color={cssColor("--lhds-color-ui-50")}
    style={{ background: cssColor("--lhds-color-ui-500") }}
  >
    {ipsum}
  </Text>
);

export const BodyBold = () => <Text variant={"bold"}>{ipsum}</Text>;

export const Large = () => <Text size={"large"}>{ipsum}</Text>;

export const LargeWhite = () => (
  <Text
    size={"large"}
    color={cssColor("--lhds-color-ui-50")}
    style={{ background: cssColor("--lhds-color-ui-500") }}
  >
    {ipsum}
  </Text>
);

export const LargeBold = () => (
  <Text size={"large"} variant={"bold"}>
    {ipsum}
  </Text>
);

export const Small = () => <Text size={"small"}>{ipsum}</Text>;

export const SmallWhite = () => (
  <Text
    size={"small"}
    color={cssColor("--lhds-color-ui-50")}
    style={{ background: cssColor("--lhds-color-ui-500") }}
  >
    {ipsum}
  </Text>
);

export const SmallBold = () => (
  <Text size={"small"} variant={"bold"}>
    {ipsum}
  </Text>
);

export const Smaller = () => <Text size={"smaller"}>{ipsum}</Text>;

export const SmallerWhite = () => (
  <Text
    size={"smaller"}
    color={cssColor("--lhds-color-ui-50")}
    style={{ background: cssColor("--lhds-color-ui-500") }}
  >
    {ipsum}
  </Text>
);

export const SmallerBold = () => (
  <Text size={"smaller"} variant={"bold"}>
    {ipsum}
  </Text>
);

export const Caption = () => <Text variant={"caption"}>{ipsum}</Text>;

export const Overline = () => <Text variant={"overline"}>{ipsum}</Text>;
