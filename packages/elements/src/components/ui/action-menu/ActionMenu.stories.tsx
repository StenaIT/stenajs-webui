import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { Text } from "@stenajs-webui/core";
import { action } from "@storybook/addon-actions";
import { ActionMenuItem } from "./ActionMenuItem";
import { ActionMenu } from "./ActionMenu";
import { ActionMenuSeparator } from "./ActionMenuSeparator";
import * as React from "react";
import markdown from "./ActionMenu.md";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { ActionMenuLink } from "./ActionMenuLink";

export default {
  title: "elements/ActionMenu/ActionMenu",
  component: ActionMenu,
  subcomponents: { ActionMenuItem, ActionMenuSeparator },
  parameters: {
    notes: { markdown },
  },
};

export const Standard = () => (
  <ActionMenu width={200}>
    <ActionMenuItem
      id={"action-menu-item-open"}
      label={"Open"}
      onClick={action("Opened")}
    />
    <ActionMenuItem label={"Save"} icon={faSave} onClick={action("Saved")} />
    <ActionMenuLink
      label={"Open new window"}
      icon={faExternalLinkAlt}
      href={"https://www.google.com"}
      target={"_blank"}
    />
    <ActionMenuLink
      label={"Open new window"}
      disabled
      icon={faExternalLinkAlt}
      href={"https://www.google.com"}
      target={"_blank"}
    />
    <ActionMenuItem
      label={"Burn it"}
      icon={faFire}
      onClick={action("It was burned!")}
      variant={"danger"}
    />
    <ActionMenuItem label={"Loading"} loading onClick={action("Loading")} />
    <ActionMenuItem
      label={"Click doesn't close"}
      onClick={action("I didn't close the menu!")}
      disableCloseOnClick
    />
    <ActionMenuItem
      label={"Disabled"}
      disabled
      onClick={action("I can never happen!")}
    />
    <ActionMenuItem
      label={"Icon right"}
      onClick={action("Icon right clicked")}
      iconRight={faCheck}
    />
    <ActionMenuItem
      label={"Icon right disabled"}
      onClick={action("I can never happen again!")}
      iconRight={faCheck}
      disabled
    />
    <ActionMenuItem
      label={"Custom right"}
      onClick={action("I am very special!")}
    >
      <Text size={"smaller"} color={"tomato"}>
        So custom!
      </Text>
    </ActionMenuItem>
    <ActionMenuSeparator />
    <ActionMenuItem
      label={"Quit"}
      rightText={"cmd+q"}
      onClick={action("All stop!")}
    />{" "}
  </ActionMenu>
);

export const Outlined = () => (
  <ActionMenu width={200} variant={"outlined"}>
    <ActionMenuItem
      id={"action-menu-item-open"}
      label={"Open"}
      onClick={action("Opened")}
    />
    <ActionMenuItem label={"Save"} icon={faSave} onClick={action("Saved")} />
    <ActionMenuLink
      label={"Open new window"}
      icon={faExternalLinkAlt}
      href={"https://www.google.com"}
      target={"_blank"}
    />
    <ActionMenuLink
      label={"Open new window"}
      disabled
      icon={faExternalLinkAlt}
      href={"https://www.google.com"}
      target={"_blank"}
    />
    <ActionMenuItem
      label={"Burn it"}
      icon={faFire}
      onClick={action("It was burned!")}
      variant={"danger"}
    />
    <ActionMenuItem label={"Loading"} loading onClick={action("Loading")} />
    <ActionMenuItem
      label={"Click doesn't close"}
      onClick={action("I didn't close the menu!")}
      disableCloseOnClick
    />
    <ActionMenuItem
      label={"Disabled"}
      disabled
      onClick={action("I can never happen!")}
    />
    <ActionMenuItem
      label={"Icon right"}
      onClick={action("Icon right clicked")}
      iconRight={faCheck}
    />
    <ActionMenuItem
      label={"Icon right disabled"}
      onClick={action("I can never happen again!")}
      iconRight={faCheck}
      disabled
    />
    <ActionMenuItem
      label={"Custom right"}
      onClick={action("I am very special!")}
    >
      <Text size={"smaller"} color={"tomato"}>
        So custom!
      </Text>
    </ActionMenuItem>
    <ActionMenuSeparator />
    <ActionMenuItem
      label={"Quit"}
      rightText={"cmd+q"}
      onClick={action("All stop!")}
    />{" "}
  </ActionMenu>
);
