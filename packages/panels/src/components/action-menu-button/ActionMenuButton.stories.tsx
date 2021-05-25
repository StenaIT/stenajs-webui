import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { Box, Heading, Row, Space, Spacing, Text } from "@stenajs-webui/core";
import * as React from "react";
import {
  ActionMenuItem,
  ActionMenuLink,
  ActionMenuSeparator,
  ActionMenuItemNoButton,
  ButtonGroup,
  SecondaryButton,
  PrimaryButton,
} from "@stenajs-webui/elements";
import { ActionMenuPrimaryButton } from "./ActionMenuPrimaryButton";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";
import { ActionMenuFlatButton } from "./ActionMenuFlatButton";
import { ActionMenuSecondaryButton } from "./ActionMenuSecondaryButton";

export default {
  title: "panels/ActionMenuButton",
  component: ActionMenuPrimaryButton,
};

export const Overview = () => (
  <>
    {[
      {
        ButtonVariant: ActionMenuPrimaryButton,
        label: "ActionMenuPrimaryButton",
      },
      {
        ButtonVariant: ActionMenuSecondaryButton,
        label: "ActionMenuSecondaryButton",
      },
      { ButtonVariant: ActionMenuFlatButton, label: "ActionMenuFlatButton" },
    ].map(({ label, ButtonVariant }) => (
      <Box indent={8} display={"inline-block"}>
        <ButtonVariant
          label={label}
          renderItems={() => (
            <>
              <ActionMenuItem label={"Open"} />
              <ActionMenuItem label={"Save"} icon={faSave} />
              <ActionMenuItem
                label={"Don't close on click"}
                disableCloseOnClick
                icon={faCoffee}
              />
              <ActionMenuItem
                label={"Burn it"}
                icon={faFire}
                variant={"danger"}
              />
              <ActionMenuItem label={"Loading"} loading />
              <ActionMenuItem label={"Disabled"} disabled />
              <ActionMenuItem label={"Icon right"} iconRight={faCheck} />
              <ActionMenuItemNoButton label={"Content right"}>
                <ButtonGroup>
                  <PrimaryButton size={"small"} label={"S"} />
                  <SecondaryButton size={"small"} label={"M"} />
                  <SecondaryButton size={"small"} label={"L"} />
                </ButtonGroup>
              </ActionMenuItemNoButton>
              <ActionMenuItemNoButton label={"Content right very much text"}>
                <ButtonGroup>
                  <SecondaryButton size={"small"} label={"25"} />
                  <PrimaryButton size={"small"} label={"50"} />
                  <SecondaryButton size={"small"} label={"100"} />
                </ButtonGroup>
              </ActionMenuItemNoButton>
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
      </Box>
    ))}
    <Spacing num={24} />
  </>
);

export const Disabled = () => (
  <ActionMenuPrimaryButton
    label={"Disabled"}
    disabled
    renderItems={() => <></>}
  />
);

export const Icons = () => (
  <Box>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Custom icon"}
        rightIcon={faCoffee}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Left icon"}
        leftIcon={faCoffee}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        rightIcon={faEllipsisV}
        renderItems={() => <></>}
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
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Medium"}
        size={"medium"}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
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
        renderItems={() => <></>}
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
        renderItems={() => <></>}
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
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Success"}
        variant={"success"}
        renderItems={() => <></>}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Danger"}
        variant={"danger"}
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
          <ActionMenuPrimaryButton
            label={"Buttons first"}
            renderItems={() => (
              <>
                <ActionMenuItem label={"Do nothing"} icon={faCoffee} disabled />
                <ActionMenuItem label={"Do something"} icon={faFire} />
                <ActionMenuLink
                  label={"Go somewhere"}
                  icon={faExternalLinkAlt}
                  href={"#"}
                />
              </>
            )}
          />
          <Space num={2} />
          <ActionMenuPrimaryButton
            label={"Links first"}
            renderItems={() => (
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
                />
                <ActionMenuItem label={"Do something"} icon={faFire} />
              </>
            )}
          />
          <Space num={2} />
          <ActionMenuPrimaryButton
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
          <ActionMenuPrimaryButton
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
          <ActionMenuPrimaryButton
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
          <ActionMenuPrimaryButton
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
