import * as React from "react";
import { ReactNode } from "react";
import { Row, Space, Text } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";

interface SelectedItemsActionsProps {
  numItemsSelected?: number;
  label?: ReactNode | string;
  afterLabelContent?: ReactNode;
  rightContent?: ReactNode;
}

export const SelectedItemsActionsPanel: React.FC<SelectedItemsActionsProps> = ({
  numItemsSelected,
  label,
  afterLabelContent,
  rightContent,
}) => (
  <Row
    indent={3}
    spacing
    gap={3}
    minHeight={"56px"}
    justifyContent={"space-between"}
    alignItems={"center"}
    background={cssColor("--silver-lighter")}
    flex={1}
    borderRadius={"var(--swui-border-radius)"}
  >
    <Row alignItems={"center"} gap={2}>
      {numItemsSelected != null || label != null ? (
        <Row alignItems={"center"}>
          {numItemsSelected != null ? (
            <>
              <Text>{numItemsSelected}</Text>
              <Space />
              <Text>item{numItemsSelected === 1 ? "" : "s"} selected</Text>
            </>
          ) : label != null ? (
            <>{typeof label === "string" ? <Text>{label}</Text> : label}</>
          ) : null}
        </Row>
      ) : null}
      {afterLabelContent && <Row>{afterLabelContent}</Row>}
    </Row>
    <Row gap={2}>{rightContent}</Row>
  </Row>
);
