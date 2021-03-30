import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { Box, Spacing, Text } from "@stenajs-webui/core";
import * as React from "react";
import { ActionMenuItem, ActionMenuSeparator } from "@stenajs-webui/elements";
import { ActionMenuLabelButton } from "./ActionMenuLabelButton";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";

export default {
  title: "panels/ActionMenuLabelButton",
  component: ActionMenuLabelButton,
};

export const Standard = () => (
  <Box indent={8} display={"inline-block"}>
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
            variant={"danger"}
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
    <Spacing num={21} />
  </Box>
);

export const Disabled = () => (
  <ActionMenuLabelButton
    label={"Disabled"}
    disabled
    renderItems={() => <></>}
  />
);

export const Icons = () => (
  <Box>
    <Spacing>
      <ActionMenuLabelButton
        label={"Custom icon"}
        rightIcon={faCoffee}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuLabelButton
        label={"Left icon"}
        leftIcon={faCoffee}
        renderItems={() => <></>}
      />
    </Spacing>
  </Box>
);

export const Sizes = () => (
  <Box>
    <Spacing>
      <ActionMenuLabelButton
        label={"Small"}
        size={"small"}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuLabelButton
        label={"Medium"}
        size={"medium"}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuLabelButton
        label={"Large"}
        size={"large"}
        renderItems={() => <></>}
      />
    </Spacing>
  </Box>
);

export const CustomContent = () => (
  <Box>
    <Spacing>
      <ActionMenuLabelButton
        label={"Left content"}
        left={
          <Text size={"smaller"} color={"tomato"}>
            So custom!
          </Text>
        }
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuLabelButton
        label={"Right content"}
        right={
          <Text size={"smaller"} color={"tomato"}>
            So custom!
          </Text>
        }
        renderItems={() => <></>}
      />
    </Spacing>
  </Box>
);
