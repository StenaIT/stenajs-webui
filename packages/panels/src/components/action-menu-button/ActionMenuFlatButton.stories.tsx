import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { Box, Heading, Row, Space, Spacing, Text } from "@stenajs-webui/core";
import * as React from "react";
import {
  ActionMenuItem,
  ActionMenuLink,
  ActionMenuSeparator,
} from "@stenajs-webui/elements";
import { ActionMenuFlatButton } from "./ActionMenuFlatButton";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";

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
          <ActionMenuItem label={"Loading"} loading onClick={close} />
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
    <Spacing num={24} />
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

export const PortalTarget = () => {
  const portalTarget =
    document.getElementById("action-menu-portal") ?? document.body;

  return (
    <Box>
      <Box>
        <Heading>Default target</Heading>
        <Space />
        <Text>Try navigating with the keyboard.</Text>
        <Space num={2} />
        <Row>
          <ActionMenuFlatButton
            label={"Buttons first"}
            renderItems={(close) => (
              <>
                <ActionMenuItem label={"Do nothing"} icon={faCoffee} disabled />
                <ActionMenuItem
                  label={"Do something"}
                  icon={faFire}
                  onClick={close}
                />
                <ActionMenuLink
                  label={"Go somewhere"}
                  icon={faExternalLinkAlt}
                  href={"#"}
                  onClick={close}
                />
              </>
            )}
          />
          <Space num={2} />
          <ActionMenuFlatButton
            label={"Links first"}
            renderItems={(close) => (
              <>
                <ActionMenuLink
                  label={"Don't go"}
                  icon={faExternalLinkAlt}
                  disabled
                />
                <ActionMenuLink
                  label={"Go somewhere"}
                  icon={faExternalLinkAlt}
                  href={"#"}
                  onClick={close}
                />
                <ActionMenuItem
                  label={"Do something"}
                  icon={faFire}
                  onClick={close}
                />
              </>
            )}
          />
          <Space num={2} />
          <ActionMenuFlatButton
            label={"All disabled"}
            renderItems={() => (
              <>
                <ActionMenuLink
                  label={"Don't go"}
                  icon={faExternalLinkAlt}
                  disabled
                />
                <ActionMenuItem label={"Do nothing"} icon={faCoffee} disabled />
              </>
            )}
          />
        </Row>
        <Space num={11} />
      </Box>
      <Box>
        <Heading>Portal target</Heading>
        <Space />
        <Text>Try navigating with the keyboard.</Text>
        <Space num={2} />
        <Row>
          <ActionMenuFlatButton
            label={"Action button"}
            portalTarget={portalTarget}
            renderItems={(close) => (
              <>
                <ActionMenuItem
                  label={"Do something"}
                  icon={faFire}
                  onClick={close}
                />
                <ActionMenuLink
                  label={"Go somewhere"}
                  icon={faExternalLinkAlt}
                  href={"#"}
                  onClick={close}
                />
              </>
            )}
          />
          <Space num={2} />
          <ActionMenuFlatButton
            label={"Next button"}
            portalTarget={portalTarget}
            renderItems={(close) => (
              <>
                <ActionMenuItem
                  label={"Do something"}
                  icon={faFire}
                  onClick={close}
                />
                <ActionMenuLink
                  label={"Go somewhere"}
                  icon={faExternalLinkAlt}
                  href={"#"}
                  onClick={close}
                />
              </>
            )}
          />
          <Space num={2} />
          <ActionMenuFlatButton
            label={"All disabled"}
            portalTarget={portalTarget}
            renderItems={() => (
              <>
                <ActionMenuLink
                  label={"Don't go"}
                  icon={faExternalLinkAlt}
                  disabled
                />
                <ActionMenuItem label={"Do nothing"} icon={faCoffee} disabled />
              </>
            )}
          />
        </Row>
        <Space num={11} />
      </Box>
      <div id={"action-menu-portal"} />
    </Box>
  );
};
