import * as React from "react";
import { useState } from "react";
import { Link, stenaInfoMegaphone } from "@stenajs-webui/elements";
import { Toast, ToastProps } from "./Toast";
import { Box, Column, Txt } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import { Story } from "@storybook/react";
import {
  colorListControl,
  disabledControl,
  hideControl,
  textControl,
  widthControl,
} from "../../storybook-helpers/storybook-controls";

export default {
  title: "panels/Notifications/Toast",
  component: Toast,
  parameters: {
    backgrounds: {
      default: "grey",
    },
  },
  argTypes: {
    text: textControl,
    icon: hideControl,
    iconColor: colorListControl,
    iconAriaLabel: textControl,
    contentLeft: hideControl,
    children: hideControl,
    width: widthControl,
    onClose: hideControl,
    disableClose: disabledControl,
    onClick: hideControl,
    onClickAriaLabel: textControl,
  },
};

export const Overview: Story<ToastProps> = (props) => <Toast {...props} />;
Overview.args = {
  text: "Something happened",
  icon: stenaInfoMegaphone,
};

export const Minimal = () => <Toast text={"You need at least some text"} />;

export const Icon = () => (
  <Toast
    text={"Hey, listen!"}
    icon={stenaInfoMegaphone}
    iconAriaLabel={"Information"}
  />
);

export const IconColour = () => (
  <Toast
    text={"Hey, listen!"}
    icon={stenaInfoMegaphone}
    iconAriaLabel={"Information"}
    iconColor={cssColor("--lhds-color-blue-500")}
  />
);

export const CloseFunction = () => {
  const [showToast, setShowToast] = useState(true);

  const onClose = () => {
    setShowToast(false);
    setTimeout(() => setShowToast(true), 1000);
  };

  return (
    showToast && (
      <Toast
        text={"Close me"}
        icon={stenaInfoMegaphone}
        iconAriaLabel={"Information"}
        onClose={onClose}
      />
    )
  );
};

export const NoCloseButton = () => (
  <Toast
    text={"Can't close me"}
    icon={stenaInfoMegaphone}
    iconAriaLabel={"Information"}
    disableClose
  />
);

export const LongText = () => (
  <Toast
    text={
      "This text is long and spans multiple rows and this is what that looks like"
    }
    icon={stenaInfoMegaphone}
    iconAriaLabel={"Information"}
  />
);

export const LeftContent = () => (
  <Toast
    text={"Custom content"}
    contentLeft={
      <Box
        background={cssColor("--lhds-color-red-500")}
        height={20}
        width={20}
      />
    }
  />
);

export const Content = () => (
  <Toast
    text={"More content"}
    icon={stenaInfoMegaphone}
    iconAriaLabel={"Information"}
  >
    <Column gap={2} alignItems={"flex-start"}>
      <Txt>This thing just happened</Txt>
      <Link variant={"bold"} size={"small"}>
        Read all about it
      </Link>
    </Column>
  </Toast>
);

export const Clickable = () => {
  const [showToast, setShowToast] = useState(true);
  const [clicks, setClicks] = useState(0);

  const onClose = () => {
    setShowToast(false);
    setTimeout(() => setShowToast(true), 1000);
  };

  return (
    <Box gap={2}>
      <Txt>Number of clicks: {clicks}</Txt>

      {showToast && (
        <Toast
          text={"Click me"}
          icon={stenaInfoMegaphone}
          iconAriaLabel={"Information"}
          onClose={onClose}
          onClick={() => setClicks((n) => n + 1)}
          onClickAriaLabel={"Count one click"}
        >
          <Column gap={2} alignItems={"flex-start"}>
            <Txt>
              You probably shouldn't put clickable content into an already
              clickable area, but you can.
            </Txt>
            <Link variant={"bold"} size={"small"}>
              Clicking me won't click the notification
            </Link>
          </Column>
        </Toast>
      )}
    </Box>
  );
};
