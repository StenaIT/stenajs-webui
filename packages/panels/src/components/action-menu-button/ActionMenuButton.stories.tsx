import {
  ActionMenuItem,
  ActionMenuItemContent,
  ActionMenuLink,
  ActionMenuSeparator,
  ButtonGroup,
  stenaBusinessClaim,
  stenaSave,
  stenaTrash,
  ToggleButton,
} from "@stenajs-webui/elements";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import {
  Box,
  Column,
  Heading,
  Row,
  Space,
  Spacing,
  Txt,
} from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { useState } from "react";
import { ActionMenuFlatButton } from "./ActionMenuFlatButton";
import { ActionMenuPrimaryButton } from "./ActionMenuPrimaryButton";
import { ActionMenuSecondaryButton } from "./ActionMenuSecondaryButton";

export default {
  title: "panels/ActionMenuButton",
  component: ActionMenuPrimaryButton,
};

const renderContent = (close: () => void) => (
  <>
    <>
      <ActionMenuItem label={"Open"} />
      <ActionMenuItem label={"Save"} leftIcon={stenaSave} />
      <ActionMenuItem
        label={"Don't close on click"}
        disableCloseOnClick
        leftIcon={stenaBusinessClaim}
      />
      <ActionMenuItem
        label={"Burn it"}
        leftIcon={stenaTrash}
        variant={"danger"}
      />
      <ActionMenuItem label={"Disabled"} disabled />
      <ActionMenuItemContent
        label={"Content right"}
        right={
          <ButtonGroup>
            <ToggleButton value={true} size={"small"} label={"S"} />
            <ToggleButton size={"small"} label={"M"} />
            <ToggleButton size={"small"} label={"L"} />
          </ButtonGroup>
        }
      />
      <ActionMenuItemContent
        label={"Content very much text"}
        bottom={
          <ButtonGroup>
            <ToggleButton size={"small"} label={"25"} onClick={close} />
            <ToggleButton
              value={true}
              size={"small"}
              label={"50"}
              onClick={close}
            />
            <ToggleButton size={"small"} label={"100"} onClick={close} />
          </ButtonGroup>
        }
      />
      <ActionMenuSeparator />
      <ActionMenuItem label={"Quit it"} onClick={action("Quitting")} />
    </>
  </>
);

export const Overview = () => (
  <Column>
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
      <Row spacing={2}>
        <ButtonVariant label={label} renderItems={renderContent} />
      </Row>
    ))}
    <Spacing num={24} />
  </Column>
);

export const Disabled = () => (
  <ActionMenuPrimaryButton
    label={"Disabled"}
    disabled
    renderItems={renderContent}
  />
);

export const Icons = () => (
  <Box>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Custom icon"}
        rightIcon={faCoffee}
        renderItems={renderContent}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Left icon"}
        leftIcon={faCoffee}
        renderItems={renderContent}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        rightIcon={faEllipsisV}
        renderItems={renderContent}
      />
    </Spacing>
  </Box>
);

export const Responsive = () => (
  <Box gap={2} flexDirection={["column", null, "row"]}>
    <ActionMenuPrimaryButton
      label={"Small"}
      size={"small"}
      renderItems={renderContent}
    />
    <ActionMenuPrimaryButton
      label={"Medium"}
      size={"medium"}
      renderItems={renderContent}
    />
    <ActionMenuPrimaryButton
      label={"Large"}
      size={"large"}
      renderItems={renderContent}
    />
  </Box>
);

export const Sizes = () => (
  <Box>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Small"}
        size={"small"}
        renderItems={renderContent}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Medium"}
        size={"medium"}
        renderItems={renderContent}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Large"}
        size={"large"}
        renderItems={renderContent}
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
          <Txt
            size={"smaller"}
            variant={"bold"}
            color={cssColor("--lhds-color-orange-300")}
          >
            So custom!
          </Txt>
        }
        renderItems={renderContent}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Right content"}
        right={
          <Txt
            size={"smaller"}
            variant={"bold"}
            color={cssColor("--lhds-color-orange-300")}
          >
            So custom!
          </Txt>
        }
        renderItems={renderContent}
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
        renderItems={renderContent}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Success"}
        variant={"success"}
        renderItems={renderContent}
      />
    </Spacing>
    <Spacing>
      <ActionMenuPrimaryButton
        label={"Danger"}
        variant={"danger"}
        renderItems={renderContent}
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
        <Txt>Try navigating with the keyboard.</Txt>
        <Space num={2} />
        <Row>
          <ActionMenuPrimaryButton
            label={"Buttons first"}
            renderItems={() => (
              <>
                <ActionMenuItem
                  label={"Do nothing"}
                  leftIcon={faCoffee}
                  disabled
                />
                <ActionMenuItem label={"Do something"} leftIcon={faFire} />
                <ActionMenuLink
                  label={"Go somewhere"}
                  leftIcon={faExternalLinkAlt}
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
                  leftIcon={faExternalLinkAlt}
                  disabled
                />
                <ActionMenuLink
                  label={"Go somewhere"}
                  leftIcon={faExternalLinkAlt}
                  href={"#"}
                />
                <ActionMenuItem label={"Do something"} leftIcon={faFire} />
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
                  leftIcon={faExternalLinkAlt}
                  disabled
                />
                <ActionMenuItem
                  label={"Do nothing"}
                  leftIcon={faCoffee}
                  disabled
                />
              </>
            )}
          />
        </Row>
        <Space num={11} />
      </Box>
      <Box>
        <Heading>Portal target</Heading>
        <Space />
        <Txt>Try navigating with the keyboard.</Txt>
        <Space num={2} />
        <Row>
          <ActionMenuPrimaryButton
            label={"Action button"}
            portalTarget={portalTarget}
            renderItems={(close) => (
              <>
                <ActionMenuItem
                  label={"Do something"}
                  leftIcon={faFire}
                  onClick={close}
                />
                <ActionMenuLink
                  label={"Go somewhere"}
                  leftIcon={faExternalLinkAlt}
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
                  leftIcon={faFire}
                  onClick={close}
                />
                <ActionMenuLink
                  label={"Go somewhere"}
                  leftIcon={faExternalLinkAlt}
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
                  leftIcon={faExternalLinkAlt}
                  disabled
                />
                <ActionMenuItem
                  label={"Do nothing"}
                  leftIcon={faCoffee}
                  disabled
                />
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

export const Scrollable = () => (
  <Row>
    <ActionMenuPrimaryButton
      label={"Hello"}
      renderItems={() => (
        <Box maxHeight={200} overflowY={"auto"}>
          <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
          <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
          <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
          <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
          <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
          <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
          <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
          <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
          <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
        </Box>
      )}
    />
  </Row>
);

export const ClickEvent = () => {
  const [count, setCount] = useState(0);
  return (
    <Row alignItems={"center"}>
      <ActionMenuPrimaryButton
        label={"Click me"}
        onClick={() => setCount((c) => c + 1)}
        renderItems={() => (
          <>
            <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
            <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
            <ActionMenuItem label={"Do nothing"} leftIcon={faCoffee} disabled />
          </>
        )}
      />
      <Space num={2} />
      <Txt>I have been clicked {count} times</Txt>
    </Row>
  );
};
