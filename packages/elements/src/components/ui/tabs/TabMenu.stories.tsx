import * as React from "react";
import { useState } from "react";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Space } from "@stenajs-webui/core";
import { Badge } from "../badge/Badge";
import { Tab, TabProps } from "./Tab";
import { TabMenu } from "./TabMenu";
import { Story } from "@storybook/react";
import { disabledControl } from "../../../storybook-helpers/storybook-controls";

export default {
  title: "elements/TabMenu",
  component: Tab,
  subcomponents: { TabMenu },
  argTypes: {
    ref: disabledControl,
    leftWrapperClassName: disabledControl,
    spinnerClassName: disabledControl,
    labelClassName: disabledControl,
    iconClassName: disabledControl,
    rightIcon: disabledControl,
    right: disabledControl,
    leftIcon: disabledControl,
    left: disabledControl,
  },
};

type DemoTab =
  | "Rates"
  | "Routes"
  | "Articles"
  | "Notes"
  | "Conditions"
  | "Matrix";

const demoTabs: Array<DemoTab> = [
  "Rates",
  "Routes",
  "Articles",
  "Notes",
  "Conditions",
  "Matrix",
];

export const Demo: Story<TabProps> = (props) => (
  <TabMenu>
    <Tab {...props} />
  </TabMenu>
);
Demo.args = {
  label: "Some tab",
};

export const Overview = () => {
  const [tab, setTab] = useState<DemoTab>("Rates");

  return (
    <TabMenu>
      {demoTabs.map((t) => (
        <Tab label={t} selected={t === tab} onClick={() => setTab(t)} />
      ))}
    </TabMenu>
  );
};

export const ContentOnSides = () => {
  const [tab, setTab] = useState<DemoTab>("Rates");

  return (
    <TabMenu>
      {demoTabs.map((t, index) => (
        <Tab
          label={t}
          selected={t === tab}
          onClick={() => setTab(t)}
          leftIcon={index === 1 ? faCoffee : undefined}
          right={
            index === 3 ? (
              <>
                <Space />
                <Badge label={"4"} />
              </>
            ) : undefined
          }
        />
      ))}
      <Tab loading />
    </TabMenu>
  );
};
