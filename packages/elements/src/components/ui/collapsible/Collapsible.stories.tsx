import { Badge, Collapsible } from "@stenajs-webui/elements";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { Store, withState } from "@dump247/storybook-state";
import { Column, Row } from "@stenajs-webui/core";
import { Switch } from "@stenajs-webui/forms";

interface State {
  expanded: number;
}

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
  .add(
    "multiple",
    withState<State>({
      expanded: 0
    })(({ store }: { store: Store<State> }) => (
      <Column width={300}>
        <Collapsible
          label={"First label (expanded by default)"}
          collapsed={store.state.expanded !== 0}
          onClick={() =>
            store.set({ expanded: store.state.expanded === 0 ? -1 : 0 })
          }
        >
          <div style={{ padding: 8 }}>I'm a child</div>
        </Collapsible>
        <Collapsible
          label={"Second label"}
          contentRight={<Badge label={7} />}
          collapsed={store.state.expanded !== 1}
          onClick={() =>
            store.set({ expanded: store.state.expanded === 1 ? -1 : 1 })
          }
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
          collapsed={store.state.expanded !== 2}
          onClick={() => store.set({ expanded: 2 })}
        >
          <div style={{ padding: 8 }}>I'm another child</div>
        </Collapsible>
      </Column>
    ))
  );
