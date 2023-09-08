import { CollapsibleButton } from "./CollapsibleButton";
import { CollapsibleGroupBox } from "./CollapsibleGroupBox";
import { Column, Row, Text, useBoolean } from "@stenajs-webui/core";
import * as React from "react";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "panels/CollapsibleButton",
  component: CollapsibleButton,
  subcomponents: {
    CollapsibleGroupBox,
  },
};

export const Overview = () => {
  const [expanded, , , toggle] = useBoolean(false);
  return (
    <Column width={"200px"} gap>
      <CollapsibleButton label={"Just a button"} />

      <CollapsibleButton label={"I have icon"} leftIcon={faChartBar} />

      <CollapsibleButton label={"I am selected"} selected />

      <CollapsibleButton
        label={"Expand me"}
        onClick={toggle}
        expandable
        expanded={expanded}
        selected={expanded}
      >
        <Text>I am great really content!</Text>
      </CollapsibleButton>
    </Column>
  );
};
