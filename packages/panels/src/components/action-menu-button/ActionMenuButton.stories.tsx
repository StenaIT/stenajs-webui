import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { Box, TinyText } from "@stenajs-webui/core";
import { ActionMenuItem, ActionMenuSeparator } from "@stenajs-webui/elements";
import * as React from "react";
import { ActionMenuButton } from "@stenajs-webui/panels";

export default {
  title: "panels/ActionMenuButton",
};

export const Standard = () => (
  <Box indent={8} spacing={5} display={"inline-block"}>
    <ActionMenuButton
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
            <TinyText color={"tomato"}>So custom!</TinyText>
          </ActionMenuItem>
          <ActionMenuSeparator />
          <ActionMenuItem label={"Quit"} rightText={"cmd+q"} onClick={close} />
        </>
      )}
    ></ActionMenuButton>
  </Box>
);

export const Disabled = () => (
  <ActionMenuButton disabled renderItems={() => <></>} />
);
