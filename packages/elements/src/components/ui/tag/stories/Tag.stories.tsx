import { Column, Indent, Row, Space, Text } from "@stenajs-webui/core";
import { Story } from "@storybook/react";
import * as React from "react";
import { stenaCheck } from "../../../../icons/ui/IconsUi";
import { disabledControl } from "../../../../storybook-helpers/storybook-controls";
import { customTheme } from "./CustomTag.css";
import { Tag, TagProps, TagVariant } from "../Tag";

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
      <Column key={variant}>
        <Text size={"large"}>{variant}</Text>
        <Space />
        {(["medium", "small"] as const).map((size) => (
          <Row spacing={0.5} key={size}>
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
      </Column>
    ))}
  </Column>
);

export const CustomTheme: Story<TagProps> = () => (
  <Tag label={"Economy fare selected"} className={customTheme} />
);
