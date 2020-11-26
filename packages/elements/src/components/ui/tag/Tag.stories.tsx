import * as React from "react";
import { Column, Indent, Row, Space, Text } from "@stenajs-webui/core";
import { Tag, TagProps, TagVariant } from "./Tag";
import { Story } from "@storybook/react";
import { disabledControl } from "../../../../../../storybook-helpers/storybook-controls";

export default {
  title: "elements/Tag",
  component: Tag,
  argTypes: {
    className: disabledControl,
  },
  args: {
    label: "Text",
  },
};

export const Demo: Story<TagProps> = (props) => <Tag {...props} />;

export const Overview = () => (
  <Column>
    {([
      "info",
      "error",
      "warning",
      "success",
      "passive",
    ] as Array<TagVariant>).map((variant) => (
      <>
        <Text size={"large"}>{variant}</Text>
        <Space />
        {(["medium", "small"] as const).map((size) => (
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
