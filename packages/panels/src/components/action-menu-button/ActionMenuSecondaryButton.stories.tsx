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
import { ActionMenuSecondaryButton } from "./ActionMenuSecondaryButton";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";

export default {
  title: "panels/ActionMenuSecondaryButton",
  component: ActionMenuSecondaryButton,
};

export const Standard = () => (
  <Box indent={8} display={"inline-block"}>
    <ActionMenuSecondaryButton
      label={"Actions"}
      renderItems={() => (
        <>
          <ActionMenuItem label={"Open"} />
          <ActionMenuItem label={"Save"} icon={faSave} />
          <ActionMenuItem label={"Burn it"} icon={faFire} variant={"danger"} />
          <ActionMenuItem label={"Loading"} loading />
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
        </>
      )}
    />
    <Spacing num={24} />
  </Box>
);

export const Disabled = () => (
  <ActionMenuSecondaryButton
    label={"Disabled"}
    disabled
    renderItems={() => <></>}
  />
);

export const Icons = () => (
  <Box>
    <Spacing>
      <ActionMenuSecondaryButton
        label={"Custom icon"}
        rightIcon={faCoffee}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuSecondaryButton
        label={"Left icon"}
        leftIcon={faCoffee}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuSecondaryButton
        rightIcon={faEllipsisV}
        renderItems={() => <></>}
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
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuSecondaryButton
        label={"Medium"}
        size={"medium"}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuSecondaryButton
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
        renderItems={() => <></>}
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
          <ActionMenuSecondaryButton
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
          <ActionMenuSecondaryButton
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
          <ActionMenuSecondaryButton
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
          <ActionMenuSecondaryButton
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
          <ActionMenuSecondaryButton
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
          <ActionMenuSecondaryButton
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
