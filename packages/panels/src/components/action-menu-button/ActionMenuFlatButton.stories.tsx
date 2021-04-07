import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { Box, Spacing, Text } from "@stenajs-webui/core";
import * as React from "react";
import { ActionMenuItem, ActionMenuSeparator } from "@stenajs-webui/elements";
import { ActionMenuFlatButton } from "./ActionMenuFlatButton";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";

export default {
  title: "panels/ActionMenuFlatButton",
  component: ActionMenuFlatButton,
};

export const Standard = () => (
  <Box indent={8} display={"inline-block"}>
    <ActionMenuFlatButton
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
  <ActionMenuFlatButton label={"Disabled"} disabled renderItems={() => <></>} />
);

export const Icons = () => (
  <Box>
    <Spacing>
      <ActionMenuFlatButton
        label={"Custom icon"}
        rightIcon={faCoffee}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuFlatButton
        label={"Left icon"}
        leftIcon={faCoffee}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuFlatButton rightIcon={faEllipsisV} renderItems={() => <></>} />
    </Spacing>
  </Box>
);

export const Sizes = () => (
  <Box>
    <Spacing>
      <ActionMenuFlatButton
        label={"Small"}
        size={"small"}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuFlatButton
        label={"Medium"}
        size={"medium"}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuFlatButton
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
      <ActionMenuFlatButton
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
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuFlatButton
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
        renderItems={() => <></>}
      />
    </Spacing>
  </Box>
);
