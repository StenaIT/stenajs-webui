import { Column, Space, Text } from "@stenajs-webui/core";
import { Icon, stenaMail } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";

interface Props {}

export const CollapsibleEmptyContent: React.FC<Props> = () => {
  return (
    <Column indent spacing flex={1} alignItems={"center"}>
      <Icon icon={stenaMail} color={cssColor("--lhds-color-ui-500")} />
      <Space />
      <Text size={"small"} color={cssColor("--lhds-color-ui-500")}>
        No content
      </Text>
    </Column>
  );
};
