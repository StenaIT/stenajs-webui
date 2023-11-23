import { MenuButton } from "./MenuButton";
import { MenuButtonLink } from "./MenuButtonLink";
import { MenuButtonGroupBox } from "./MenuButtonGroupBox";
import { Column, Text, useBoolean, useTimeoutState } from "@stenajs-webui/core";
import * as React from "react";
import cx from "classnames";
import {
  stenaCheck,
  stenaCopy,
  stenaExternalLink,
  stenaStatisticsBar,
} from "../../../../icons/generated/CommonIcons";
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
  const [copyClicked, setCopyClicked] = useTimeoutState(false, 3000);
  return (
    <Column width={"230px"} gap>
      <MenuButton label={"Just a button"} />

      <MenuButton label={"I have icon"} leftIcon={stenaStatisticsBar} />

      <MenuButton label={"I am selected"} selected />

      <MenuButton label={"I am disabled"} disabled />

      <MenuButton label={"I am dangerous"} variant={"danger"} />

      <MenuButton
        label={"Copy value"}
        success={copyClicked}
        variant={copyClicked ? "success" : undefined}
        leftIcon={stenaCopy}
        onClick={() => setCopyClicked(true)}
      />

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

      <MenuButton loading label={"Content left"} />
    </Column>
  );
};
