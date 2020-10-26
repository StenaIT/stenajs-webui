import * as React from "react";
import { useState } from "react";
import { Badge, Tab, TabMenu } from "@stenajs-webui/elements";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Space } from "@stenajs-webui/core";

export default {
  title: "elements/TabMenu",
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

export const Standard = () => {
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
    </TabMenu>
  );
};
