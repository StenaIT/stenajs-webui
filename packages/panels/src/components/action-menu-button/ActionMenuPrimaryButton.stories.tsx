import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { Box, Spacing, Text } from "@stenajs-webui/core";
import * as React from "react";
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
} from "@stenajs-webui/elements";
import { ActionMenuPrimaryButton } from "./ActionMenuPrimaryButton";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";

export default {
  title: "panels/ActionMenuPrimaryButton",
  component: ActionMenuPrimaryButton,
};

export const Standard = () => (
  <Box indent={8} display={"inline-block"}>
    <ActionMenuPrimaryButton
      label={"Actions"}
      renderItems={() => (
        <ActionMenu>
          <ActionMenuItem label={"Open"} />
          <ActionMenuItem label={"Save"} icon={faSave} />
          <ActionMenuItem label={"Burn it"} icon={faFire} variant={"danger"} />
          <ActionMenuItem label={"Disabled"} disabled />
          <ActionMenuItem label={"Icon right"} iconRight={faCheck} />
          <ActionMenuItem
            label={"Icon right disabled"}
            iconRight={faCheck}
            disabled
          />
          <ActionMenuItem label={"Custom right"}>
            <Text size={"smaller"} color={"tomato"}>
              So custom!
            </Text>
          </ActionMenuItem>
          <ActionMenuSeparator />
          <ActionMenuItem label={"Quit"} rightText={"cmd+q"} />
        </ActionMenu>
      )}
    />
    <Spacing num={21} />
  </Box>
);

export const Disabled = () => (
  <ActionMenuPrimaryButton
    label={"Disabled"}
    disabled
    renderItems={() => <ActionMenu></ActionMenu>}
  />
);

export const Icons = () => (
  <Box>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Custom icon"}
        rightIcon={faCoffee}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Left icon"}
        leftIcon={faCoffee}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        rightIcon={faEllipsisV}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
  </Box>
);

export const Sizes = () => (
  <Box>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Small"}
        size={"small"}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Medium"}
        size={"medium"}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Large"}
        size={"large"}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
  </Box>
);

export const CustomContent = () => (
  <Box>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Left content"}
        left={
          <Text
            size={"smaller"}
            variant={"bold"}
            color={"var(--lhds-color-orange-300)"}
          >
            So custom!
          </Text>
        }
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Right content"}
        right={
          <Text
            size={"smaller"}
            variant={"bold"}
            color={"var(--lhds-color-orange-300)"}
          >
            So custom!
          </Text>
        }
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
  </Box>
);

export const Variants = () => (
  <Box>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Normal"}
        variant={"normal"}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Success"}
        variant={"success"}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Danger"}
        variant={"danger"}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
  </Box>
);
