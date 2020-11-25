import { Column, Indent, Text, Row, Space } from "@stenajs-webui/core";
import { Chip, ChipVariant } from "@stenajs-webui/elements";
import * as React from "react";

export default {
  title: "elements/Chip",
};

export const Overview = () => (
  <Column>
    {(["primary", "secondary"] as Array<ChipVariant>).map((variant) => (
      <>
        <Text size={"large"}>{variant}</Text>
        <Space />
        <Row spacing={0.5}>
          <Indent />
          <div className={"indent-items"}>
            <Chip variant={variant} label={"Default"} />
            <Chip
              variant={variant}
              label={"With onClick"}
              onClick={() => alert("hello world")}
            />
            <Chip
              variant={variant}
              label={"With onClickRemove"}
              onClickRemove={() => alert("remove")}
            />
            <Chip
              variant={variant}
              label={"With both"}
              onClick={() => alert("hello world")}
              onClickRemove={() => alert("remove")}
            />
          </div>
        </Row>

        <Space num={3} />
      </>
    ))}
  </Column>
);
