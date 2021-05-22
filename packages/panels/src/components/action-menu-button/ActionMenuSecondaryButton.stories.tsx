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
import { ActionMenuSecondaryButton } from "./ActionMenuSecondaryButton";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";

export default {
  title: "panels/ActionMenuSecondaryButton",
  component: ActionMenuSecondaryButton,
};

export const Standard = () => (
  <Box indent={8} display={"inline-block"}>
    <ActionMenuSecondaryButton
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
  <ActionMenuSecondaryButton
    label={"Disabled"}
    disabled
    renderItems={() => <ActionMenu></ActionMenu>}
  />
);

export const Icons = () => (
  <Box>
    <Spacing>
      <ActionMenuSecondaryButton
        label={"Custom icon"}
        rightIcon={faCoffee}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuSecondaryButton
        label={"Left icon"}
        leftIcon={faCoffee}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuSecondaryButton
        rightIcon={faEllipsisV}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
  </Box>
);

export const Sizes = () => (
  <Box>
    <Spacing>
      <ActionMenuSecondaryButton
        label={"Small"}
        size={"small"}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuSecondaryButton
        label={"Medium"}
        size={"medium"}
        renderItems={() => <ActionMenu></ActionMenu>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuSecondaryButton
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
      <ActionMenuSecondaryButton
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
      <ActionMenuSecondaryButton
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
