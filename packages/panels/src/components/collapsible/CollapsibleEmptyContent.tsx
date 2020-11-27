import { faInbox } from "@fortawesome/free-solid-svg-icons/faInbox";
import { Column, Text, Space } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";

interface Props {}

export const CollapsibleEmptyContent: React.FC<Props> = () => {
  return (
    <Column indent spacing flex={1} alignItems={"center"}>
      <Icon icon={faInbox} color={"var(--lhds-color-ui-500)"} />
      <Space />
      <Text size={"small"} color={"var(--lhds-color-ui-500)"}>
        No content
      </Text>
    </Column>
  );
};
