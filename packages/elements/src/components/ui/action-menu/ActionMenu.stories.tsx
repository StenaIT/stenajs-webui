import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { Text, useBoolean, useTimeoutState } from "@stenajs-webui/core";
import { action } from "@storybook/addon-actions";
import { ActionMenuItem } from "./ActionMenuItem";
import { ActionMenu } from "./ActionMenu";
import { ActionMenuSeparator } from "./ActionMenuSeparator";
import * as React from "react";
import markdown from "./ActionMenu.md";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { ActionMenuLink } from "./ActionMenuLink";
import { ActionMenuItemContent } from "./ActionMenuItemContent";
import { ButtonGroup } from "../button-group/ButtonGroup";
import { faAirFreshener } from "@fortawesome/free-solid-svg-icons/faAirFreshener";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { stenaCheck, stenaSearch } from "../../../icons/ui/Icons-ui";

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
      label={"Open new window"}
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
      label={"Disabled full width"}
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

  const [saved, setSaved] = useTimeoutState(false, 2000);

  const start = () => {
    setLoading();
    setTimeout(() => {
      clearLoading();
      setSaved(true);
    }, 2000);
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
    </ActionMenu>
  );
};
