import {
  Badge,
  Collapsible,
  CollapsibleContent,
  CollapsibleProps
} from "@stenajs-webui/elements";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { Column, Row } from "@stenajs-webui/core";
import { Checkbox, RadioButton, Switch } from "@stenajs-webui/forms";

const StatefulCollapsible: React.FC<CollapsibleProps> = props => {
  const [collapsed, setCollapsed] = useState(Boolean(props.collapsed));

  return (
    <Collapsible
      {...props}
      onClick={() => setCollapsed(!collapsed)}
      collapsed={collapsed}
    />
  );
};

storiesOf("elements/Collapsible", module)
  .add("single", () => {
    return (
      <Column width={300}>
        <StatefulCollapsible label={knobs.text("Label", "Label goes here")}>
          <StatefulCollapsible
            contentLeft={<Checkbox />}
            label={knobs.text("Child label", "Another label goes here")}
            collapsed={false}
          >
            <CollapsibleContent
              contentLeft={<Checkbox />}
              label={"I'm content"}
            />
            <CollapsibleContent
              contentLeft={<Checkbox />}
              label={"I'm content"}
            />
          </StatefulCollapsible>
          <StatefulCollapsible label={"So"}>
            <StatefulCollapsible label={"many"}>
              <StatefulCollapsible label={"levels"}>
                <CollapsibleContent
                  label={"deep"}
                  contentLeft={<RadioButton />}
                />
              </StatefulCollapsible>
            </StatefulCollapsible>
          </StatefulCollapsible>
        </StatefulCollapsible>
      </Column>
    );
  })
  .add("multiple", () => {
    const [expanded, setExpanded] = useState<number[]>([]);

    const onClick = (index: number) => () =>
      setExpanded(expanded => {
        if (expanded.includes(index)) {
          return expanded.filter(i => i !== index);
        } else {
          return [...expanded, index];
        }
      });

    return (
      <Column width={300}>
        <Collapsible
          label={"First label"}
          collapsed={!expanded.includes(0)}
          onClick={onClick(0)}
        >
          <div style={{ padding: 8 }}>I'm a child</div>
        </Collapsible>
        <Collapsible
          label={"Second label"}
          contentRight={<Badge label={7} />}
          collapsed={!expanded.includes(1)}
          onClick={onClick(1)}
        >
          <div style={{ padding: 8 }}>
            <Row
              flex={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <span>Text here</span>
              <Switch />
            </Row>
          </div>
        </Collapsible>
        <Collapsible
          disabled={true}
          label={"Disabled third label"}
          collapsed={!expanded.includes(2)}
          onClick={onClick(2)}
        >
          <div style={{ padding: 8 }}>I'm another child</div>
        </Collapsible>
      </Column>
    );
  });
