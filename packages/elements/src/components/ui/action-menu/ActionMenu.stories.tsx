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

export default {
  title: "elements/ActionMenu/ActionMenu",
  component: ActionMenu,
  subcomponents: { ActionMenuItem, ActionMenuSeparator },
  parameters: {
    notes: { markdown },
  },
};

export const Standard = () => (
  <ActionMenu>
    <ActionMenuItem label={"Open"} onClick={action("Opened")} />
    <ActionMenuItem label={"Save"} icon={faSave} onClick={action("Saved")} />
    <ActionMenuItem
      label={"Burn it"}
      icon={faFire}
      onClick={action("It was burned!")}
      disabled
    />
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
