import { MenuButton } from "./MenuButton";
import { MenuButtonGroupBox } from "./MenuButtonGroupBox";
import { Column, Text, useBoolean } from "@stenajs-webui/core";
import * as React from "react";
import {
  faChartBar,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { MenuButtonLink } from "./MenuButtonLink";

export default {
  title: "elements/MenuButton",
  component: MenuButton,
  subcomponents: {
    CollapsibleGroupBox: MenuButtonGroupBox,
  },
};

export const Overview = () => {
  const [expanded, , , toggle] = useBoolean(false);
  return (
    <Column width={"200px"} gap>
      <MenuButton label={"Just a button"} />

      <MenuButton label={"I have icon"} leftIcon={faChartBar} />

      <MenuButton label={"I am selected"} selected />

      <MenuButton label={"I am disabled"} disabled />

      <MenuButton label={"I am dangerous"} variant={"danger"} />

      <MenuButtonLink
        label={"Link to google"}
        href={"https://www.google.com"}
        target={"_blank"}
        leftIcon={faExternalLinkAlt}
      />

      <MenuButton
        label={"Expand me"}
        onClick={toggle}
        expandable
        expanded={expanded}
        selected={expanded}
      >
        <Text>I am great really content!</Text>
      </MenuButton>
    </Column>
  );
};
