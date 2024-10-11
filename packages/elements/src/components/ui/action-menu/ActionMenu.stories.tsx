import { useBoolean, useTimeoutState } from "@stenajs-webui/core";
import { action } from "@storybook/addon-actions";
import { ActionMenuItem } from "./ActionMenuItem";
import { ActionMenu } from "./ActionMenu";
import { ActionMenuSeparator } from "./ActionMenuSeparator";
import markdown from "./ActionMenu.md?raw";
import {
  faSadCry,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { ActionMenuLink } from "./ActionMenuLink";
import { ActionMenuItemContent } from "./ActionMenuItemContent";
import { ButtonGroup } from "../button-group/ButtonGroup";
import {
  stenaExternalLink,
  stenaSave,
  stenaSearch,
  stenaSlidersMini,
  stenaTrash,
} from "../../../icons/generated/CommonIcons";
import * as React from "react";
import { useState } from "react";
import { ToggleButton } from "../toggle-button/ToggleButton";

export default {
  title: "elements/ActionMenu",
  component: ActionMenu,
  subcomponents: { ActionMenuItem, ActionMenuSeparator },
  parameters: {
    notes: { markdown },
  },
};

export const Standard = () => (
  <ActionMenu width={220}>
    <ActionMenuItem
      id={"action-menu-item-open"}
      label={"Open"}
      onClick={action("Opened")}
    />
    <ActionMenuItem
      label={"Save"}
      leftIcon={stenaSave}
      onClick={action("Saved")}
    />
    <ActionMenuLink
      label={"Open new window"}
      leftIcon={stenaExternalLink}
      href={"https://www.google.com"}
      target={"_blank"}
    />
    <ActionMenuLink
      label={"Open disabled"}
      disabled
      leftIcon={stenaExternalLink}
      href={"https://www.google.com"}
      target={"_blank"}
    />
    <ActionMenuItem
      label={"Burn it"}
      leftIcon={stenaTrash}
      onClick={action("It was burned!")}
      variant={"danger"}
    />
    <ActionMenuItem
      label={"Disabled danger"}
      leftIcon={stenaTrash}
      onClick={action("Oh noes how did you activate this!?")}
      variant={"danger"}
      disabled={true}
    />
    <ActionMenuItem
      label={"Save it"}
      leftIcon={stenaSave}
      onClick={action("It was saved!")}
    />
    <ActionMenuItem
      label={"Click doesn't close"}
      onClick={action("I didn't close the menu!")}
      disableCloseOnClick
    />
    <ActionMenuItem
      label={"Disabled"}
      disabled
      onClick={action("I can never happen!")}
    />
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
      label={"Content bottom"}
      leftIcon={stenaSearch}
      bottom={
        <ButtonGroup>
          <ToggleButton size={"small"} label={"25"} />
          <ToggleButton value={true} size={"small"} label={"50"} />
          <ToggleButton size={"small"} label={"100"} />
        </ButtonGroup>
      }
    />
    <ActionMenuItemContent
      label={"Bottom full width"}
      leftIcon={stenaSlidersMini}
      bottom={
        <ButtonGroup>
          <ToggleButton size={"small"} label={"10"} />
          <ToggleButton size={"small"} label={"20"} value={true} />
          <ToggleButton size={"small"} label={"30"} />
          <ToggleButton size={"small"} label={"40"} />
          <ToggleButton size={"small"} label={"50"} />
          <ToggleButton size={"small"} label={"60"} />
        </ButtonGroup>
      }
      fullWidthBottomContent
    />
    <ActionMenuItemContent
      disabled
      label={"Bottom full width disabled"}
      leftIcon={stenaSlidersMini}
      bottom={
        <ButtonGroup>
          <ToggleButton size={"small"} label={"10"} disabled />
          <ToggleButton value={true} size={"small"} label={"20"} disabled />
          <ToggleButton size={"small"} label={"30"} disabled />
          <ToggleButton size={"small"} label={"40"} disabled />
          <ToggleButton size={"small"} label={"50"} disabled />
          <ToggleButton size={"small"} label={"60"} disabled />
        </ButtonGroup>
      }
      fullWidthBottomContent
    />
    <ActionMenuSeparator />
    <ActionMenuItem label={"Quit it"} onClick={action("Quitting")} />
  </ActionMenu>
);

export const Outlined = () => (
  <ActionMenu width={220}>
    <ActionMenuItem
      id={"action-menu-item-open"}
      label={"Open"}
      onClick={action("Opened")}
    />
    <ActionMenuSeparator />
    <ActionMenuItem label={"Quit it"} onClick={action("Quitting")} />
  </ActionMenu>
);

export const AsyncItem = () => {
  const [loading, setLoading, clearLoading] = useBoolean(false);
  const [loadingDanger, setLoadingDanger, clearLoadingDanger] =
    useBoolean(false);
  const [loadingSuccess, setLoadingSuccess, clearLoadingSuccess] =
    useBoolean(false);

  const [saved, setSaved] = useTimeoutState(false, 2000);
  const [savedDanger, setSavedDanger] = useTimeoutState(false, 2000);
  const [savedSuccess, setSavedSuccess] = useTimeoutState(false, 2000);
  const [isDangerOn, setIsDangerOn] = useState(true);
  const [isSuccessOn, setIsSuccessOn] = useState(true);

  const start = () => {
    setLoading();
    setTimeout(() => {
      clearLoading();
      setSaved(true);
    }, 2000);
  };

  const startDanger = () => {
    setLoadingDanger();
    setTimeout(() => {
      clearLoadingDanger();
      setSavedDanger(true);
    }, 2000);
  };

  const startSuccess = () => {
    setLoadingSuccess();
    setTimeout(() => {
      clearLoadingSuccess();
      setSavedSuccess(true);
    }, 2000);
  };

  const toggleDanger = () => {
    setIsDangerOn(!isDangerOn);
  };

  const toggleSuccess = () => {
    setIsSuccessOn(!isSuccessOn);
  };

  return (
    <ActionMenu width={220}>
      <ActionMenuItem
        id={"action-menu-item-open"}
        label={"Open"}
        onClick={action("Opened")}
      />
      <ActionMenuItem
        label={saved ? "Saved" : loading ? "Saving..." : "Save"}
        leftIcon={stenaSave}
        success={saved}
        loading={loading}
        onClick={start}
      />
      <ActionMenuItem
        label={
          savedDanger
            ? "Saved with danger"
            : loadingDanger
              ? "Saving with danger..."
              : "Save dangerously"
        }
        success={savedDanger}
        loading={loadingDanger}
        leftIcon={isDangerOn ? stenaSave : faSadCry}
        onClick={startDanger}
        variant={"danger"}
        disabled={!isDangerOn}
      />

      <ActionMenuItem
        label={"Toggle Danger"}
        leftIcon={isDangerOn ? faToggleOn : faToggleOff}
        onClick={toggleDanger}
      />

      <ActionMenuItem
        label={
          savedSuccess
            ? "Saved with success"
            : loadingSuccess
              ? "Saving with success..."
              : "Save successfully"
        }
        success={savedSuccess}
        loading={loadingSuccess}
        leftIcon={isSuccessOn ? stenaSave : faSadCry}
        onClick={startSuccess}
        disabled={!isSuccessOn}
      />

      <ActionMenuItem
        label={"Toggle Success"}
        leftIcon={isSuccessOn ? faToggleOn : faToggleOff}
        onClick={toggleSuccess}
      />
    </ActionMenu>
  );
};
