import { Column, Indent, Row, Space, Text } from "@stenajs-webui/core";
import { StoryFn } from "@storybook/react";
import * as React from "react";
import { CSSProperties } from "react";
import { disabledControl } from "../../../storybook-helpers/storybook-controls";
import { Tag, TagProps, TagVariant } from "./Tag";
import { stenaSailingOnQuay } from "../../../icons/generated/CommonIcons";

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

export const Overview = () => (
  <>
    {(
      [
        ["info", "info-strong"],
        ["error", "error-strong"],
        ["warning", "warning-strong"],
        ["success", "success-strong"],
        ["passive"],
      ] as Array<Array<TagVariant>>
    ).map((tuple) => (
      <Row gap={4}>
        {tuple.map((variant) => (
          <Column>
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
                    icon={stenaSailingOnQuay}
                  />
                  <Indent />
                  <Tag
                    size={size}
                    variant={variant}
                    icon={stenaSailingOnQuay}
                  />
                </Row>
              ))}

              <Space num={3} />
            </>
          </Column>
        ))}
      </Row>
    ))}
  </>
);

export const CustomTheme: StoryFn<TagProps> = () => (
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
