import * as React from "react";
import { Box, Indent, Row, Space, Text } from "@stenajs-webui/core";
import { ReactNode } from "react";
import { cssColor } from "@stenajs-webui/theme";

interface SelectedItemsActionsProps {
  numItemsSelected?: number;
  label?: ReactNode | string;
  afterLabelContent?: ReactNode;
  rightContent?: ReactNode;
}

const borderTop = `1px solid ${cssColor("--lhds-color-orange-400")}`;

export const SelectedItemsActionsPanel: React.FC<SelectedItemsActionsProps> = ({
  numItemsSelected,
  label,
  afterLabelContent,
  rightContent,
}) => (
  <Row
    indent={3}
    spacing
    minHeight={"56px"}
    justifyContent={"space-between"}
    alignItems={"center"}
    borderTop={borderTop}
    background={cssColor("--lhds-color-orange-50")}
  >
    <Row alignItems={"center"}>
      {numItemsSelected != null || label != null ? (
        <>
          {numItemsSelected != null ? (
            <>
              <Text variant={"bold"}>{numItemsSelected}</Text>
              <Space />
              <Text>item{numItemsSelected === 1 ? "" : "s"} selected</Text>
            </>
          ) : label != null ? (
            <>{typeof label === "string" ? <Text>{label}</Text> : label}</>
          ) : null}
        </>
      ) : null}
      {afterLabelContent ? (
        <>
          <Indent />
          <Box>{afterLabelContent}</Box>
        </>
      ) : null}
    </Row>
    <Box>{rightContent}</Box>
  </Row>
);
