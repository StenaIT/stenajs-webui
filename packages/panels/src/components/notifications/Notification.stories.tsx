import * as React from "react";
import { useState } from "react";
import {
  FlatButton,
  Link,
  stenaCalendarManage,
  stenaCheck,
  stenaInfoCircle,
  stenaInfoMegaphone,
  stenaSms,
  Tag,
} from "@stenajs-webui/elements";
import { Box, Column, Row, Space, Txt } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import { Notification, NotificationProps } from "./Notification";
import { Story } from "@storybook/react";
import {
  colorListControl,
  hideControl,
  textControl,
} from "../../storybook-helpers/storybook-controls";
import { formatDistance } from "date-fns";

export default {
  title: "panels/Notifications/Notification",
  component: Notification,
  parameters: {
    backgrounds: {
      default: "grey",
    },
  },
  argTypes: {
    text: textControl,
    timestamp: textControl,
    icon: hideControl,
    iconColor: colorListControl,
    iconAriaLabel: textControl,
    background: colorListControl,
    contentLeft: hideControl,
    contentRight: hideControl,
    children: hideControl,
    onClose: hideControl,
  },
};

export const Overview: Story<NotificationProps> = (props) => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification {...props} />
  </Box>
);
Overview.args = {
  text: "1 booking confirmed",
  icon: stenaCheck,
  iconColor: cssColor("--lhds-color-green-600"),
  timestamp: `${formatDistance(new Date(), new Date())} ago`,
  children: (
    <Column alignItems={"flex-start"}>
      <Link variant={"bold"}>76123456</Link>
      <Space />
      <Txt size={"small"}>Customer reference required</Txt>
      <Space num={2} />
      <Link variant={"bold"}>GOFR 2023-01-20 09:00</Link>
    </Column>
  ),
  onClose: () => {},
};

export const Minimal = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification text={"You need at least some text"} />
  </Box>
);

export const Icon = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"Hey, listen!"}
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
    />
  </Box>
);

export const IconColour = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"Hey, listen!"}
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
      iconColor={cssColor("--lhds-color-blue-500")}
    />
  </Box>
);

export const LongText = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={
        "Try to keep the text short but if it should need several rows it wraps like this"
      }
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
    />
  </Box>
);

export const Timestamp = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"Hey, listen!"}
      icon={stenaInfoMegaphone}
      iconAriaLabel={"Information"}
      timestamp={`${formatDistance(new Date(), new Date())} ago`}
    />
  </Box>
);

export const LeftContent = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"Custom content"}
      contentLeft={
        <Box
          background={cssColor("--lhds-color-red-500")}
          height={20}
          width={20}
        />
      }
    />
  </Box>
);

export const RightContent = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"24 nov 06:10"}
      icon={stenaCalendarManage}
      iconAriaLabel={"Date"}
      contentRight={<Tag label={"Confirmed"} variant={"success"} />}
    />
  </Box>
);

export const Content = () => (
  <Box width={300} background={cssColor("--lhds-color-ui-50")}>
    <Notification
      text={"24 nov 06:10"}
      icon={stenaCalendarManage}
      iconAriaLabel={"Date"}
      contentRight={<Tag label={"Confirmed"} variant={"success"} />}
    >
      <Box gap={2} alignItems={"flex-start"}>
        <Txt>1 booking confirmed</Txt>
        <Link variant={"bold"} size={"small"}>
          GOFR 2022-09-06
        </Link>
        <Txt>More information required</Txt>
        <Row alignSelf={"flex-end"}>
          <FlatButton label={"Full message"} leftIcon={stenaSms} />
        </Row>
      </Box>
    </Notification>
  </Box>
);

export const CloseFunction = () => {
  const [showNotification, setShowNotification] = useState(true);

  const onClose = () => {
    setShowNotification(false);
    setTimeout(() => setShowNotification(true), 1000);
  };

  return (
    showNotification && (
      <Box width={300} background={cssColor("--lhds-color-ui-50")}>
        <Notification
          text={"Temporary timetable changes"}
          timestamp={`${formatDistance(new Date(), new Date())} ago`}
          icon={stenaInfoCircle}
          iconAriaLabel={"Information"}
          onClose={onClose}
        >
          <Box gap={2} alignItems={"flex-start"}>
            <Txt>
              Please be advised that there is essential maintenance work being
              performed on...
            </Txt>
            <Row alignSelf={"flex-end"}>
              <FlatButton label={"Full message"} leftIcon={stenaSms} />
            </Row>
          </Box>
        </Notification>
      </Box>
    )
  );
};
