import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { Text, useBoolean, useTimeoutState } from "@stenajs-webui/core";
import { action } from "@storybook/addon-actions";
import { ActionMenuItem } from "./ActionMenuItem";
import { ActionMenu } from "./ActionMenu";
import { ActionMenuSeparator } from "./ActionMenuSeparator";
import markdown from "./ActionMenu.md?raw";
import {
  faExternalLinkAlt,
  faSadCry,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { ActionMenuLink } from "./ActionMenuLink";
import { ActionMenuItemContent } from "./ActionMenuItemContent";
import { ButtonGroup } from "../button-group/ButtonGroup";
import { faAirFreshener } from "@fortawesome/free-solid-svg-icons/faAirFreshener";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { stenaCheck, stenaSearch } from "../../../icons/ui/IconsUi";
import { useState } from "react";
import * as React from "react";

export default {
  title: "elements/ActionMenu/ActionMenu",
  component: ActionMenu,
  subcomponents: { ActionMenuItem, ActionMenuSeparator },
  parameters: {
    notes: { markdown },
  },
};

export const Standard = () => (
  <ActionMenu width={200}>
    <ActionMenuItem
      id={"action-menu-item-open"}
      label={"Open"}
      onClick={action("Opened")}
    />
    <ActionMenuItem
      label={"Save"}
      leftIcon={faSave}
      onClick={action("Saved")}
    />
    <ActionMenuLink
      label={"Open new window"}
      leftIcon={faExternalLinkAlt}
      href={"https://www.google.com"}
      target={"_blank"}
    />
    <ActionMenuLink
      label={"Open new window disabled"}
      disabled
      leftIcon={faExternalLinkAlt}
      href={"https://www.google.com"}
      target={"_blank"}
    />
    <ActionMenuItem
      label={"Burn it"}
      leftIcon={faFire}
      onClick={action("It was burned!")}
      variant={"danger"}
    />
    <ActionMenuItem
      label={"Disabled danger"}
      leftIcon={faFire}
      onClick={action("Oh noes how did you activate this!?")}
      variant={"danger"}
      disabled={true}
    />
    <ActionMenuItem
      label={"Save it"}
      leftIcon={faSave}
      onClick={action("It was saved!")}
      variant={"success"}
    />
    <ActionMenuItem label={"Loading"} loading onClick={action("Loading")} />
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
    <ActionMenuItem
      label={"Icon right"}
      onClick={action("Icon right clicked")}
      rightIcon={stenaCheck}
    />
    <ActionMenuItem
      label={"Icon right disabled"}
      onClick={action("I can never happen again!")}
      rightIcon={stenaCheck}
      disabled
    />
    <ActionMenuItemContent
      label={"Content right"}
      right={
        <ButtonGroup>
          <PrimaryButton size={"small"} label={"S"} />
          <SecondaryButton size={"small"} label={"M"} />
          <SecondaryButton size={"small"} label={"L"} />
        </ButtonGroup>
      }
    />
    <ActionMenuItemContent
      label={"Content bottom"}
      leftIcon={stenaSearch}
      bottom={
        <ButtonGroup>
          <SecondaryButton size={"small"} label={"25"} />
          <PrimaryButton size={"small"} label={"50"} />
          <SecondaryButton size={"small"} label={"100"} />
        </ButtonGroup>
      }
    />
    <ActionMenuItemContent
      label={"Bottom full width"}
      leftIcon={faAirFreshener}
      bottom={
        <ButtonGroup>
          <SecondaryButton size={"small"} label={"10"} />
          <PrimaryButton size={"small"} label={"20"} />
          <SecondaryButton size={"small"} label={"30"} />
          <SecondaryButton size={"small"} label={"40"} />
          <SecondaryButton size={"small"} label={"50"} />
          <SecondaryButton size={"small"} label={"60"} />
        </ButtonGroup>
      }
      fullWidthBottomContent
    />
    <ActionMenuItemContent
      disabled
      label={"Bottom full width disabled"}
      leftIcon={faAirFreshener}
      bottom={
        <ButtonGroup>
          <SecondaryButton size={"small"} label={"10"} disabled />
          <PrimaryButton size={"small"} label={"20"} disabled />
          <SecondaryButton size={"small"} label={"30"} disabled />
          <SecondaryButton size={"small"} label={"40"} disabled />
          <SecondaryButton size={"small"} label={"50"} disabled />
          <SecondaryButton size={"small"} label={"60"} disabled />
        </ButtonGroup>
      }
      fullWidthBottomContent
    />
    <ActionMenuSeparator />
    <ActionMenuItem
      label={"Quit it"}
      right={<Text size={"smaller"}>⌘ Q</Text>}
      onClick={action("Quitting")}
    />
  </ActionMenu>
);

export const Outlined = () => (
  <ActionMenu width={200} variant={"outlined"}>
    <ActionMenuItem
      id={"action-menu-item-open"}
      label={"Open"}
      onClick={action("Opened")}
    />
    <ActionMenuSeparator />
    <ActionMenuItem
      label={"Quit it"}
      right={<Text size={"smaller"}>⌘ Q</Text>}
      onClick={action("Quitting")}
    />
  </ActionMenu>
);

export const AsyncItem = () => {
  const [loading, setLoading, clearLoading] = useBoolean(false);
  const [loadingDanger, setLoadingDanger, clearLoadingDanger] =
    useBoolean(false);
  const [loadingSucess, setLoadingSuccess, clearLoadingSuccess] =
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
    <ActionMenu width={200} variant={"outlined"}>
      <ActionMenuItem
        id={"action-menu-item-open"}
        label={"Open"}
        onClick={action("Opened")}
      />
      <ActionMenuItem
        label={saved ? "Saved" : loading ? "Saving..." : "Save"}
        leftIcon={faSave}
        onClick={start}
        variant={saved ? "success" : undefined}
        success={saved}
        loading={loading}
      />
      <ActionMenuItem
        label={
          savedDanger
            ? "Saved with danger"
            : loadingDanger
            ? "Saving with danger..."
            : "Save dangerously"
        }
        leftIcon={isDangerOn ? faSave : faSadCry}
        onClick={startDanger}
        variant={"danger"}
        success={savedDanger}
        loading={loadingDanger}
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
            : loadingSucess
            ? "Saving with success..."
            : "Save successfully"
        }
        leftIcon={isSuccessOn ? faSave : faSadCry}
        onClick={startSuccess}
        variant={"success"}
        success={savedSuccess}
        loading={loadingSucess}
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
