import { Column, Indent, Row, Space, Text } from "@stenajs-webui/core";
import { Tag, TagVariant } from "@stenajs-webui/elements";
import * as React from "react";

export default {
  title: "elements/Tag",
};

export const Overview = () => (
  <Column>
    {(["info", "error", "warning", "success", "passive"] as Array<
      TagVariant
    >).map((variant) => (
      <>
        <Text size={"large"}>{variant}</Text>
        <Space />
        {(["normal", "small"] as const).map((size) => (
          <Row spacing={0.5}>
            <Row alignItems={"center"} width={"65px"}>
              <Text>{size}</Text>
            </Row>
            <Indent />
            <div className={"indent-items"}>
              <Tag size={size} variant={variant} label={"Default"} />
            </div>
          </Row>
        ))}

        <Space num={3} />
      </>
    ))}
  </Column>
);
