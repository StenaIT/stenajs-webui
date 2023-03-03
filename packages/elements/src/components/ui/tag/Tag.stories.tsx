import { Column, Indent, Row, Space, Text } from "@stenajs-webui/core";
import { Story } from "@storybook/react";
import * as React from "react";
import { CSSProperties } from "react";
import { stenaCheck } from "../../../icons/ui/IconsUi";
import { disabledControl } from "../../../storybook-helpers/storybook-controls";
import { Tag, TagProps, TagVariant } from "./Tag";

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
    {(
      ["info", "error", "warning", "success", "passive"] as Array<TagVariant>
    ).map((variant) => (
      <>
        <Text size={"large"}>{variant}</Text>
        <Space />
        {(["medium", "small"] as const).map((size) => (
          <Row spacing={0.5}>
            <Row alignItems={"center"} width={"65px"}>
              <Text>{size}</Text>
            </Row>
            <Indent />

            <Tag size={size} variant={variant} label={"Default"} />
            <Indent />
            <Tag
              size={size}
              variant={variant}
              label={"Default"}
              icon={stenaCheck}
            />
          </Row>
        ))}

        <Space num={3} />
      </>
    ))}
  </Column>
);

export const CustomTheme: Story<TagProps> = () => (
  <Tag
    style={
      {
        "--swui-tag-font-size": "1.4rem",
        "--swui-tag-bg-color": "#F4F4F4",
        "--swui-tag-text-color": "#123D66",
        "--swui-tag-border-radius": "8px",
        "--swui-tag-indent": "4px",
      } as CSSProperties
    }
    label={"Economy fare selected"}
  />
);
