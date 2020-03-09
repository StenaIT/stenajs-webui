import { faInbox } from "@fortawesome/free-solid-svg-icons/faInbox";
import { Column } from "@stenajs-webui/core";
import * as React from "react";
import { Icon } from "@stenajs-webui/elements";

interface Props {}

export const CollapsibleEmptyContent: React.FC<Props> = () => {
  return (
    <Column
      indent={1}
      spacing={1}
      flex={1}
      alignItems={"center"}
      style={{ opacity: 0.5 }}
    >
      <Icon icon={faInbox} />
      <span>No content</span>
    </Column>
  );
};
