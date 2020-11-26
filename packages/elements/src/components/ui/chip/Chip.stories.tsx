import * as React from "react";
import { Column, Indent, Row, Space, Text } from "@stenajs-webui/core";
import { Chip, ChipProps, ChipVariant } from "./Chip";
import { Story } from "@storybook/react";
import { disabledControl } from "../../../storybook-helpers/storybook-controls";

export default {
  title: "elements/Chip",
  component: Chip,
  argTypes: {
    className: disabledControl,
    onClick: disabledControl,
    onClickRemove: disabledControl,
  },
  args: {
    label: "Some text",
  },
};
export const Demo: Story<ChipProps> = (props) => (
  <Chip {...props} onClick={() => {}} onClickRemove={() => {}} />
);

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
