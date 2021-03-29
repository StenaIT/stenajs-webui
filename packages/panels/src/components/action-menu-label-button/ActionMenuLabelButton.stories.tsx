import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { Box, Spacing, Text } from "@stenajs-webui/core";
import * as React from "react";
import { ActionMenuItem, ActionMenuSeparator } from "@stenajs-webui/elements";
import { ActionMenuLabelButton } from "./ActionMenuLabelButton";

export default {
  title: "panels/ActionMenuLabelButton",
  component: ActionMenuLabelButton,
};

export const Standard = () => (
  <Box indent={8} spacing={5} display={"inline-block"}>
    <ActionMenuLabelButton
      label={"Actions"}
      renderItems={(close) => (
        <>
          <ActionMenuItem label={"Open"} onClick={close} />
          <ActionMenuItem label={"Save"} icon={faSave} onClick={close} />
          <ActionMenuItem
            label={"Burn it"}
            icon={faFire}
            onClick={close}
            disabled
          />
          <ActionMenuItem
            label={"Click doesn't close"}
            onClick={close}
            disableCloseOnClick
          />
          <ActionMenuItem label={"Disabled"} disabled onClick={close} />
          <ActionMenuItem
            label={"Icon right"}
            onClick={close}
            iconRight={faCheck}
          />
          <ActionMenuItem
            label={"Icon right disabled"}
            onClick={close}
            iconRight={faCheck}
            disabled
          />
          <ActionMenuItem label={"Custom right"} onClick={close}>
            <Text size={"smaller"} color={"tomato"}>
              So custom!
            </Text>
          </ActionMenuItem>
          <ActionMenuSeparator />
          <ActionMenuItem label={"Quit"} rightText={"cmd+q"} onClick={close} />
        </>
      )}
    />
    <Spacing num={20} />
  </Box>
);

export const Disabled = () => (
  <ActionMenuLabelButton disabled renderItems={() => <></>} />
);
