import { Badge, Collapsible } from "@stenajs-webui/elements";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Store, withState } from "@dump247/storybook-state";
import { Column, Row } from "@stenajs-webui/core";
import { Switch } from "@stenajs-webui/forms";

interface State {
  expanded: number;
}

storiesOf("elements/Collapsible", module)
  .add("standard", () => (
    <Collapsible
      label={knobs.text("label", "Label goes here")}
      collapsed={knobs.boolean("collapsed", false)}
    >
      <div>I'm a child</div>
    </Collapsible>
  ))
  .add(
    "accordion",
    withState<State>({
      expanded: 0
    })(({ store }: { store: Store<State> }) => (
      <Column width={300}>
        <Collapsible
          label={"First label (expanded by default)"}
          collapsed={store.state.expanded !== 0}
          onCollapse={() => store.set({ expanded: 0 })}
        >
          <div style={{ padding: 8 }}>I'm a child</div>
        </Collapsible>
        <Collapsible
          label={"Second label"}
          contentRight={<Badge label={7} />}
          collapsed={store.state.expanded !== 1}
          onCollapse={() => store.set({ expanded: 1 })}
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
          onCollapse={() => store.set({ expanded: 2 })}
        >
          <div style={{ padding: 8 }}>I'm another child</div>
        </Collapsible>
      </Column>
    ))
  );
