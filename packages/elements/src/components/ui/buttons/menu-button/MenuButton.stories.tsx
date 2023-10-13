import { MenuButton } from "./MenuButton";
import { MenuButtonLink } from "./MenuButtonLink";
import { MenuButtonGroupBox } from "./MenuButtonGroupBox";
import { Column, Text, useBoolean } from "@stenajs-webui/core";
import * as React from "react";
import cx from "classnames";
import {
  stenaExternalLink,
  stenaStatisticsBar,
} from "../../../../icons/ui/IconsUi";
import { InputSpinner } from "../../spinner/InputSpinner";

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
    <Column width={"230px"} gap>
      <MenuButton label={"Just a button"} />

      <MenuButton label={"I have icon"} leftIcon={stenaStatisticsBar} />

      <MenuButton label={"I am selected"} selected />

      <MenuButton label={"I am disabled"} disabled />

      <MenuButton label={"I am dangerous"} variant={"danger"} />

      <MenuButtonLink
        label={"Link to google"}
        href={"https://www.google.com"}
        target={"_blank"}
        leftIcon={stenaExternalLink}
      />

      <MenuButtonLink
        label={"Selected link"}
        href={"https://www.google.com"}
        target={"_blank"}
        selected
        leftIcon={stenaExternalLink}
      />

      <MenuButtonLink
        label={"I am custom link"}
        href={"https://www.google.com"}
        target={"_blank"}
        leftIcon={stenaExternalLink}
        renderLink={({ className, children, ...anchorProps }) => (
          <a
            {...anchorProps}
            className={className}
            onClick={() => alert("I am so custom!")}
          >
            {children}
          </a>
        )}
      />

      <MenuButtonLink
        label={"I am custom selected"}
        href={"https://www.google.com"}
        target={"_blank"}
        leftIcon={stenaExternalLink}
        renderLink={(
          { className, children, ...anchorProps },
          activeClassName
        ) => (
          <a
            {...anchorProps}
            className={cx(className, activeClassName)}
            onClick={() => alert("I am so custom!")}
          >
            {children}
          </a>
        )}
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

      <MenuButton left={<InputSpinner />} label={"Content left"} />
    </Column>
  );
};
