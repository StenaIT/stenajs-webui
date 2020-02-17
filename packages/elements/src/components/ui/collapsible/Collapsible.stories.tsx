import { Badge, Collapsible } from "@stenajs-webui/elements";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { Column, Row } from "@stenajs-webui/core";
import { Switch } from "@stenajs-webui/forms";

storiesOf("elements/Collapsible", module)
  .add("single", () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Column width={300}>
        <Collapsible
          label={knobs.text("Label", "Label goes here")}
          onClick={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        >
          <Row indent={1} spacing={1}>
            I'm a child
          </Row>
        </Collapsible>
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
